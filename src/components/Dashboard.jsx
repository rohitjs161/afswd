import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockCourses } from '../data/mockCourses';
import StatsCard from './dashboard/StatsCard';
import CourseProgressCard from './dashboard/CourseProgressCard';
import LearningAnalytics from './dashboard/LearningAnalytics';
import PerformanceInsights from './dashboard/PerformanceInsights';
import LearningGoals from './dashboard/LearningGoals';
import RecentActivity from './dashboard/RecentActivity';
import AchievementSystem from './dashboard/AchievementSystem';

const Dashboard = () => {
  const { user, purchasedCourses, getCourseProgress } = useAuth();

  // Get purchased courses with real progress
  const myPurchasedCourses = mockCourses.filter(course => 
    course.isFree || purchasedCourses.includes(course.id)
  ).map(course => {
    const progress = getCourseProgress(course.id);
    const totalVideos = course.media.filter(m => m.type === 'video').length;
    const completedVideos = progress.currentVideo || 0;
    const progressPercentage = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;
    
    return {
      ...course,
      progress: progressPercentage,
      currentVideo: completedVideos,
      totalVideos
    };
  });

  // Calculate user stats
  const completedCourses = myPurchasedCourses.filter(course => course.progress === 100);
  const coursesInProgress = myPurchasedCourses.filter(course => course.progress > 0 && course.progress < 100);
  const totalVideosWatched = myPurchasedCourses.reduce((total, course) => total + (course.currentVideo || 0), 0);
  const totalHours = myPurchasedCourses.reduce((total, course) => {
    const videos = course.media.filter(m => m.type === 'video');
    const watchedVideos = videos.slice(0, course.currentVideo || 0);
    return total + watchedVideos.reduce((sum, video) => sum + (video.durationSec / 3600), 0);
  }, 0);

  const userStats = {
    completedCourses: completedCourses.length,
    coursesInProgress: coursesInProgress.length,
    purchasedCourses: purchasedCourses.length,
    videosWatched: totalVideosWatched,
    totalHours: Math.round(totalHours * 10) / 10,
    currentStreak: 3 // Mock for now
  };

  // Generate recent activity based on progress
  const recentActivity = myPurchasedCourses
    .filter(course => course.currentVideo > 0)
    .slice(0, 5)
    .map(course => ({
      type: course.progress === 100 ? 'course_completed' : 'video_watched',
      description: course.progress === 100 
        ? `Completed "${course.title}"` 
        : `Watched video in "${course.title}"`,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Here's your learning progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Courses in Progress"
            value={userStats.coursesInProgress}
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            }
            color="blue"
          />
          <StatsCard
            title="Completed Courses"
            value={userStats.completedCourses}
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            }
            color="green"
          />
          <StatsCard
            title="Hours Learned"
            value={`${userStats.totalHours}h`}
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
            }
            color="purple"
          />
          <StatsCard
            title="Current Streak"
            value={`${userStats.currentStreak} days`}
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
              </svg>
            }
            color="orange"
          />
        </div>

        {/* Learning Analytics */}
        <div className="mb-8">
          <LearningAnalytics userStats={userStats} myPurchasedCourses={myPurchasedCourses} />
        </div>

        {/* Performance Insights & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <PerformanceInsights userStats={userStats} myPurchasedCourses={myPurchasedCourses} />
          </div>
          <div>
            <RecentActivity activities={recentActivity} />
          </div>
        </div>

        {/* Learning Goals & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <LearningGoals userStats={userStats} />
          <div>
            <AchievementSystem userStats={userStats} />
          </div>
        </div>

        {/* My Courses */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">My Courses</h2>
            <Link
              to="/courses"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium cursor-pointer"
            >
              Browse All Courses →
            </Link>
          </div>

          {myPurchasedCourses.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center border border-gray-200 dark:border-gray-700">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No courses yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Start your learning journey by enrolling in a course</p>
              <Link
                to="/courses"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors cursor-pointer"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {myPurchasedCourses.map((course) => (
                <CourseProgressCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
