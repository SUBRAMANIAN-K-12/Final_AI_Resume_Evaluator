// "use client";
// import { useState } from "react";
// import { Worker, Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import { useRouter } from "next/navigation";
// import React from "react";
// import { uploadPDF } from "../../../service/uploadFile";
// import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
// import { motion } from "framer-motion";

// // Set the worker URL to match pdfjs-dist version 3.11.174
// GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

// const analyzeResume = () => {
//   const [filePreview, setFilePreview] = useState(null);
//   const [fileName, setFileName] = useState("");
//   const [fileType, setFileType] = useState("");
//   const [fileSelected, setFileSelected] = useState(false);
//   const [showToast, setShowToast] = useState(false);

//   const fileInputRef = React.useRef(null);
//   const handleFileSelect = () => fileInputRef.current?.click();
//   const handleFileDrop = (e) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     if (file) selectFile(file);
//   };
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) selectFile(file);
//   };
//   const selectFile = (file) => {
//     setFilePreview(URL.createObjectURL(file));
//     setFileName(file.name);
//     setFileType(file.type);
//     setFileSelected(true);
//   };
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!fileSelected) {
//       return alert("Please select a file ");
//     }

//     setShowToast(true);
//     await uploadPDF(fileInputRef.current.files[0]);
//     await extractTextFromPDF(fileInputRef.current.files[0]);

//     setTimeout(() => setShowToast(false), 3000);
//   };

//   const extractTextFromPDF = async (file) => {
//     const reader = new FileReader();
//     reader.readAsArrayBuffer(file);
//     reader.onload = async () => {
//       try {
//         const pdf = await getDocument(new Uint8Array(reader.result)).promise;
//         let extractedText = "";
//         for (let i = 1; i <= pdf.numPages; i++) {
//           const page = await pdf.getPage(i);
//           const textContent = await page.getTextContent();
//           const pageText = textContent.items.map((item) => item.str).join(" ");
//           extractedText += pageText + "\n";
//         }

//         // Store AI response instead of extracted text
//         localStorage.setItem("resumeAnalysis", JSON.stringify(extractedText));

//         router.push("analyzeresume/evaluate");
//       } catch (error) {
//         console.error("Error extracting text:", error);
//       }
//     };
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-blue-700 to-gray-300 p-6 relative">
//       {/* Toast Notification */}
//       {showToast && (
//         <motion.div
//           initial={{ x: 100, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           exit={{ x: 100, opacity: 0 }}
//           transition={{ duration: 0.5 }}
//           className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-[1000]"
//         >
//           ⏳ Evaluating the resume...
//         </motion.div>
//       )}

//       {/* Left Section - Upload Form */}
//       <div className="w-full lg:w-1/2 flex justify-center mr-5 ml-16">
//         <div className="w-full h-[500px] p-6 bg-gray-900 bg-opacity-90 text-white rounded-lg shadow-lg flex flex-col justify-center">
//           <h2 className="text-2xl font-bold mb-4 text-center">
//             Upload Your Resume
//           </h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div
//               onDrop={handleFileDrop}
//               onDragOver={(e) => e.preventDefault()}
//               className="border-dashed border-4 p-16 min-h-[250px] text-center rounded cursor-pointer flex flex-col justify-center"
//             >
//               <p>
//                 Drag & drop your file here or{" "}
//                 <span
//                   className="text-blue-500 underline"
//                   onClick={handleFileSelect}
//                 >
//                   browse
//                 </span>
//               </p>
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//             </div>
//             {fileName && (
//               <p className="text-center text-blue-600">{fileName}</p>
//             )}
//             <button
//               type="submit"
//               className="w-full bg-blue-900 text-white p-2 rounded font-bold"
//             >
//               Evaluate
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Right Section - Uploaded Resume Preview */}
//       <div className="w-full lg:w-1/2 flex flex-col items-center">
//         {fileType === "application/pdf" && filePreview && (
//           <div className="w-full max-w-lg h-[500px] bg-gray-900 bg-opacity-90 rounded-lg shadow-lg p-4">
//             <h2 className="text-2xl font-bold mb-4 text-center text-white">
//               Uploaded Resume
//             </h2>
//             <div className="h-[420px] overflow-auto">
//               <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
//                 <Viewer fileUrl={filePreview} />
//               </Worker>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default analyzeResume;

"use client";
import { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useRouter } from "next/navigation";
import React from "react";
import { uploadPDF } from "../../../service/uploadFile";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { motion } from "framer-motion";

// Set the worker URL to match pdfjs-dist version 3.11.174
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const analyzeResume = () => {
  const [filePreview, setFilePreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileSelected, setFileSelected] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const fileInputRef = React.useRef(null);
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
    setFilePreview(URL.createObjectURL(file));
    setFileName(file.name);
    setFileType(file.type);
    setFileSelected(true);
  };
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fileSelected) {
      return alert("Please select a file ");
    }

    setShowToast(true);
    await uploadPDF(fileInputRef.current.files[0]);
    await extractTextFromPDF(fileInputRef.current.files[0]);

    setTimeout(() => setShowToast(false), 3000);
  };

  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      try {
        const pdf = await getDocument(new Uint8Array(reader.result)).promise;
        let extractedText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(" ");
          extractedText += pageText + "\n";
        }

        // Store AI response instead of extracted text
        localStorage.setItem("resumeAnalysis", JSON.stringify(extractedText));

        router.push("analyzeresume/evaluate");
      } catch (error) {
        console.error("Error extracting text:", error);
      }
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-blue-700 to-gray-300 p-6 relative">
      {showToast && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-[1000]"
        >
          ⏳ Evaluating the resume...
        </motion.div>
      )}

      <div className={`flex flex-col lg:flex-row items-center w-full ${fileSelected ? 'justify-between' : 'justify-center'}`}>
        <div className="w-full lg:w-1/2 flex justify-center p-4">
          <div className="w-full max-w-lg h-[500px] p-6 bg-gray-900 bg-opacity-90 text-white rounded-lg shadow-lg flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4 text-center">Upload Your Resume</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-dashed border-4 p-16 min-h-[250px] text-center rounded cursor-pointer flex flex-col justify-center"
              >
                <p>
                  Drag & drop your file here or {" "}
                  <span className="text-blue-500 underline" onClick={handleFileSelect}>
                    browse
                  </span>
                </p>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
              </div>
              {fileName && <p className="text-center text-blue-600">{fileName}</p>}
              <button type="submit" className="w-full bg-blue-900 text-white p-2 rounded font-bold">
                Evaluate
              </button>
            </form>
          </div>
        </div>

        {fileType === "application/pdf" && filePreview && (
          <div className="w-full lg:w-1/2 flex flex-col items-center p-4">
            <div className="w-full max-w-lg h-[500px] bg-gray-900 bg-opacity-90 rounded-lg shadow-lg p-4">
              <h2 className="text-2xl font-bold mb-4 text-center text-white">Uploaded Resume</h2>
              <div className="h-[420px] overflow-auto">
                <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
                  <Viewer fileUrl={filePreview} />
                </Worker>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default analyzeResume;
