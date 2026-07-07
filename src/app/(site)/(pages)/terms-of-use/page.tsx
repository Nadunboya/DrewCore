import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | NextCommerce",
  description: "Terms of use page",
};

const TermsOfUsePage = () => {
  return (
    <main className="min-h-screen bg-white px-4 py-16 text-gray-800">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-semibold text-gray-900">
          Terms of Use
        </h1>
        <p className="leading-7">
          By using our website, you agree to comply with all applicable laws and
          our usage guidelines.
        </p>
      </div>
    </main>
  );
};

export default TermsOfUsePage;
