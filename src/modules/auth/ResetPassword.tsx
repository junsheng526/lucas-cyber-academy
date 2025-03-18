import { FC, useState } from "react";
import Input from "../../components/atoms/input/Input";
import { Link } from "react-router-dom";
import Layout from "../../components/templates/layout/Layout";
import { auth } from "../../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import BgGlassmorphism from "../../components/atoms/background/BgGlassmorphism";
import ButtonPrimary from "../../components/molecules/button/ButtonPrimary";
import Popup from "../../components/organisms/popup/Popup";

export interface PageResetPasswordProps {}

const PageResetPassword: FC<PageResetPasswordProps> = () => {
  const [email, setEmail] = useState("");
  const [popup, setPopup] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setPopup({
        type: "success",
        message: "Password reset link sent! Check your email.",
      });
    } catch (err: any) {
      setPopup({
        type: "error",
        message: "Failed to send reset link. Please check your email.",
      });
    }
  };

  return (
    <Layout>
      <BgGlassmorphism />
      <div className="container relative mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 justify-center">
          Reset Password
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <form
            className="grid grid-cols-1 gap-6"
            onSubmit={handleResetPassword}
          >
            <label className="block">
              <span className="text-start flex text-neutral-800">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1 w-full border"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <ButtonPrimary type="submit">Send Reset Link</ButtonPrimary>
          </form>

          <span className="block text-center text-neutral-700">
            Remembered your password?{" "}
            <Link to="/login" className="font-semibold underline">
              Go back to login
            </Link>
          </span>
        </div>
      </div>

      {popup.type && (
        <Popup
          type={popup.type}
          title={popup.type === "success" ? "Success" : "Error"}
          description={popup.message}
          onClose={() => setPopup({ type: null, message: "" })}
        />
      )}
    </Layout>
  );
};

export default PageResetPassword;
