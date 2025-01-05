import { FC, useState } from "react";
import Input from "../../components/atoms/input/Input";
import { Link } from "react-router-dom";
import Layout from "../../components/templates/layout/Layout";
import { User } from "../../types/user";
import { registerUser } from "../../services/userService";
import BgGlassmorphism from "../../components/atoms/background/BgGlassmorphism";
import ButtonPrimary from "../../components/molecules/button/ButtonPrimary";

export interface PageSignUpProps {}

const PageSignUp: FC<PageSignUpProps> = ({}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { fullName, email, password, confirmPassword, role } = formData;

    // Validation
    if (!fullName || !email || !password || !role) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const userObj: User = {
      name: fullName,
      email: email,
      role: role,
      profileImage: "",
    };

    try {
      // Call the user service to register the user
      await registerUser(userObj);
      console.log("User registered successfully", userObj);
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  return (
    <Layout>
      <BgGlassmorphism />
      <div className="container relative mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 justify-center">
          Sign Up
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <form
            className="grid grid-cols-1 gap-6"
            action="#"
            onSubmit={handleSubmit}
          >
            <label className="block">
              <span className="text-start flex text-neutral-800">
                Full Name
              </span>
              <Input
                type="text"
                placeholder="Full Name"
                className="mt-1 w-full border"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </label>

            <label className="block">
              <span className="text-start flex text-neutral-800">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1 w-full border"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>

            <label className="block">
              <span className="flex justify-between items-center text-neutral-800">
                Password
              </span>
              <Input
                type="password"
                className="mt-1 w-full border"
                placeholder="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>

            <label className="block">
              <span className="flex justify-between items-center text-neutral-800">
                Confirm Password
              </span>
              <Input
                type="password"
                className="mt-1 w-full border"
                placeholder="confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </label>

            {/* Role Dropdown */}
            <label className="block">
              <span className="text-start flex text-neutral-800">Role</span>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 w-full border px-4 py-3 rounded-xl"
              >
                <option value="">Select Role</option>
                <option value="Student">Student</option>
                <option value="Lecturer">Lecturer</option>
              </select>
            </label>

            {error && (
              <span className="text-red-500 text-sm text-center">{error}</span>
            )}

            <ButtonPrimary type="submit">Sign Up</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold underline">
              Log in
            </Link>
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default PageSignUp;
