import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockQuiz } from '../data/mockQuiz';

const Quiz = () => {
  const { isAuthenticated } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [quizStarted, setQuizStarted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let timer;
    if (quizStarted && timeRemaining > 0 && !showResults) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, timeRemaining, showResults]);

  const currentQuestion = mockQuiz.questions[currentQuestionIndex];
  const totalQuestions = mockQuiz.questions.length;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
    
    // Clear any error for this question
    setErrors(prev => ({
      ...prev,
      [questionId]: false
    }));
  };

  const handleNext = () => {
    // Validate current question
    if (answers[currentQuestion.id] === undefined) {
      setErrors(prev => ({
        ...prev,
        [currentQuestion.id]: true
      }));
      return;
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Validate all questions
    const newErrors = {};
    let hasErrors = false;

    mockQuiz.questions.forEach(question => {
      if (answers[question.id] === undefined) {
        newErrors[question.id] = true;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (hasErrors) {
      // Find first unanswered question and navigate to it
      const firstErrorIndex = mockQuiz.questions.findIndex(q => newErrors[q.id]);
      setCurrentQuestionIndex(firstErrorIndex);
      return;
    }

    setShowResults(true);
  };

  const calculateResults = () => {
    let correctCount = 0;
    const results = mockQuiz.questions.map(question => {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correct;
      if (isCorrect) correctCount++;
      
      return {
        questionId: question.id,
        question: question.question,
        userAnswer: userAnswer,
        correctAnswer: question.correct,
        isCorrect,
        options: question.options
      };
    });

    const percentage = Math.round((correctCount / totalQuestions) * 100);
    return { results, correctCount, percentage };
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeRemaining(300);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setTimeRemaining(300);
    setQuizStarted(false);
    setErrors({});
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Sign in to take quizzes
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please sign in to access interactive quizzes and track your progress.
          </p>
          <a
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div
              className="px-8 py-12 text-center text-white"
              style={{
                background: 'linear-gradient(to right bottom, oklch(0.511 0.262 276.966) 0%, oklch(0.558 0.288 302.321) 50%, oklch(0.488 0.243 264.376) 100%)'
              }}
            >
              <h1 className="text-3xl font-bold mb-4">{mockQuiz.title}</h1>
              <p className="text-blue-100 text-lg mb-8">{mockQuiz.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold mb-1">{totalQuestions}</div>
                  <div className="text-blue-100">Questions</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold mb-1">5</div>
                  <div className="text-blue-100">Minutes</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-2xl font-bold mb-1">70%</div>
                  <div className="text-blue-100">Pass Score</div>
                </div>
              </div>

              <button
                onClick={startQuiz}
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors cursor-pointer"
              >
                Start Quiz
              </button>
            </div>

            <div className="p-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Instructions:
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Answer all questions before submitting</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>You have 5 minutes to complete the quiz</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>You can navigate between questions using the Previous/Next buttons</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Need 70% or higher to pass</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const { results, correctCount, percentage } = calculateResults();
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Results Header */}
            <div className={`px-8 py-12 text-center text-white ${
              passed ? 'bg-gradient-to-r from-green-600 to-green-700' : 'bg-gradient-to-r from-red-600 to-red-700'
            }`}>
              <div className="mb-6">
                {passed ? (
                  <svg className="w-16 h-16 mx-auto text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-16 h-16 mx-auto text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              
              <h1 className="text-3xl font-bold mb-4">
                {passed ? 'Congratulations!' : 'Keep Learning!'}
              </h1>
              
              <p className="text-lg mb-8 opacity-90">
                {passed 
                  ? 'You passed the quiz successfully!' 
                  : 'You need 70% to pass. Review the material and try again!'
                }
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">{percentage}%</div>
                  <div className="opacity-90">Your Score</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">{correctCount}/{totalQuestions}</div>
                  <div className="opacity-90">Correct Answers</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold mb-1">{formatTime(300 - timeRemaining)}</div>
                  <div className="opacity-90">Time Taken</div>
                </div>
              </div>
            </div>

            {/* Answer Review */}
            <div className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Answer Review
              </h3>
              
              <div className="space-y-6">
                {results.map((result, index) => (
                  <div 
                    key={result.questionId}
                    className={`border rounded-lg p-6 ${
                      result.isCorrect 
                        ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20' 
                        : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
                    }`}
                  >
                    <div className="flex items-start space-x-3 mb-4">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                        result.isCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {result.isCorrect ? (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                          Question {index + 1}: {result.question}
                        </h4>
                        
                        <div className="space-y-2">
                          {result.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-lg border ${
                                optionIndex === result.correctAnswer
                                  ? 'border-green-300 dark:border-green-600 bg-green-100 dark:bg-green-900/30'
                                  : optionIndex === result.userAnswer && !result.isCorrect
                                  ? 'border-red-300 dark:border-red-600 bg-red-100 dark:bg-red-900/30'
                                  : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-gray-900 dark:text-white">{option}</span>
                                <div className="flex items-center space-x-2">
                                  {optionIndex === result.correctAnswer && (
                                    <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-200 dark:bg-green-800 px-2 py-1 rounded">
                                      Correct
                                    </span>
                                  )}
                                  {optionIndex === result.userAnswer && (
                                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                                      result.isCorrect 
                                        ? 'text-green-600 dark:text-green-400 bg-green-200 dark:bg-green-800' 
                                        : 'text-red-600 dark:text-red-400 bg-red-200 dark:bg-red-800'
                                    }`}>
                                      Your Answer
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={resetQuiz}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quiz Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6 p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {mockQuiz.title}
            </h1>
            <div className={`px-4 py-2 rounded-lg font-semibold ${
              timeRemaining <= 60 
                ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
            }`}>
              Time: {formatTime(timeRemaining)}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
              <span>{Object.keys(answers).length} answered</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Navigation */}
          <div className="flex flex-wrap gap-2">
            {mockQuiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  index === currentQuestionIndex
                    ? 'bg-blue-600 text-white'
                    : answers[mockQuiz.questions[index].id] !== undefined
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                    : errors[mockQuiz.questions[index].id]
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Question */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {currentQuestion.question}
          </h2>

          {/* Answer Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${
                  answers[currentQuestion.id] === index
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                } ${
                  errors[currentQuestion.id]
                    ? 'border-red-300 dark:border-red-600'
                    : ''
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={index}
                  checked={answers[currentQuestion.id] === index}
                  onChange={() => handleAnswerSelect(currentQuestion.id, index)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                  answers[currentQuestion.id] === index
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {answers[currentQuestion.id] === index && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-gray-900 dark:text-white font-medium">{option}</span>
              </label>
            ))}
          </div>

          {/* Error Message */}
          {errors[currentQuestion.id] && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-medium text-red-800 dark:text-red-400">
                  Please select an answer before proceeding.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex items-center px-6 py-3 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            {currentQuestionIndex === totalQuestions - 1 ? (
              <button
                onClick={handleSubmit}
                className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors cursor-pointer"
              >
                Submit Quiz
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors cursor-pointer"
              >
                Next
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
