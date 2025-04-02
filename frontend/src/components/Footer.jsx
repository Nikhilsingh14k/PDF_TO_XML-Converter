import { Github, Mail, Heart, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gray-800">PDF to XML Converter</h3>
            <p className="text-gray-600 text-sm">
              Transform your PDF documents into structured XML data with our powerful, easy-to-use conversion tool.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="mailto:contact@example.com" 
                className="text-gray-500 hover:text-indigo-600 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-indigo-600 transition-colors text-sm flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" /> Home
                </a>
              </li>
              <li>
                <a href="/history" className="text-gray-600 hover:text-indigo-600 transition-colors text-sm flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" /> Conversion History
                </a>
              </li>
              <li>
                <a href="/account" className="text-gray-600 hover:text-indigo-600 transition-colors text-sm flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" /> My Account
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-600 hover:text-indigo-600 transition-colors text-sm flex items-center">
                  <ExternalLink className="h-4 w-4 mr-2" /> FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-gray-800">Support</h3>
            <p className="text-gray-600 text-sm">
              Having trouble with our service? We're here to help.
            </p>
            <a 
              href="/contact" 
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors inline-flex items-center text-sm"
            >
              Contact Support
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} PDF to XML Converter. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
        
        {/* Made with love line */}
        <div className="text-center mt-6 text-gray-500 text-sm flex items-center justify-center">
          Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> by Your Company Name
        </div>
      </div>
    </footer>
  );
}