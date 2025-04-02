import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-xl leading-6 font-medium text-gray-900">
              Our Mission
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Making document conversion simple and accessible for everyone.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <p className="text-base text-gray-700">
              Founded in 2023, our PDF to XML converter was created to solve a common problem: efficiently extracting structured data from PDF documents. Our team of developers built this tool to make document processing easier and more accessible for businesses and individuals alike.
            </p>
            <p className="mt-4 text-base text-gray-700">
              We believe that technology should simplify tasks, not complicate them. That's why we've designed our converter to be intuitive and straightforward, while still providing powerful conversion capabilities.
            </p>
            
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium text-gray-900">What We Offer</h3>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg className="flex-shrink-0 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2">Fast, accurate PDF to XML conversion</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="flex-shrink-0 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2">Secure document handling</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="flex-shrink-0 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2">Customizable output formats</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900">Our Values</h3>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <svg className="flex-shrink-0 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2">Simplicity in design and function</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="flex-shrink-0 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2">Privacy and data security</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="flex-shrink-0 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2">Continuous improvement</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Section (Optional) */}
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-xl leading-6 font-medium text-gray-900">
              Our Team
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              The people behind the technology.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              <div className="text-center">
                <div className="h-24 w-24 rounded-full bg-gray-200 mx-auto flex items-center justify-center">
                  <svg className="h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">Alex Johnson</h3>
                  <p className="text-sm text-gray-500">Founder & Lead Developer</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="h-24 w-24 rounded-full bg-gray-200 mx-auto flex items-center justify-center">
                  <svg className="h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">Sam Rivera</h3>
                  <p className="text-sm text-gray-500">UI/UX Designer</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="h-24 w-24 rounded-full bg-gray-200 mx-auto flex items-center justify-center">
                  <svg className="h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">Taylor Kim</h3>
                  <p className="text-sm text-gray-500">Customer Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-8 text-center">
          <Link to="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            Back to Home
          </Link>
          <Link to="/login" className="ml-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white shadow-sm hover:bg-gray-50">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;