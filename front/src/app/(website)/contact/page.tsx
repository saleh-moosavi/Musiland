import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="flex items-center justify-center transition-colors duration-300 mt-10">
      <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-lg animate-fade-in">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          If you have any questions, feel free to reach out!
        </p>
        <div className="mt-8 grid justify-center text-gray-700 dark:text-gray-300 space-y-2">
          <p className="flex justify-between gap-2">
            📞 Phone:{" "}
            <a
              href="tel:+989123456789"
              target="_blank"
              className="text-emerald-500 hover:underline"
            >
              +98 912 345 6789
            </a>
          </p>
          <p className="flex justify-between gap-2">
            📧 Email:{" "}
            <a
              href="mailto:musiland@gmail.com"
              target="_blank"
              className="text-emerald-500 hover:underline"
            >
              musiland@gmail.com
            </a>
          </p>
          <p className="flex justify-between gap-2">
            💬 Telegram:{" "}
            <Link
              href="https://t.me/Musiland"
              target="_blank"
              className="text-emerald-500 hover:underline"
            >
              @Musiland
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
