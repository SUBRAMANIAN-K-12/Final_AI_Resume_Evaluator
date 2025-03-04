"use client";
import { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { analyzeOverall } from "../../../../service/aiCall";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement
);

const EvaluateResume = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedField, setSelectedField] = useState(null);
  const [avgScore, setAvgScore] = useState(0);
  const [fieldScores, setFieldScores] = useState([]);
  const [grammarScore, setGrammarScore] = useState(0);
  const [atsScore, setAtsScore] = useState(0);

  useEffect(() => {
    const storedData = localStorage.getItem("resumeAnalysis");

    const fetchData = async () => {
      try {
        const result = await analyzeOverall(storedData);
        setAnalysisData(result);
        calculateScores(result.analysis);
        setGrammarScore(result.grammar.score);
        setAtsScore(result.atsCompatibility.score);
      } catch (error) {
        console.error("Error sending request:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateScores = (analysis) => {
    const scores = analysis.map((fieldData) => fieldData.score);
    const totalScore = scores.reduce((acc, score) => acc + score, 0);
    const avg = totalScore / scores.length;
    setAvgScore(avg);
    setFieldScores(scores);
  };

  const handleFieldClick = (fieldName) => {
    setSelectedField(selectedField === fieldName ? null : fieldName);
  };

  const pieChartData = {
    labels: ["Overall Score"],
    datasets: [
      {
        label: "Overall Score",
        data: [avgScore, 100 - avgScore],
        backgroundColor: ["#FFA500", "#e0e0e0"],
        borderWidth: 1,
      },
    ],
  };

  const generateRandomColors = (n) => {
    return Array.from({ length: n }, () => `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`);
  };

  const barChartData = {
    labels: analysisData?.analysis?.map((fieldData) => fieldData.fieldName) || [],
    datasets: [
      {
        label: "Field Scores",
        data: fieldScores,
        backgroundColor: generateRandomColors(fieldScores.length),
        borderColor: "#388e3c",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-900 p-6 rounded-lg w-3/4 max-w-4xl">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Resume Analysis</h2>

        {loading ? (
          <div className="flex justify-center items-center">
            <video autoPlay loop muted className="w-full max-w-md rounded-lg shadow-lg">
              <source src="/assets/videos/loading.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div>
            {/* Container for Pie chart and additional scores */}
            <div className="flex justify-center items-center mb-6 space-x-6">
              {/* Pie chart for Overall Score */}
              <div className="text-center">
                <h3 className="text-xl text-white font-semibold mb-4">Overall Score</h3>
                <Pie data={pieChartData} width={100} height={100} />{" "}
               
                <p className="mt-4 text-xl text-white font-bold">
                  Average Score: {avgScore.toFixed(2)}/100
                </p>
              </div>

              {/* Display Grammar and ATS scores */}
              <div className="space-y-4 text-white ">
                <div>
                  <h4 className="text-lg font-semibold">Grammar Score</h4>
                  <p className="text-xl font-bold">{grammarScore}/100</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold">
                    ATS Compatibility Score
                  </h4>
                  <p className="text-xl font-bold">{atsScore}/100</p>
                </div>
              </div>
            </div>

            {/* Bar chart for Field Scores */}
            <div className="mb-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Field Scores</h3>
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  scales: { y: { beginAtZero: true } },
                }}
              />
            </div>

            <h3 className="text-xl text-white font-semibold mb-4">
              Here are the analysis for each field:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {analysisData?.analysis?.map((fieldData, index) => (
                <div
                  key={index}
                  className="bg-gray-400 font-white p-4 rounded-md shadow-md cursor-pointer hover:shadow-lg hover:bg-gray-500 transition-all duration-300 transform hover:scale-105"
                  onClick={() => handleFieldClick(fieldData.fieldName)}
                >
                  <h4 className="text-lg font-bold text-gray-800">
                    {fieldData.fieldName}
                  </h4>
                </div>
              ))}
            </div>

            {/* Detailed View for Selected Field */}
            {selectedField && (
              <div className="mt-6 space-y-4">
                {analysisData?.analysis
                  .filter((fieldData) => fieldData.fieldName === selectedField)
                  .map((fieldData, index) => (
                    <div
                      key={index}
                      className="bg-blue-300 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-gray-100 transform hover:scale-105"
                    >
                      <h4 className="text-lg font-bold text-gray-800">
                        {fieldData.fieldName}
                      </h4>
                      <div className="mt-2">
                        <p className="font-medium text-gray-600">
                          <strong>Score:</strong> {fieldData.score}/100
                        </p>
                        <p className="mt-2 text-gray-700">
                          <strong>Optimization Suggestions:</strong>{" "}
                          {fieldData.suggestions}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaluateResume;
