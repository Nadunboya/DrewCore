import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | NextCommerce",
  description: "Refund policy page",
};

const RefundPolicyPage = () => {
  return (
    <main className="min-h-screen bg-white px-4 py-16 text-gray-800">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-semibold text-gray-900">
          Refund Policy
        </h1>
        <p className="mb-4 leading-7">
          If you are not completely satisfied with your purchase, you may
          request a refund within the stated return window.
        </p>
        <p className="leading-7">
          Refunds are processed once the returned product is inspected and
          approved.
        </p>
      </div>
    </main>
  );
};

export default RefundPolicyPage;
