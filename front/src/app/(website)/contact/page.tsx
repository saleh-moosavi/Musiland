import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="flex items-center justify-center mt-10 text-my-black-max dark:text-my-white-low">
      <div className="bg-my-white-low dark:bg-my-black-max p-8 rounded-xl shadow-md shadow-my-black-low/50 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Contact Us</h1>
        <p className="text-center mb-6">
          If you have any questions, feel free to reach out!
        </p>
        <div className="mt-8 grid justify-center space-y-2 gap-2 *:flex *:justify-between *:gap-10">
          <p>
            📞 Phone:{" "}
            <a
              href="tel:+989123456789"
              target="_blank"
              className="text-my-green-med hover:underline"
            >
              +98 912 345 6789
            </a>
          </p>
          <p>
            📧 Email:{" "}
            <a
              href="mailto:musiland@gmail.com"
              target="_blank"
              className="text-my-green-med hover:underline"
            >
              musiland@gmail.com
            </a>
          </p>
          <p>
            💬 Telegram:{" "}
            <Link
              href="https://t.me/Musiland"
              target="_blank"
              className="text-my-green-med hover:underline"
            >
              @Musiland
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
