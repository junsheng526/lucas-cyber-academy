import { useState } from "react";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "../../config/email";
import { useAnalyticsData } from "../../hooks/useAnalyticsData";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const { incrementEmailCount } = useAnalyticsData();

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formData,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      if (response.status === 200) {
        setStatusMessage("✅ Message sent successfully!");
        setFormData({ fullName: "", email: "", message: "" }); // Clear form
        incrementEmailCount();
      }
    } catch (error) {
      setStatusMessage("❌ Failed to send message. Please try again.");
      console.error("EmailJS Error:", error);
    }
  };

  return (
    <div>
      <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
        <label className="block">
          <span className="block font-semibold text-left">Full name</span>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Example Doe"
            type="text"
            required
            className="mt-1 p-2 border border-gray-300 rounded-xl w-full focus:border-primary-300 focus:ring-2 focus:ring-primary-200 focus:ring-opacity-50 outline-none"
          />
        </label>

        <label className="block">
          <span className="block font-semibold text-left">Email address</span>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@example.com"
            required
            className="mt-1 p-2 border border-gray-300 rounded-xl w-full focus:border-primary-300 focus:ring-2 focus:ring-primary-200 focus:ring-opacity-50 outline-none"
          />
        </label>

        <label className="block">
          <span className="block font-semibold text-left">Message</span>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            required
            className="mt-1 p-2 border border-gray-300 rounded-xl w-full focus:border-primary-300 focus:ring-2 focus:ring-primary-200 focus:ring-opacity-50 outline-none"
          ></textarea>
        </label>

        <div>
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-blue-700 disabled:bg-opacity-70"
          >
            Send Message
          </button>
        </div>

        {statusMessage && (
          <p className="text-center text-sm mt-2">{statusMessage}</p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
