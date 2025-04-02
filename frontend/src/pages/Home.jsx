import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Upload, FileText, Copy, Download, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";

export default function HomePage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [pdfObjectUrl, setPdfObjectUrl] = useState(null);
  const { fetchHistory, xmlData, setXmlData, pdfUrl, setPdfUrl, token, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const fileInputRef = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    if (!token) {
      toast.warn("You need to log in first! Redirecting...", { autoClose: 2000 });
      setTimeout(() => navigate("/login"), 1000);
      return;
    }

    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please select a PDF file.", { autoClose: 2000 });
        return;
      }
      setFile(selectedFile);
      // Create a new object URL from the file
      if (pdfObjectUrl) {
        URL.revokeObjectURL(pdfObjectUrl);
      }
      const newObjectUrl = URL.createObjectURL(selectedFile);
      setPdfObjectUrl(newObjectUrl);
      toast.info(`File "${selectedFile.name}" selected`, { autoClose: 2000 });
    }
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (!token) {
      toast.warn("You need to log in first! Redirecting...", { autoClose: 2000 });
      setTimeout(() => navigate("/login"), 1000);
      return;
    }

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type !== "application/pdf") {
        toast.error("Please drop a PDF file.", { autoClose: 2000 });
        return;
      }
      setFile(droppedFile);
      // Create a new object URL from the file
      if (pdfObjectUrl) {
        URL.revokeObjectURL(pdfObjectUrl);
      }
      const newObjectUrl = URL.createObjectURL(droppedFile);
      setPdfObjectUrl(newObjectUrl);
      toast.info(`File "${droppedFile.name}" selected`, { autoClose: 2000 });
    }
  };

  // Simulate progress for better UX
  const simulateProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + Math.random() * 10;
      });
    }, 500);
    
    return () => clearInterval(interval);
  };

  // Convert PDF to XML
  const convertToXml = async () => {
    if (!file) {
      toast.error("Please upload a PDF file first.", { autoClose: 2000 });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    const stopProgress = simulateProgress();
    
    try {
      // Upload file to PDF.co
      const uploadResponse = await axios.post("https://api.pdf.co/v1/file/upload", formData, {
        headers: {
          "x-api-key": import.meta.env.VITE_PDFCO_API_KEY,
          "Content-Type": "multipart/form-data",
        },
      });

      if (!uploadResponse.data.url) {
        toast.error("File upload failed.", { autoClose: 2000 });
        setLoading(false);
        setUploadProgress(0);
        return;
      }

      const fileUrl = uploadResponse.data.url;
      setPdfUrl(fileUrl);
      setUploadProgress(98);

      // Convert to XML
      const convertResponse = await axios.post(
        "https://api.pdf.co/v1/pdf/convert/to/xml",
        { url: fileUrl },
        {
          headers: { "x-api-key": import.meta.env.VITE_PDFCO_API_KEY },
        }
      );

      if (convertResponse.data.url) {
        const xmlResponse = await axios.get(convertResponse.data.url);
        setXmlData(xmlResponse.data);
        setUploadProgress(100);

        // Save to backend
        const token = localStorage.getItem("token");
        const backendFormData = new FormData();
        backendFormData.append("file", file);
        backendFormData.append("xmlOutput", xmlResponse.data);

        const response = await axios.post(
          backendUrl + "/api/user/save-history",
          backendFormData,
          { headers: { token } }
        );

        if (response.data.success) {
          fetchHistory();
          toast.success("File converted & saved successfully!", { autoClose: 2000 });
        }
      }
    } catch (error) {
      console.error("Error converting PDF to XML:", error.response?.data || error.message);
      toast.error("Conversion failed. Try again!", { autoClose: 2000 });
      setUploadProgress(0);
    }
    setLoading(false);
  };

  // Copy XML to Clipboard
  const copyXmlToClipboard = () => {
    navigator.clipboard.writeText(xmlData).then(() => {
      toast.success("XML copied to clipboard!", { autoClose: 2000 });
    });
  };

  // Download XML File
  const downloadXmlFile = () => {
    const blob = new Blob([xmlData], { type: "application/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "converted.xml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  useEffect(() => {
    fetch("https://pdf-to-xml-converter-nq0n.onrender.com").catch(error => console.error("API call failed", error));
}, []);

  useEffect(() => {
    fetchHistory();
    
    // Cleanup function to revoke object URLs when component unmounts
    return () => {
      if (pdfObjectUrl) {
        URL.revokeObjectURL(pdfObjectUrl);
      }
    };
  }, []);

  useEffect(() => {
    // When pdfUrl changes from context (from sidebar selection), fetch the PDF
    if (pdfUrl && !loading) {
      setLoading(true);
      fetch(pdfUrl)
        .then(response => response.blob())
        .then(blob => {
          // Create a file object from the blob
          const pdfFile = new File([blob], "document.pdf", { type: "application/pdf" });
          setFile(pdfFile);
          
          // Create and set a new object URL
          if (pdfObjectUrl) {
            URL.revokeObjectURL(pdfObjectUrl);
          }
          const newObjectUrl = URL.createObjectURL(pdfFile);
          setPdfObjectUrl(newObjectUrl);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching PDF from URL:", error);
          setLoading(false);
          toast.error("Error loading PDF preview", { autoClose: 2000 });
        });
    }
  }, [pdfUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            PDF to XML Converter
          </h1>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            Convert your PDF documents to structured XML format with just a few clicks
          </p>
        </div>

        {/* Upload Section */}
        <div className="mb-10">
          <div 
            className={`
              bg-white rounded-xl shadow-md overflow-hidden p-8 
              border-2 border-dashed transition-all duration-300
              ${dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="bg-indigo-100 p-4 rounded-full mb-4">
                <Upload className="h-10 w-10 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Upload your PDF file</h2>
              <p className="text-gray-500 text-center mb-4">
                Drag & drop your file here or click the button below
              </p>
              
              {file && (
                <div className="w-full max-w-md p-4 bg-indigo-50 rounded-lg mb-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-indigo-600" />
                    <div className="text-sm">
                      <p className="font-medium text-gray-800 truncate max-w-xs">{file.name}</p>
                      <p className="text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setFile(null);
                      if (pdfObjectUrl) {
                        URL.revokeObjectURL(pdfObjectUrl);
                        setPdfObjectUrl(null);
                      }
                    }} 
                    className="p-1 rounded-full hover:bg-red-100 text-red-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
              
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
                ref={fileInputRef}
              />
              <button
                onClick={() => document.getElementById('fileInput').click()}
                className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-md flex items-center gap-2"
              >
                <Upload className="h-5 w-5" />
                Select PDF File
              </button>
            </div>
          </div>
          
          {/* Conversion Button */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={convertToXml}
              disabled={!file || loading}
              className={`
                px-8 py-3 rounded-full font-medium shadow-md flex items-center gap-2
                transition-all duration-300 w-64 justify-center
                ${!file || loading 
                  ? 'bg-gray-400 text-gray-100 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:shadow-lg transform hover:-translate-y-1'
                }
              `}
            >
              {loading ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  Converting...
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5" />
                  Convert to XML
                </>
              )}
            </button>
          </div>
          
          {/* Progress Bar */}
          {loading && (
            <div className="mt-4 w-full max-w-md mx-auto">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-indigo-600 to-blue-500 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <div className="text-right text-sm text-gray-500 mt-1">
                {uploadProgress.toFixed(0)}%
              </div>
            </div>
          )}
        </div>

        {/* Preview Section - PDF & XML Side-by-Side */}
        {(file || xmlData || pdfUrl) && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
            <div className="border-b border-gray-200">
              <div className="px-6 py-4">
                <h2 className="text-xl font-bold text-gray-800">Document Preview</h2>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row">
              {/* Left Side - PDF Viewer */}
              <div className="lg:w-1/2 h-[600px] border-b lg:border-b-0 lg:border-r border-gray-200">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-indigo-600" />
                      PDF Preview
                    </h3>
                  </div>
                  
                  <div className="flex-1 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                    {pdfObjectUrl ? (
                      // Preview the file using the object URL
                      <iframe 
                        src={pdfObjectUrl} 
                        className="w-full h-full"
                        title="PDF Preview"
                      ></iframe>
                    ) : loading ? (
                      // Loading state
                      <div className="flex items-center justify-center h-full">
                        <RefreshCw className="h-10 w-10 text-indigo-400 animate-spin mr-3" />
                        <p className="text-gray-500">Loading PDF preview...</p>
                      </div>
                    ) : (
                      // No PDF yet
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-500">No PDF selected</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side - XML Output */}
              <div className="lg:w-1/2 h-[600px]">
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-indigo-600" />
                      Converted XML
                    </h3>
                    
                    {/* XML Action Buttons */}
                    {xmlData && (
                      <div className="flex gap-2">
                        <button 
                          onClick={copyXmlToClipboard} 
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                          title="Copy XML"
                        >
                          <Copy className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={downloadXmlFile} 
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                          title="Download XML"
                        >
                          <Download className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                    {xmlData ? (
                      <pre className="h-full text-sm text-gray-700 p-4 overflow-auto font-mono">
                        {xmlData}
                      </pre>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-500">No XML data available</p>
                          {file && !loading && (
                            <button
                              onClick={convertToXml}
                              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 inline-flex items-center gap-2"
                            >
                              <FileText className="h-4 w-4" /> Convert Now
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Bottom Action Buttons */}
                  {xmlData && (
                    <div className="mt-4 flex gap-2">
                      <button 
                        onClick={copyXmlToClipboard} 
                        className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Copy className="h-5 w-5" />
                        Copy XML
                      </button>
                      <button 
                        onClick={downloadXmlFile} 
                        className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Download className="h-5 w-5" />
                        Download XML
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Info Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-indigo-100 p-3 rounded-full mb-3">
                <Upload className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">1. Upload PDF</h3>
              <p className="text-gray-600 text-sm">
                Select or drag and drop your PDF document into the upload area
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-indigo-100 p-3 rounded-full mb-3">
                <RefreshCw className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">2. Convert</h3>
              <p className="text-gray-600 text-sm">
                Our system processes the PDF and extracts the content into XML format
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-indigo-100 p-3 rounded-full mb-3">
                <Download className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">3. Download</h3>
              <p className="text-gray-600 text-sm">
                Preview the result and download the structured XML file
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}