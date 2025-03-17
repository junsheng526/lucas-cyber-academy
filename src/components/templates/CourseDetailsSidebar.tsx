import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import ButtonPrimary from "../molecules/button/ButtonPrimary";
import StartRating from "../molecules/StartRating";
import { Course } from "../../types/model";
import { useAuth } from "../../hooks/useAuth";
import useEnrollments from "../../hooks/useEnrollments";
import useEnrollmentStatus from "../../hooks/useEnrollmentStatus";
import { useUser } from "../../hooks/useUser";
import { PAYPAL_CONFIG } from "../../config/paypal";
import Popup from "../organisms/popup/Popup";

interface CourseDetailsSidebarProps {
  course: Course;
}

export const CourseDetailsSidebar: React.FC<CourseDetailsSidebarProps> = ({
  course,
}) => {
  const [isPaying, setIsPaying] = useState<boolean>(false);
  const [popup, setPopup] = useState<{
    type: "success" | "error" | "warning" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const weeks: number = parseInt(course.duration) || 4;
  const totalPrice: number = course.price * weeks;

  const user = useAuth();
  const { enrollStudent } = useEnrollments(user?.uid || "");
  const { isEnrolled, loading } = useEnrollmentStatus({
    userId: user?.uid || "",
    courseId: course.id,
  });
  const { userData } = useUser();

  const handleEnroll = () => {
    if (!user?.uid) {
      setPopup({ type: "warning", message: "You need to log in to enroll." });
      return;
    }
    setIsPaying(true);
  };

  const handlePaymentSuccess = async (actions: any) => {
    try {
      const details = await actions.order?.capture();
      if (details?.status === "COMPLETED") {
        setPopup({
          type: "success",
          message: "Payment successful! You are now enrolled.",
        });

        enrollStudent(
          course.id,
          course.lecturerId,
          course.currentEnrollments || 0,
          course.maxSeats || 30,
          totalPrice
        );
      }
    } catch (error) {
      console.error("Error capturing PayPal payment:", error);
      setPopup({ type: "error", message: "Payment verification failed." });
    }
  };

  return (
    <div className="listingSectionSidebar__wrap shadow-xl p-6 rounded-2xl bg-white">
      {/* PRICE & RATING */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-3xl font-semibold">
          ${course.price}
          <span className="ml-1 text-base font-normal text-neutral-500">
            {" "}
            /week
          </span>
        </span>
        <StartRating />
      </div>

      {/* COURSE DETAILS SUMMARY */}
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex justify-between text-neutral-600">
          <span>
            ${course.price} x {weeks} weeks
          </span>
          <span>${totalPrice}</span>
        </div>
        <div className="flex justify-between text-neutral-600">
          <span>Service Fee</span>
          <span>$0</span>
        </div>
        <div className="border-b border-neutral-200"></div>
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${totalPrice}</span>
        </div>
      </div>

      {userData?.role.toLowerCase() === "student" && (
        <div>
          {/* PAYPAL PAYMENT FLOW */}
          {isPaying ? (
            <PayPalScriptProvider
              options={{ clientId: PAYPAL_CONFIG.CLIENT_ID }}
            >
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(_data, actions) => {
                  return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        amount: {
                          value: totalPrice.toFixed(2),
                          currency_code: "USD",
                        },
                        description: `Enrollment for ${course.title}`,
                      },
                    ],
                  });
                }}
                onApprove={(_data, actions) => handlePaymentSuccess(actions)}
                onCancel={() => {
                  setPopup({
                    type: "warning",
                    message: "Payment was canceled.",
                  });
                  setIsPaying(false);
                }}
                onError={(err) => {
                  console.error("PayPal Checkout Error:", err);
                  setPopup({
                    type: "error",
                    message: "Something went wrong with the payment.",
                  });
                  setIsPaying(false);
                }}
              />
            </PayPalScriptProvider>
          ) : (
            <ButtonPrimary
              onClick={handleEnroll}
              className={`w-full py-3 rounded-xl text-lg font-semibold transition duration-200 ${
                isEnrolled || course.currentEnrollments >= course.maxSeats
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              disabled={
                isEnrolled || course.currentEnrollments >= course.maxSeats
              }
            >
              {loading
                ? "Checking..."
                : isEnrolled
                ? "Enrolled"
                : course.currentEnrollments >= course.maxSeats
                ? "Course Full"
                : "Enroll Now"}
            </ButtonPrimary>
          )}
        </div>
      )}

      {/* Popup */}
      {popup.type && (
        <Popup
          type={popup.type}
          title={
            popup.type === "success"
              ? "Success"
              : popup.type === "error"
              ? "Error"
              : "Warning"
          }
          description={popup.message}
          onClose={() => setPopup({ type: null, message: "" })}
        />
      )}
    </div>
  );
};
