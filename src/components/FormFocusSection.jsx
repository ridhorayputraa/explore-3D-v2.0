export default function FormFocusSection({ formRef }) {
  return (
    <div
      ref={formRef}
      className="p-8 bg-gray-800 rounded-2xl shadow-lg w-[400px] space-y-4 border border-gray-700"
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        Hilu!
      </h2>
      <form className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="p-3 rounded bg-gray-700 border border-gray-600 outline-none"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="p-3 rounded bg-gray-700 border border-gray-600 outline-none"
        />
        <textarea
          placeholder="Your Message"
          rows="3"
          className="p-3 rounded bg-gray-700 border border-gray-600 outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded font-semibold"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
