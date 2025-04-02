import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';

const PricingPage = () => {
  // Feature comparison data for plans
  const features = [
    { name: "PDF to XML Conversion", free: true, basic: true, premium: true },
    { name: "Batch Processing", free: false, basic: true, premium: true },
    { name: "Custom XML Schema", free: false, basic: false, premium: true },
    { name: "API Access", free: false, basic: false, premium: true },
    { name: "Cloud Storage", free: "100MB", basic: "5GB", premium: "50GB" },
    { name: "Maximum File Size", free: "5MB", basic: "25MB", premium: "100MB" },
    { name: "Monthly Conversions", free: "10", basic: "100", premium: "Unlimited" },
    { name: "Priority Support", free: false, basic: false, premium: true },
    { name: "Offline Mode", free: false, basic: true, premium: true },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-blue-600 text-white pt-16 pb-28 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Select the perfect plan for your PDF to XML conversion needs. Upgrade or downgrade anytime.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Free Plan */}
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white">
            <div className="p-6 bg-blue-50 border-b border-blue-100">
              <h3 className="text-2xl font-bold text-blue-800">Free</h3>
              <p className="mt-1 text-blue-600">For occasional users</p>
              <p className="mt-4">
                <span className="text-4xl font-extrabold text-gray-900">$0</span>
                <span className="text-base font-medium text-gray-500">/mo</span>
              </p>
            </div>
            <div className="flex-1 flex flex-col justify-between p-6 space-y-6">
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    {typeof feature.free === 'boolean' ? (
                      feature.free ? (
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      )
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {feature.free}
                      </span>
                    )}
                    <span className="ml-3 text-gray-600">{feature.name}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/signup?plan=free"
                className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Basic Plan */}
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white border-2 border-blue-600 transform lg:scale-105 z-10">
            <div className="p-6 bg-blue-600 text-white">
              <h3 className="text-2xl font-bold">Basic</h3>
              <p className="mt-1 text-blue-100">For regular users</p>
              <p className="mt-4">
                <span className="text-4xl font-extrabold">$9.99</span>
                <span className="text-base font-medium text-blue-200">/mo</span>
              </p>
            </div>
            <div className="flex-1 flex flex-col justify-between p-6 space-y-6">
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    {typeof feature.basic === 'boolean' ? (
                      feature.basic ? (
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      )
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {feature.basic}
                      </span>
                    )}
                    <span className="ml-3 text-gray-600">{feature.name}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/signup?plan=basic"
                className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>
            <div className="bg-blue-50 p-3 text-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                Most Popular
              </span>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white">
            <div className="p-6 bg-gray-800 text-white">
              <h3 className="text-2xl font-bold">Premium</h3>
              <p className="mt-1 text-gray-300">For business users</p>
              <p className="mt-4">
                <span className="text-4xl font-extrabold">$24.99</span>
                <span className="text-base font-medium text-gray-400">/mo</span>
              </p>
            </div>
            <div className="flex-1 flex flex-col justify-between p-6 space-y-6">
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    {typeof feature.premium === 'boolean' ? (
                      feature.premium ? (
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      )
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {feature.premium}
                      </span>
                    )}
                    <span className="ml-3 text-gray-600">{feature.name}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/signup?plan=premium"
                className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto mt-24 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-gray-600">
            Got questions about our PDF to XML converter? We've got answers.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-6 py-5">
              <h3 className="text-lg font-medium text-gray-900">What types of PDFs can I convert?</h3>
              <p className="mt-2 text-gray-600">
                Our converter works with all standard PDF files, including text-based PDFs, scanned documents (with OCR processing), and forms. For best results, text-based PDFs provide the most accurate conversion.
              </p>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-6 py-5">
              <h3 className="text-lg font-medium text-gray-900">Can I customize the XML output format?</h3>
              <p className="mt-2 text-gray-600">
                Yes! Premium users have access to our custom XML schema feature, allowing you to define exactly how your XML should be structured. Basic and Free users receive our standard XML format.
              </p>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-6 py-5">
              <h3 className="text-lg font-medium text-gray-900">How secure are my documents?</h3>
              <p className="mt-2 text-gray-600">
                We take security seriously. All uploads are encrypted using TLS/SSL, and documents are automatically deleted from our servers after processing (Premium users can choose to store documents securely on our cloud).
              </p>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-6 py-5">
              <h3 className="text-lg font-medium text-gray-900">Can I convert multiple files at once?</h3>
              <p className="mt-2 text-gray-600">
                Basic and Premium plans support batch processing, allowing you to convert multiple PDFs to XML in one operation. Free users can convert one document at a time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-blue-200">Try our converter for free today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Get started
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;