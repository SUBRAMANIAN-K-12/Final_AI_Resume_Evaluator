'use client';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';

function Banner() {
  return (
    <div className="flex flex-col lg:flex-row items-center bg-gray-900 justify-center min-h-[500px] p-6">
      {/* Left Side - Title */}
      <div className="w-full lg:w-1/2 flex items-center justify-center text-center p-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
        Welcome To <br></br> AI Resume Evaluator & Generator
        </h1>
      </div>

      {/* Right Side - Carousel */}
      <div className="w-full lg:w-1/2">
        <Carousel fade controls={false} pause={false} className="max-w-[800px] mx-auto">
          <Carousel.Item interval={3000}>
            <div className="relative h-[400px] flex items-center justify-center">
              <Image
                src="https://images.pexels.com/photos/5598289/pexels-photo-5598289.jpeg"
                alt="Professional resume builder interface"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <Carousel.Caption>
              <h3 className="text-capitalize">Resume Builder</h3>
              {/* <p className="bg-[#71BBB2] text-black text-lg p-2 border border-black rounded-lg">
                Optimize your resume with ATS-friendly templates and actionable tips to increase your chances of landing your dream job.
              </p> */}
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item interval={3000}>
            <div className="relative h-[400px] flex items-center justify-center">
              <Image
                src="https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg"
                alt="Person using resume generation tool"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <Carousel.Caption>
              <h3 className="text-capitalize text-gray-900">Generate Resume</h3>
              {/* <p className="bg-[#71BBB2] text-black text-lg p-2 border border-black rounded-lg">
                Get your resume proofread and optimized with our advanced tools, ensuring it stands out to employers and ATS.
              </p> */}
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item interval={3000}>
            <div className="relative h-[400px] flex items-center justify-center">
              <Image
                src="https://images.pexels.com/photos/5699475/pexels-photo-5699475.jpeg"
                alt="Graph showing resume analysis results"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <Carousel.Caption>
              <h3 className="text-capitalize text-gray-400">Analysis</h3>
              {/* <p className="bg-[#71BBB2] text-black text-lg p-2 border border-black rounded-lg">
                Leverage our AI-powered cover letter generator and LinkedIn optimization tips to take your career to the next level.
              </p> */}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default Banner;
