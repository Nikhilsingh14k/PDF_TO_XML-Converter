import React from 'react';
import { Link } from 'react-router-dom';

const FeaturePage = () => {
  const features = [
    {
      title: "PDF to XML Conversion",
      description: "Convert any PDF document to structured XML format with just a few clicks. Preserve formatting and structure.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Batch Processing",
      description: "Convert multiple PDF files simultaneously to save time. Perfect for processing large document collections.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z M16 3v4M8 3v4M3 11h18" />
        </svg>
      )
    },
    {
      title: "Custom XML Schema",
      description: "Define your own XML structure or choose from our templates to match your specific data needs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-blue-600">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              PDF to XML Converter
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
              Transform your PDF documents into structured XML data quickly and accurately.
            </p>
            <div className="mt-10 flex justify-center">
              <Link to="/login" className="inline-block bg-white py-3 px-8 rounded-md font-medium text-blue-600 hover:bg-blue-50 transition duration-300">
                Start Converting
              </Link>
              <Link to="/pricing" className="inline-block ml-4 py-3 px-8 rounded-md font-medium text-white border border-transparent hover:bg-blue-700 transition duration-300">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Simple File Upload Demo */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-2xl font-semibold text-gray-900">Try It Now</h2>
              <p className="mt-2 text-gray-500">Drop your PDF file below to see how it works</p>
              
              <div className="mt-8 border-2 border-dashed border-gray-300 rounded-lg p-12">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="mt-1 text-sm text-gray-500">
                    Drag and drop your file here, or <span className="text-blue-600 font-medium">browse</span>
                  </p>
                  <p className="mt-1 text-xs text-gray-500">PDF files up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, Powerful Conversion
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Our tool makes it easy to transform PDF documents into structured XML.
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 shadow h-full">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                        <div className="h-6 w-6 text-white">
                          {feature.icon}
                        </div>
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.title}</h3>
                    <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">How It Works</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900">Three simple steps</p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
                  <span className="text-lg font-bold">1</span>
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Upload</h3>
                <p className="mt-2 text-base text-gray-500">Upload your PDF file to our secure server</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
                  <span className="text-lg font-bold">2</span>
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Convert</h3>
                <p className="mt-2 text-base text-gray-500">Our system processes the PDF and extracts structured data</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
                  <span className="text-lg font-bold">3</span>
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Download</h3>
                <p className="mt-2 text-base text-gray-500">Download your XML file or save it to your account</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-2xl mx-auto text-center py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white">
            <span className="block">Ready to convert your files?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-100">
            Create an account to start converting PDF to XML instantly.
          </p>
          <Link
            to="/login"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto"
          >
            Sign up free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturePage;