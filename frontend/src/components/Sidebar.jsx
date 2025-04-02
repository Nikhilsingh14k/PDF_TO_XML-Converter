import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Plus, Trash, Menu, LogOut, FileText, ChevronLeft, ChevronRight, Clock, User, Search } from "lucide-react";
import { AppContext } from "../context/AppContext";

export default function Sidebar({ newFile }) {
  const [open, setOpen] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const { 
    token, 
    setToken, 
    history, 
    setHistory, 
    fetchHistory, 
    setXmlData, 
    setPdfUrl, 
    userData,
    backendUrl
  } = useContext(AppContext);

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    if (newFile) {
      setHistory((prev) => [newFile, ...prev]);
    }
  }, [newFile]);

  const deleteHistory = async (index) => {
    try {
      const updatedHistory = [...history];
      updatedHistory.splice(index, 1);
      setHistory(updatedHistory);

      const token = localStorage.getItem("token");
      await axios.post(
        backendUrl + "/api/user/delete-history",
        { index },
        { headers: { token } }
      );
    } catch (error) {
      console.error("Error deleting history:", error);
    }
  };

  const loadXmlFromBackend = async (fileName) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        backendUrl + `/api/user/get-xml?fileName=${fileName}`,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        setXmlData(response.data.xmlOutput);
        setPdfUrl(response.data.pdfUrl);
      } else {
        console.error("Error fetching XML:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching XML:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  const formatFileName = (name) => {
    if (!name) return "Untitled Document";
    return name.length > 20 ? name.substring(0, 18) + "..." : name;
  };

  const filteredHistory = history.filter(item => 
    item.pdfFileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen sticky top-0 overflow-hidden flex">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } transition-all duration-300 h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white border-r border-gray-700 shadow-xl relative flex flex-col`}
      >
        <button
          onClick={() => setOpen(!open)}
          className="absolute right-0 top-12 bg-indigo-600 p-1 rounded-full shadow-lg hover:bg-indigo-500 transition-all duration-200 z-10"
        >
          {open ? <ChevronLeft className="h-5 w-5 text-white" /> : <ChevronRight className="h-5 w-5 text-white" />}
        </button>

        <div className="p-5 border-b border-gray-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-md">
              <FileText className="h-6 w-6 text-white" />
            </div>
            {open && <h1 className="text-xl font-bold text-white tracking-wide">DocViewer</h1>}
          </div>
        </div>

        {token && (
          <div className="p-4 border-b border-gray-700 flex items-center gap-3 flex-shrink-0">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-1">
              <User className="h-6 w-6 text-white" />
            </div>
            {open && (
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white truncate">{userData?.name || "User"}</p>
                <p className="text-xs text-gray-400 truncate">{userData?.email || "user@example.com"}</p>
              </div>
            )}
          </div>
        )}

        {open && (
          <div className="p-4">
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col flex-grow overflow-hidden p-4">
          {open && (
            <div className="flex items-center gap-2 mb-3 flex-shrink-0">
              <Clock className="h-5 w-5 text-indigo-400" />
              <h2 className="text-sm uppercase tracking-wider text-gray-400 font-semibold">Recent Files</h2>
            </div>
          )}

          <div className="flex-grow overflow-auto space-y-2 mt-2 custom-scrollbar">
            {filteredHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
                <div className="bg-gray-800 rounded-full p-4 mb-3">
                  <FileText className="h-6 w-6 text-gray-500" />
                </div>
                {open && (
                  <p className="text-gray-400 text-sm">No matching files found</p>
                )}
              </div>
            ) : (
              filteredHistory.map((item, index) => (
                <div
                  key={index}
                  onClick={() => loadXmlFromBackend(item.pdfFileName)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`flex items-center ${
                    open ? "justify-between" : "justify-center"
                  } p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    hoveredIndex === index
                      ? "bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-md"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <FileText
                      className={`h-5 w-5 flex-shrink-0 ${
                        hoveredIndex === index ? "text-white" : "text-indigo-400"
                      }`}
                    />
                    {open && (
                      <span className="truncate text-sm">
                        {formatFileName(item.pdfFileName)}
                      </span>
                    )}
                  </div>
                  {open && hoveredIndex === index && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteHistory(index);
                      }}
                      className="p-1 hover:bg-indigo-700 rounded-full group transition-all duration-150"
                    >
                      <Trash className="h-4 w-4 text-white group-hover:text-red-300" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-4 mt-auto flex-shrink-0">
          {token ? (
            <button
              onClick={handleLogout}
              className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-red-500 rounded-lg hover:from-red-500 hover:to-red-400 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              <LogOut className="h-5 w-5" />
              {open && <span>Logout</span>}
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg hover:from-indigo-500 hover:to-blue-400 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              <User className="h-5 w-5" />
              {open && <span>Create Account</span>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}