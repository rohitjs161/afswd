import React from 'react';

const PerformanceInsights = ({ userStats, myPurchasedCourses }) => {
  // Calculate insights
  const avgProgress = myPurchasedCourses.length > 0 
    ? myPurchasedCourses.reduce((sum, course) => sum + course.progress, 0) / myPurchasedCourses.length 
    : 0;

  const avgTimePerCourse = userStats.totalHours > 0 && myPurchasedCourses.length > 0
    ? userStats.totalHours / myPurchasedCourses.length
    : 0;

  // Learning velocity (videos per hour)
  const learningVelocity = userStats.totalHours > 0 
    ? userStats.videosWatched / userStats.totalHours 
    : 0;

  // Generate trend data (mock)
  const trendData = [
    { metric: 'Study Time', value: userStats.totalHours, trend: 12, isPositive: true },
    { metric: 'Course Completion', value: `${Math.round(avgProgress)}%`, trend: 8, isPositive: true },
    { metric: 'Learning Velocity', value: `${learningVelocity.toFixed(1)}/h`, trend: -3, isPositive: false },
    { metric: 'Weekly Streak', value: `${userStats.currentStreak} days`, trend: 15, isPositive: true }
  ];

  const insights = [
    {
      icon: '🚀',
      title: 'Great Progress!',
      description: `You've completed ${avgProgress.toFixed(1)}% of your enrolled courses on average.`,
      type: 'success'
    },
    {
      icon: '⏰',
      title: 'Study Schedule',
      description: `You spend about ${avgTimePerCourse.toFixed(1)} hours per course. Consider setting daily goals.`,
      type: 'info'
    },
    {
      icon: '🎯',
      title: 'Learning Focus',
      description: `You watch ${learningVelocity.toFixed(1)} videos per hour. Quality over quantity!`,
      type: 'tip'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          📊 Performance Trends
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trendData.map((item, index) => (
            <div key={index} className="text-center">
              <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {item.value}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {item.metric}
              </div>
              <div className={`flex items-center justify-center text-xs ${
                item.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'
              }`}>
                <svg className={`w-3 h-3 mr-1 ${item.isPositive ? '' : 'rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
                {Math.abs(item.trend)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          💡 Learning Insights
        </h3>
        
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className={`p-4 rounded-lg border-l-4 ${
              insight.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-green-400' :
              insight.type === 'info' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-400' :
              'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400'
            }`}>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{insight.icon}</span>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    {insight.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🎯 Recommended Actions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Complete a Course</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Finish your current course to unlock achievements</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Maintain Streak</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Study daily to build your learning habit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceInsights;
