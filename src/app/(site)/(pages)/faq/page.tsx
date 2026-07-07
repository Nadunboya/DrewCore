import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | NextCommerce",
  description: "Frequently asked questions page",
};

const FaqPage = () => {
  return (
    <main className="min-h-screen bg-white px-4 py-16 text-gray-800">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-semibold text-gray-900">
          Frequently Asked Questions
        </h1>
        <p className="leading-7">
          Find answers to common questions about shipping, returns, payments,
          and account support.
        </p>
      </div>
    </main>
  );
};

export default FaqPage;
