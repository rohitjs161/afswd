import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockCourses } from '../data/mockCourses';
import { useCart } from '../contexts/CartContext';

const CourseList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { user, hasPurchasedCourse, getCourseProgress } = useAuth();
  const { addToCart } = useCart();
  const [toast, setToast] = useState(null);

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(mockCourses.map(course => course.category)))];

  // Filter courses
  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCourseButtonContent = (course) => {
    if (!user) {
      return {
        type: 'link',
        text: 'View Details',
        link: `/course/${course.id}`,
        style: 'px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors'
      };
    }

    const isPurchased = hasPurchasedCourse(course.id);
    const progress = getCourseProgress(course.id);

    if (course.isFree || isPurchased) {
      if (progress.currentVideo > 0) {
        return {
          type: 'link',
          text: 'Continue',
          link: `/course/${course.id}/watch`,
          style: 'px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors'
        };
      } else {
        return {
          type: 'link',
          text: 'Start Learning',
          link: `/course/${course.id}/watch`,
          style: 'px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors'
        };
      }
    }

    // Paid and not purchased
    return {
      type: 'button',
      text: 'Buy Now',
      style: 'px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded transition-colors',
      onClick: () => {
        addToCart({
          id: course.id,
          title: course.title,
          instructor: course.instructor,
          price: course.priceINR,
        });
        setToast({ type: 'success', message: `Added "${course.title}" to cart` });
        setTimeout(() => setToast(null), 2000);
      }
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Simple Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Courses</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Learn programming with expert instructors</p>
        </div>

        {/* Simple Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500"
              placeholder="Search courses..."
            />

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-32 object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 bg-white/90 text-gray-800 text-xs rounded-full">
                    {course.category}
                  </span>
                </div>
                {course.isFree && (
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                      FREE
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-3">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-2 line-clamp-2">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{course.instructor}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {course.media.filter(m => m.type === 'video').length} videos
                  </span>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <span className={`font-semibold text-sm ${course.isFree ? 'text-green-600' : 'text-blue-600'}`}>
                    {course.isFree ? 'FREE' : `₹${course.priceINR.toLocaleString()}`}
                  </span>
                  
                  {(() => {
                    const buttonInfo = getCourseButtonContent(course);
                    if (buttonInfo.type === 'link') {
                      return (
                        <Link
                          to={buttonInfo.link}
                          className={buttonInfo.style}
                        >
                          {buttonInfo.text}
                        </Link>
                      );
                    } else {
                      return (
                        <button
                          className={buttonInfo.style + ' cursor-pointer'}
                          onClick={buttonInfo.onClick}
                        >
                          {buttonInfo.text}
                        </button>
                      );
                    }
                  })()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No courses found. Try adjusting your search.</p>
          </div>
        )}
      </div>
    {/* Toast Notification */}
    {toast && (
      <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-lg font-semibold text-white bg-gradient-to-br from-indigo-500 to-purple-500 animate-fadein`}>
        {toast.message}
      </div>
    )}
    <style>{`
      .animate-fadein { animation: fadein .3s cubic-bezier(.4,0,.2,1); }
      @keyframes fadein { from { opacity: 0; } to { opacity: 1; } }
    `}</style>
    </div>
  );
};

export default CourseList;
