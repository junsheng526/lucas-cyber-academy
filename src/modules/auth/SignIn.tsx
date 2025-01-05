import { FC, useState } from "react";
import Input from "../../components/atoms/input/Input";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/templates/layout/Layout";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import BgGlassmorphism from "../../components/atoms/background/BgGlassmorphism";
import ButtonPrimary from "../../components/molecules/button/ButtonPrimary";

export interface PageLoginProps {}

const PageLogin: FC<PageLoginProps> = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
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
          <form
            className="grid grid-cols-1 gap-6"
            action="#"
            onSubmit={handleLogin}
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
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800">
                Password
                <Link to="/login" className="text-sm underline font-medium">
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

          {/* ==== */}
          <span className="block text-center text-neutral-700">
            New user? {` `}
            <Link to="/register" className="font-semibold underline">
              Create an account
            </Link>
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default PageLogin;
