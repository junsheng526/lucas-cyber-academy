import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import ButtonPrimary from "../../components/molecules/button/ButtonPrimary";
import StartRating from "../../components/molecules/StartRating";
import { Course } from "../../data/model";
import { useAuth } from "../../firebase/useAuth";
import useEnrollments from "../../hooks/useEnrollments";
import useEnrollmentStatus from "../../hooks/useEnrollmentStatus"; // Import the hook

interface CourseDetailsSidebarProps {
  course: Course;
}

export const CourseDetailsSidebar: React.FC<CourseDetailsSidebarProps> = ({
  course,
}) => {
  const [isPaying, setIsPaying] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  const weeks: number = parseInt(course.duration) || 4;
  const totalPrice: number = course.price * weeks;

  const user = useAuth();
  const { enrollStudent } = useEnrollments(user?.uid || "");
  const { isEnrolled, loading } = useEnrollmentStatus({
    userId: user?.uid || "",
    courseId: course.id,
  });

  const handleEnroll = () => {
    if (!user?.uid) {
      alert("You need to log in to enroll.");
      return;
    }
    setIsPaying(true);
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

      {/* PAYPAL PAYMENT FLOW */}
      {isPaying ? (
        <PayPalScriptProvider
          options={{
            clientId:
              "AR1OKrUTMXVBfUjK7sLEBEfA7PdN5pCcQqU7rAa-Seoc8roPSZIaO4YWVGrvm1GeOUePwCGDTXYDazMU",
          }}
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
            onApprove={async (_data, actions) => {
              try {
                const details = await actions.order?.capture();
                if (details?.status === "COMPLETED") {
                  setPaymentSuccess(true);
                  enrollStudent(
                    course.id,
                    course.lecturerId,
                    course.currentEnrollments || 0,
                    course.maxSeats || 30
                  );
                  alert("Payment successful! You are now enrolled.");
                }
              } catch (error) {
                console.error("Error capturing PayPal payment:", error);
                alert("Payment verification failed.");
              }
            }}
            onCancel={() => {
              alert("Payment was canceled.");
              setIsPaying(false);
            }}
            onError={(err) => {
              console.error("PayPal Checkout Error:", err);
              alert("Something went wrong with the payment.");
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
          disabled={isEnrolled || course.currentEnrollments >= course.maxSeats}
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
  );
};
