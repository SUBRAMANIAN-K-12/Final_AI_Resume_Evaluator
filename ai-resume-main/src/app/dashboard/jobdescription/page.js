"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion"; // Import animation
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { uploadPDF } from "../../../service/uploadFile";

GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const JobDescription = () => {
  const [filePreview, setFilePreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileSelected, setFileSelected] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const handleFileSelect = () => fileInputRef.current?.click();
  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) selectFile(file);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) selectFile(file);
  };
  const selectFile = (file) => {
    const fileURL = URL.createObjectURL(file);
    setFilePreview(fileURL);
    setFileName(file.name);
    setFileSelected(true);
    setShowPreview(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileSelected || !jobDescription) {
      return alert("Please select a file and provide a job description.");
    }

    setShowToast(true);
    await uploadPDF(fileInputRef.current.files[0]);

    extractTextFromPDF(fileInputRef.current.files[0]);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      try {
        const pdf = await getDocument(new Uint8Array(reader.result)).promise;
        let extractedPDFText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          extractedPDFText +=
            textContent.items.map((item) => item.str).join(" ") + "\n";
        }

        const jobAnalysisResponse = {
          extractedText: extractedPDFText,
          jobDescription: jobDescription,
        };

        localStorage.setItem(
          "jobAnalysis",
          JSON.stringify(jobAnalysisResponse)
        );

        router.push("jobdescription/evaluate");
      } catch (error) {
        console.error("Error extracting text:", error);
      }
    };
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-r from-gray-900 via-blue-700 to-gray-300 p-6">
      {/* Upload Resume Section */}
      <div className="w-full lg:w-1/2 flex justify-center p-6">
        <div className="w-full max-w-lg bg-gray-900 bg-opacity-90 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            Upload Your Resume
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white font-semibold mb-2">
                Job Description
              </label>
              <textarea
                className="w-full border text-white bg-gray-600 p-2 rounded placeholder-gray-300"
                rows="3"
                placeholder="Enter job description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
            <div
              onDrop={handleFileDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-dashed border-4 p-10 min-h-[200px] text-center rounded cursor-pointer flex flex-col justify-center"
            >
              <p className="text-white">
                Drag & drop your file here or{" "}
                <span
                  className="text-blue-500 underline"
                  onClick={handleFileSelect}
                >
                  browse
                </span>
              </p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            {fileName && (
              <p className="text-center text-blue-400">{fileName}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-900 text-white p-2 rounded"
            >
              Evaluate
            </button>
          </form>
        </div>
      </div>

      {/* File Preview Section */}
      {showPreview && (
        <div className="w-full lg:w-1/2 flex flex-col items-center p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Uploaded File
          </h2>
          <div className="w-full max-w-lg h-[500px] bg-gray-100 shadow-lg rounded-lg p-4">
            <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
              <Viewer fileUrl={filePreview} />
            </Worker>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div className="fixed bottom-5 right-5">
        <AnimatePresence>
          {showToast && (
            <motion.div
              className="bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg rounded-lg p-4 flex items-center space-x-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-lg">✅</span>
              <p className="text-sm">⏳ Evaluating the resume...</p>
              <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JobDescription;
