import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | NextCommerce",
  description: "Privacy policy page",
};

const PrivacyPolicyPage = () => {
  return (
    <main className="min-h-screen bg-white px-4 py-16 text-gray-800">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-semibold text-gray-900">
          Privacy Policy
        </h1>
        <p className="mb-4 leading-7">
          We respect your privacy and are committed to protecting your personal
          information.
        </p>
        <p className="leading-7">
          This page outlines how we collect, use, and safeguard your data when
          you shop with us.
        </p>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
