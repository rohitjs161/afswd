import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockCourses } from '../data/mockCourses';
import { useCart } from '../contexts/CartContext';

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, hasPurchasedCourse, purchaseCourse, getCourseProgress } = useAuth();
  const { addToCart } = useCart();
  const [course, setCourse] = useState(null);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    const foundCourse = mockCourses.find(c => c.id === courseId);
    setCourse(foundCourse);
  }, [courseId]);

  const handlePurchase = async () => {
    setPurchasing(true);
    
    // Simulate purchase process
    setTimeout(() => {
      const result = purchaseCourse(courseId);
      if (result.success) {
        navigate(`/course/${courseId}/watch`);
      } else {
        alert(result.error || 'Purchase failed');
      }
      setPurchasing(false);
    }, 1000);
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Course Not Found</h2>
          <Link to="/courses" className="text-blue-600 hover:underline">
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const videos = course.media.filter(item => item.type === 'video');
  const totalDuration = videos.reduce((total, video) => total + video.durationSec, 0);
  const hours = Math.floor(totalDuration / 3600);
  const minutes = Math.floor((totalDuration % 3600) / 60);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link to="/courses" className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block">
            ← Back to Courses
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6">
              <div className="flex items-start space-x-4">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {course.title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {course.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>By {course.instructor}</span>
                    <span>•</span>
                    <span>{videos.length} videos</span>
                    <span>•</span>
                    <span>{hours}h {minutes}m total</span>
                    <span>•</span>
                    <span>{course.category}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Course Content
              </h2>
              <div className="space-y-3">
                {videos.map((video, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 dark:border-gray-700"
                  >
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {video.description}
                      </p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {Math.floor(video.durationSec / 60)}:{(video.durationSec % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sticky top-6">
              {/* Price */}
              <div className="text-center mb-6">
                <div className="text-3xl font-bold mb-2">
                  {course.isFree ? (
                    <span className="text-green-600 dark:text-green-400">FREE</span>
                  ) : (
                    <span className="text-gray-900 dark:text-white">
                      ₹{course.priceINR.toLocaleString()}
                    </span>
                  )}
                </div>
                {!course.isFree && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">One-time payment</p>
                )}
              </div>

              {/* Action Button */}
              <div className="mb-6">
                {isAuthenticated ? (
                  (() => {
                    const isPurchased = hasPurchasedCourse(courseId);
                    const progress = getCourseProgress(courseId);
                    
                    if (course.isFree || isPurchased) {
                      return (
                        <Link
                          to={`/course/${courseId}/watch`}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium text-center block transition-colors"
                        >
                          {progress.currentVideo > 0 ? 'Continue Learning' : 'Start Learning'}
                        </Link>
                      );
                    } else {
                      return (
                        <>
                          <button
                            onClick={handlePurchase}
                            disabled={purchasing}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-medium text-center transition-colors mb-2 cursor-pointer"
                          >
                            {purchasing ? 'Processing...' : 'Buy Now'}
                          </button>
                          <button
                            onClick={() => addToCart({
                              id: course.id,
                              title: course.title,
                              instructor: course.instructor,
                              price: course.priceINR,
                            })}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium text-center transition-colors cursor-pointer"
                          >
                            Add to Cart
                          </button>
                        </>
                      );
                    }
                  })()
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/signup"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-center block transition-colors"
                    >
                      Sign Up to Start
                    </Link>
                    <Link
                      to="/login"
                      className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-medium text-center block hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>

              {/* Course Info */}
              <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Instructor</span>
                  <span className="font-medium text-gray-900 dark:text-white">{course.instructor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Duration</span>
                  <span className="font-medium text-gray-900 dark:text-white">{hours}h {minutes}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Videos</span>
                  <span className="font-medium text-gray-900 dark:text-white">{videos.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Category</span>
                  <span className="font-medium text-gray-900 dark:text-white">{course.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Level</span>
                  <span className="font-medium text-gray-900 dark:text-white">Beginner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
