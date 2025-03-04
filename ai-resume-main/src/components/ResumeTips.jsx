'use client';
import React from 'react';
import { FaClipboardCheck, FaPen, FaListAlt, FaUserEdit } from 'react-icons/fa';

const ResumeTips = () => {
  const tips = [
    {
      icon: <FaClipboardCheck className="text-blue-500 text-2xl" />,
      title: "Tailor Your Resume for the Job",
      description: "Make sure your resume is tailored to the specific job you're applying for by highlighting relevant skills and experience.",
    },
    {
      icon: <FaPen className="text-green-500 text-2xl" />,
      title: "Use Action Verbs",
      description: "Start your bullet points with strong action verbs to make your accomplishments stand out.",
    },
    {
      icon: <FaListAlt className="text-orange-500 text-2xl" />,
      title: "Keep It Concise",
      description: "Keep your resume to one or two pages. Focus on your most important achievements and qualifications.",
    },
    {
      icon: <FaUserEdit className="text-purple-500 text-2xl" />,
      title: "Highlight Achievements, Not Just Duties",
      description: "Employers want to see what you’ve accomplished. Focus on outcomes rather than just listing your job duties.",
    },
  ];

  return (
    <section className="py-12 bg-gray-900">
      <div className="container mx-auto text-center mb-8">
        <h2 className="text-3xl font-semibold text-white">How our website benefits you!</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-gray-100"
          >
            {tip.icon}
            <div>
              <h4 className="text-xl font-semibold text-gray-900">{tip.title}</h4>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResumeTips;
