import { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core"; 
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { GlobalWorkerOptions } from "pdfjs-dist";
import { getPDFLinks } from "../service/uploadFile";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Set the worker URL to match pdfjs-dist version 3.11.174
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const History = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    async function fetchLinks() {
      try {

        const response = await getPDFLinks();
        if (response.success) {
          setHistoryData(response.files);
        }
      } catch (error) {
        console.error("Error fetching PDF links:", error);
      }
    }
    fetchLinks();
  }, []);

  return (
    <div className="flex">
     
      <div className="w-1/2 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Your History</h2>
        <ul className="space-y-2">
          {historyData.map((item, index) => (
            <li key={index}>
              <button
                className="text-white-500 hover:text-white-700 hover:underline"
                onClick={() => setSelectedPdf(item.url)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section - PDF Viewer */}
      <div className="w-1/2 h-screen flex items-center justify-center">
        {selectedPdf && (
          <div className="w-11/12 h-5/6 border shadow-lg mt-[-90px]">

            <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
              <Viewer
                fileUrl={selectedPdf}
                plugins={[defaultLayoutPluginInstance]} // Use the default layout plugin
              />
            </Worker>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
