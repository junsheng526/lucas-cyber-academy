const ContactForm: React.FC = () => {
  return (
    <div>
      <form className="grid grid-cols-1 gap-6" action="#" method="post">
        <label className="block">
          <span className="block font-semibold text-left">Full name</span>
          <input
            placeholder="Example Doe"
            type="text"
            className="mt-1 p-2 border border-gray-300 rounded-xl w-full focus:border-primary-300 focus:ring-2 focus:ring-primary-200 focus:ring-opacity-50 outline-none"
          />
        </label>
        <label className="block">
          <span className="block font-semibold text-left">Email address</span>
          <input
            type="email"
            placeholder="example@example.com"
            className="mt-1 p-2 border border-gray-300 rounded-xl w-full focus:border-primary-300 focus:ring-2 focus:ring-primary-200 focus:ring-opacity-50 outline-none"
          />
        </label>
        <label className="block">
          <span className="block font-semibold text-left">Message</span>
          <textarea
            className="mt-1 p-2 border border-gray-300 rounded-xl w-full focus:border-primary-300 focus:ring-2 focus:ring-primary-200 focus:ring-opacity-50 outline-none"
            rows={6}
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
      </form>
    </div>
  );
};

export default ContactForm;
