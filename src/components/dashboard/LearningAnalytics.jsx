import React from 'react';

const LearningAnalytics = ({ userStats, myPurchasedCourses }) => {
  // Generate weekly progress data (mock for demonstration)
  const weeklyData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      day: date.toLocaleDateString('en', { weekday: 'short' }),
      hours: Math.max(0, Math.random() * 3 + (i > 2 ? 1 : 0)), // More activity in recent days
      videos: Math.floor(Math.random() * 5 + (i > 2 ? 2 : 0))
    };
  });

  const maxHours = Math.max(...weeklyData.map(d => d.hours));
  const maxVideos = Math.max(...weeklyData.map(d => d.videos));

  // Course completion stats
  const totalCourses = myPurchasedCourses.length;
  const completedCourses = myPurchasedCourses.filter(c => c.progress === 100).length;
  const inProgressCourses = myPurchasedCourses.filter(c => c.progress > 0 && c.progress < 100).length;
  const notStartedCourses = totalCourses - completedCourses - inProgressCourses;

  const completionStats = [
    { label: 'Completed', value: completedCourses, color: 'bg-green-500', percentage: totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0 },
    { label: 'In Progress', value: inProgressCourses, color: 'bg-blue-500', percentage: totalCourses > 0 ? (inProgressCourses / totalCourses) * 100 : 0 },
    { label: 'Not Started', value: notStartedCourses, color: 'bg-gray-400', percentage: totalCourses > 0 ? (notStartedCourses / totalCourses) * 100 : 0 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Weekly Learning Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          📈 Weekly Activity
        </h3>
        
        <div className="space-y-4">
          {/* Hours Chart */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Study Hours</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {weeklyData.reduce((sum, d) => sum + d.hours, 0).toFixed(1)}h this week
              </span>
            </div>
            <div className="flex items-end space-x-2 h-24">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t relative overflow-hidden">
                    <div
                      className="bg-gradient-to-t from-blue-500 to-blue-400 transition-all duration-500 ease-out"
                      style={{ height: `${maxHours > 0 ? (day.hours / maxHours) * 80 : 0}px` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{day.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Videos Chart */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Videos Watched</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {weeklyData.reduce((sum, d) => sum + d.videos, 0)} videos
              </span>
            </div>
            <div className="flex items-end space-x-2 h-16">
              {weeklyData.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-t relative overflow-hidden">
                    <div
                      className="bg-gradient-to-t from-purple-500 to-purple-400 transition-all duration-500 ease-out"
                      style={{ height: `${maxVideos > 0 ? (day.videos / maxVideos) * 50 : 0}px` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Course Completion Analytics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🎯 Course Progress
        </h3>

        {totalCourses === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">📚</div>
            <p className="text-gray-500 dark:text-gray-400">No courses enrolled yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Donut Chart Representation */}
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                {/* Background circle */}
                <div className="w-32 h-32 rounded-full border-8 border-gray-200 dark:border-gray-700"></div>
                
                {/* Progress circle - simplified representation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {Math.round((completedCourses / totalCourses) * 100)}%
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Complete</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Breakdown */}
            <div className="space-y-3">
              {completionStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {stat.value}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                      ({Math.round(stat.percentage)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">
                    {userStats.totalHours}h
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Total Time</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {userStats.videosWatched}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Videos</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningAnalytics;
