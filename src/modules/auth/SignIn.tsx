import { FC, useState } from "react";
import Input from "../../components/atoms/input/Input";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/templates/layout/Layout";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import BgGlassmorphism from "../../components/atoms/background/BgGlassmorphism";
import ButtonPrimary from "../../components/molecules/button/ButtonPrimary";
import Popup from "../../components/organisms/popup/Popup";

export interface PageLoginProps {}

const PageLogin: FC<PageLoginProps> = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setPopup({ type: "success", message: "Login successful!" });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err: any) {
      setPopup({ type: "error", message: "Wrong Email or Password!" });
    }
  };

  return (
    <Layout>
      <BgGlassmorphism />
      <div className="container relative mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <form className="grid grid-cols-1 gap-6" onSubmit={handleLogin}>
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
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800">
                Password
                <Link
                  to="/reset-password"
                  className="text-sm underline font-medium"
                >
                  Forgot password?
                </Link>
              </span>
              <Input
                type="password"
                className="mt-1 w-full border"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>

          <span className="block text-center text-neutral-700">
            New user?{" "}
            <Link to="/register" className="font-semibold underline">
              Create an account
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

export default PageLogin;
