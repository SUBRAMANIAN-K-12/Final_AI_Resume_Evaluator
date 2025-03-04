'use client';
import React, { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

const ReviewCard = ({ name, feedback, rating, isActive }) => {
  const stars = Array.from({ length: 5 }, (_, index) => index < rating);

  return (
    <Col
      md={4}
      className={`mb-4 transition-all duration-500 ease-in-out transform ${
        isActive ? 'scale-110 z-10' : 'scale-90 opacity-60'
      }`}
    >
      <Card className="shadow-lg bg-white rounded-lg border-0">
        <Card.Body className="p-4">
          <h5 className="font-semibold text-xl mb-2 text-gray-800">{name}</h5>
          <p className="text-gray-600 mb-4">{feedback}</p>
          <div className="flex items-center">
            {stars.map((filled, index) => (
              <FaStar key={index} color={filled ? "#ffbc00" : "#e4e5e9"} />
            ))}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

const Reviews = () => {
  const [activeIndex, setActiveIndex] = useState(1); 
  const reviews = [
    { name: 'John Doe', feedback: 'This service was amazing! Highly recommend it.', rating: 5 },
    { name: 'Jane Smith', feedback: 'Very satisfied with the results. Great support team!', rating: 4 },
    { name: 'Michael Brown', feedback: 'Good service, but I think it can be improved.', rating: 3 },
    { name: 'Sarah Johnson', feedback: 'Not bad, but not great either. Average service.', rating: 2 },
    { name: 'David Lee', feedback: 'Excellent support! Will use it again.', rating: 5 },
    { name: 'Emily Davis', feedback: 'Great experience, will recommend to others.', rating: 4 },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length); 
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);  
  };

  return (
    <section className="py-12 bg-gray-900">
      <div className="container mx-auto text-center mb-8">
        <h2 className="text-3xl font-semibold text-white">Customer Reviews</h2>
      </div>
      <div className="relative">
        {/* Carousel container with flex */}
        <div className="flex justify-center items-center overflow-hidden">
          <div
            className="flex transition-all duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(activeIndex - 1) * 33.33}%)`,  
              width: `${reviews.length * 33.33}%`,
            }}
          >
            {reviews.map((review, index) => (
              <ReviewCard
                key={index}
                name={review.name}
                feedback={review.feedback}
                rating={review.rating}
                isActive={index === activeIndex}
              />
            ))}
          </div>
        </div>

        {/* Previous and Next Buttons */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 pl-4">
          <button
            onClick={handlePrev}
            className="bg-gray-800 text-white p-2 rounded-full shadow-lg focus:outline-none hover:bg-gray-700"
          >
            &lt;
          </button>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 pr-4">
          <button
            onClick={handleNext}
            className="bg-gray-800 text-white p-2 rounded-full shadow-lg focus:outline-none hover:bg-gray-700"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
