import React, { useState } from 'react';

const LearningGoals = ({ userStats }) => {
  const [weeklyGoal, setWeeklyGoal] = useState(10); // hours per week
  const [dailyGoal, setDailyGoal] = useState(1); // hours per day
  
  // Calculate progress towards goals
  const currentWeekHours = userStats.totalHours; // This would be current week in real app
  const weeklyProgress = Math.min((currentWeekHours / weeklyGoal) * 100, 100);
  
  const todayHours = 0.5; // Mock data for today
  const dailyProgress = Math.min((todayHours / dailyGoal) * 100, 100);

  const motivationalQuotes = [
    "Learning never exhausts the mind. - Leonardo da Vinci",
    "The capacity to learn is a gift; the ability to learn is a skill. - Brian Herbert",
    "Education is the most powerful weapon which you can use to change the world. - Nelson Mandela",
    "Live as if you were to die tomorrow. Learn as if you were to live forever. - Mahatma Gandhi"
  ];

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <div className="space-y-6">
      {/* Learning Goals */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-indigo-200 dark:border-indigo-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🎯 Learning Goals
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Daily Goal */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Daily Goal</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{todayHours}h / {dailyGoal}h</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
              <div
                className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${dailyProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{Math.round(dailyProgress)}% complete</span>
              <span>{Math.max(0, dailyGoal - todayHours).toFixed(1)}h remaining</span>
            </div>
          </div>

          {/* Weekly Goal */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Weekly Goal</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{currentWeekHours}h / {weeklyGoal}h</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${weeklyProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{Math.round(weeklyProgress)}% complete</span>
              <span>{Math.max(0, weeklyGoal - currentWeekHours).toFixed(1)}h remaining</span>
            </div>
          </div>
        </div>

        {/* Goal Status Messages */}
        <div className="mt-4 p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          {weeklyProgress >= 100 ? (
            <div className="flex items-center text-green-600 dark:text-green-400">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm font-medium">🎉 Weekly goal achieved! Keep up the momentum!</span>
            </div>
          ) : weeklyProgress >= 75 ? (
            <div className="flex items-center text-blue-600 dark:text-blue-400">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm font-medium">🔥 You're almost there! Just a little more to reach your goal.</span>
            </div>
          ) : (
            <div className="flex items-center text-orange-600 dark:text-orange-400">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm font-medium">💪 Keep going! Every minute of learning counts.</span>
            </div>
          )}
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          💫 Daily Inspiration
        </h3>
        
        <blockquote className="text-center">
          <p className="text-gray-700 dark:text-gray-300 italic text-lg leading-relaxed mb-4">
            "{randomQuote.split(' - ')[0]}"
          </p>
          <footer className="text-sm text-gray-500 dark:text-gray-400">
            — {randomQuote.split(' - ')[1]}
          </footer>
        </blockquote>
      </div>

      {/* Study Streak Motivation */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              🔥 Study Streak
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              You've been learning for {userStats.currentStreak} consecutive days!
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {userStats.currentStreak}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">days</div>
          </div>
        </div>
        
        <div className="mt-4 flex space-x-1">
          {Array.from({ length: Math.min(14, userStats.currentStreak + 1) }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-6 rounded-full ${
                i < userStats.currentStreak
                  ? 'bg-orange-500'
                  : 'bg-gray-200 dark:bg-gray-600'
              }`}
            />
          ))}
          {userStats.currentStreak > 14 && (
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
              +{userStats.currentStreak - 14}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningGoals;
