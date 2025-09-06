import React from 'react';
import { Link } from 'react-router-dom';

const CourseProgressCard = ({ course, showProgress = true }) => {
  const progressPercentage = course.progress || 0;
  const progressColor = progressPercentage === 100 ? 'bg-green-500' : 'bg-blue-500';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-32 object-cover"
          loading="lazy"
        />
        {progressPercentage === 100 && (
          <div className="absolute top-2 right-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          By {course.instructor}
        </p>

        {showProgress && (
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
              <span>Progress</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${progressColor} transition-all duration-300`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}

        <Link
          to={progressPercentage > 0 ? `/course/${course.id}/watch` : `/course/${course.id}`}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm font-medium text-center block transition-colors cursor-pointer"
        >
          {progressPercentage === 100 ? 'Review' : progressPercentage > 0 ? 'Continue' : 'Start'}
        </Link>
      </div>
    </div>
  );
};

export default CourseProgressCard;
