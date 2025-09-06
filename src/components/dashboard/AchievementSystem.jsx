import React from 'react';

const AchievementBadge = ({ achievement, unlocked = false }) => {
  return (
    <div className={`relative p-4 rounded-lg border transition-all ${
      unlocked 
        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-700' 
        : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-60'
    }`}>
      {unlocked && (
        <div className="absolute -top-1 -right-1">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
          </div>
        </div>
      )}
      
      <div className="text-center">
        <div className={`text-2xl mb-2 ${unlocked ? '' : 'grayscale'}`}>
          {achievement.icon}
        </div>
        <h4 className={`font-semibold text-sm mb-1 ${
          unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
        }`}>
          {achievement.title}
        </h4>
        <p className={`text-xs ${
          unlocked ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'
        }`}>
          {achievement.description}
        </p>
      </div>
    </div>
  );
};

const AchievementSystem = ({ userStats }) => {
  const achievements = [
    {
      id: 'first_course',
      title: 'Getting Started',
      description: 'Complete your first course',
      icon: '🎯',
      condition: (stats) => stats.completedCourses >= 1
    },
    {
      id: 'streak_7',
      title: '7 Day Streak',
      description: 'Learn for 7 days straight',
      icon: '🔥',
      condition: (stats) => stats.currentStreak >= 7
    },
    {
      id: 'course_collector',
      title: 'Course Collector',
      description: 'Purchase 3 courses',
      icon: '📚',
      condition: (stats) => stats.purchasedCourses >= 3
    },
    {
      id: 'video_marathon',
      title: 'Video Marathon',
      description: 'Watch 50 videos',
      icon: '🎬',
      condition: (stats) => stats.videosWatched >= 50
    },
    {
      id: 'dedicated_learner',
      title: 'Dedicated Learner',
      description: 'Study for 10+ hours',
      icon: '⭐',
      condition: (stats) => stats.totalHours >= 10
    },
    {
      id: 'course_master',
      title: 'Course Master',
      description: 'Complete 5 courses',
      icon: '👑',
      condition: (stats) => stats.completedCourses >= 5
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Achievements</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {achievements.map((achievement) => (
          <AchievementBadge
            key={achievement.id}
            achievement={achievement}
            unlocked={achievement.condition(userStats)}
          />
        ))}
      </div>
    </div>
  );
};

export default AchievementSystem;
