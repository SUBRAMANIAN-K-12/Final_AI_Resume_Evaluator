import { useState } from "react";

import Image from "next/image";
import Guide1 from "./../../public/assets/images/guide1.jpeg";
import Guide2 from "./../../public/assets/images/guide2.jpeg";
import Guide3 from "./../../public/assets/images/guide3.jpeg";

const StepByStepGuidance = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    "Dashboard Guide",
    "Upload Guide for Resume",
    "Display Feedback",
  ];

  const content = [
    {
      title: "Dashboard Guide",
      description:
        "Welcome to your dashboard! Here, you can navigate through essential features designed to help you manage your job applications effectively. If you want to create a new resume, click on the *Generate* option to get started. If you wish to evaluate your existing resume, select the *Upload resume* option to receive insights and recommendations for improvement. Take control of your job search with these powerful tools.",
      media: Guide1,
      type: "image",
    },
    {
      title: "Upload Guide for Resume",
      description:
        "Follow the steps to upload your resume efficiently, ensuring it is compatible with our system. Before uploading, add a clear and professional title to your resume for easy identification. This helps streamline the process and ensures better organization of your job applications.",
      media: Guide2,
      type: "image",
    },
    {
      title: "Display Feedback",
      description:
        "Based on your resume evaluation, we provide a detailed analysis to help you improve its effectiveness. Your resume is assessed on key aspects, including grammar accuracy, relevant skills, and alignment with your career objectives. Additionally, we generate a score that reflects the overall strength of your resume, helping you identify areas for enhancement. A visual representation of your evaluation allows you to quickly understand your performance across different criteria, ensuring a well-structured and impactful resume.",
      media: Guide3,
      type: "image",
    },
  ];

  return (
    <div className="w-full bg-gray-900 min-h-screen flex justify-center items-center p-6">
      
        <div className="features-highlighted w-full max-w-7xl mx-auto bg-gray-900 p-6">
          <ul className="flex justify-evenly m-0 list-none mb-8 space-x-4 bg-gray-900 p-4 rounded-lg shadow-md">
            {tabs.map((tab, index) => (
              <li
                key={index}
                onClick={() => setActiveTab(index)}
                className={`cursor-pointer py-3 px-5 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  activeTab === index
                    ? "bg-green-500 text-white shadow-xl scale-105"
                    : "bg-gray-200 text-gray-700 hover:bg-green-100"
                }`}
              >
                <div className="feature-tab-title font-semibold text-lg">
                  {tab}
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-8 bg-gray-900 p-6 rounded-lg shadow-lg w-full">
            <div className="lg:w-1/3 mb-6 lg:mb-0 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 p-4 rounded-xl shadow-md">
              {content[activeTab].type === "video" ? (
                <iframe
                  className="w-full h-72 rounded-xl shadow-lg transition-all duration-500 transform hover:scale-105"
                  src={content[activeTab].media}
                  title={content[activeTab].title}
                  allowFullScreen
                ></iframe>
              ) : (
                <Image
                  src={content[activeTab].media}
                  alt={content[activeTab].title}
                  width={500}
                  height={300}
                  className="rounded-xl shadow-lg transition-all duration-500 transform hover:scale-105"
                />
              )}
            </div>

            <div className="lg:w-2/3 mb-6 lg:mb-0 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 p-4 rounded-xl shadow-md">
              <div className="content-step">
                <h3 className="text-green-500 text-2xl font-bold">
                  {content[activeTab].title}
                </h3>
                <p className="text-gray-800 text-lg">
                  {content[activeTab].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default StepByStepGuidance;
