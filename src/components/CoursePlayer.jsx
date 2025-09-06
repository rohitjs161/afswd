import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockCourses } from '../data/mockCourses';

const CoursePlayer = () => {
  const { courseId } = useParams();
  const { isAuthenticated, hasPurchasedCourse, getCourseProgress, updateCourseProgress } = useAuth();
  const [course, setCourse] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const foundCourse = mockCourses.find(c => c.id === courseId);
    setCourse(foundCourse);

    if (foundCourse && isAuthenticated) {
      // Load user's progress for this course
      const progress = getCourseProgress(courseId);
      setCurrentVideo(progress.currentVideo || 0);
    }
  }, [courseId, isAuthenticated, getCourseProgress]);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Course Not Found</h2>
          <Link to="/courses" className="text-blue-600 hover:underline cursor-pointer">
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  // Check if user has access to this course
  const hasAccess = course.isFree || hasPurchasedCourse(courseId);
  
  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Course Access Required</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need to purchase this course to access the content.
          </p>
          <Link 
            to={`/course/${courseId}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
          >
            View Course Details
          </Link>
        </div>
      </div>
    );
  }

  const videos = course.media.filter(item => item.type === 'video');
  const currentVideoData = videos[currentVideo];

  const handleVideoChange = (newIndex) => {
    setCurrentVideo(newIndex);
    updateCourseProgress(courseId, newIndex);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Simple Header */}
      <div className="bg-white dark:bg-gray-800 border-b p-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to={`/course/${course.id}`} className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              ← Course Details
            </Link>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{course.title}</h1>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {currentVideo + 1} of {videos.length}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
              <video
                className="w-full aspect-video bg-black"
                controls
                key={currentVideoData.src}
              >
                <source src={currentVideoData.src} type="video/mp4" />
              </video>
              
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  {currentVideoData.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {currentVideoData.description}
                </p>
                
                {/* Simple Navigation */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleVideoChange(Math.max(0, currentVideo - 1))}
                    disabled={currentVideo === 0}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded text-sm disabled:opacity-50 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                  >
                    ← Previous
                  </button>
                  
                  <button
                    onClick={() => handleVideoChange(Math.min(videos.length - 1, currentVideo + 1))}
                    disabled={currentVideo === videos.length - 1}
                    className="px-4 py-2 bg-blue-600 text-white rounded text-sm disabled:opacity-50 hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Simple Playlist */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Videos</h3>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {videos.map((video, index) => (
                  <div
                    key={index}
                    onClick={() => handleVideoChange(index)}
                    className={`p-3 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      index === currentVideo ? 'bg-blue-50 dark:bg-blue-900/20 border-l-2 border-l-blue-600' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        index === currentVideo ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}>
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate text-gray-900 dark:text-white">
                          {video.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {Math.floor(video.durationSec / 60)}:{(video.durationSec % 60).toString().padStart(2, '0')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
