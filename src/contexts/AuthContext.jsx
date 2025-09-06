import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [courseProgress, setCourseProgress] = useState({});

  useEffect(() => {
    // Check if user is logged in on app start
    const authToken = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (authToken && userData) {
      const user = JSON.parse(userData);
      setUser(user);
      
      // Load user's purchased courses and progress
      const userPurchases = JSON.parse(localStorage.getItem(`purchases_${user.id}`) || '[]');
      const userProgress = JSON.parse(localStorage.getItem(`progress_${user.id}`) || '{}');
      setPurchasedCourses(userPurchases);
      setCourseProgress(userProgress);
    }
    setLoading(false);
  }, []);

  const signup = (email, password, name) => {
    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = existingUsers.find(u => u.email === email);
      
      if (userExists) {
        throw new Error('User already exists');
      }

      // Create new user
      const newUser = { id: Date.now(), email, password, name };
      const updatedUsers = [...existingUsers, newUser];
      
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      // Auto login after signup
      const userForState = { id: newUser.id, email, name };
      setUser(userForState);
      localStorage.setItem('authToken', 'mock-token-' + newUser.id);
      localStorage.setItem('userData', JSON.stringify(userForState));
      
      // Initialize empty purchases and progress for new user
      setPurchasedCourses([]);
      setCourseProgress({});
      localStorage.setItem(`purchases_${newUser.id}`, JSON.stringify([]));
      localStorage.setItem(`progress_${newUser.id}`, JSON.stringify({}));
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const login = (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error('Invalid credentials');
      }

      const userForState = { id: foundUser.id, email: foundUser.email, name: foundUser.name };
      setUser(userForState);
      localStorage.setItem('authToken', 'mock-token-' + foundUser.id);
      localStorage.setItem('userData', JSON.stringify(userForState));
      
      // Load user's purchases and progress
      const userPurchases = JSON.parse(localStorage.getItem(`purchases_${foundUser.id}`) || '[]');
      const userProgress = JSON.parse(localStorage.getItem(`progress_${foundUser.id}`) || '{}');
      setPurchasedCourses(userPurchases);
      setCourseProgress(userProgress);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setPurchasedCourses([]);
    setCourseProgress({});
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  };

  const purchaseCourse = (courseId) => {
    if (!user) return { success: false, error: 'Please login first' };
    
    const newPurchases = [...purchasedCourses, courseId];
    setPurchasedCourses(newPurchases);
    localStorage.setItem(`purchases_${user.id}`, JSON.stringify(newPurchases));
    
    return { success: true };
  };

  const hasPurchasedCourse = (courseId) => {
    return purchasedCourses.includes(courseId);
  };

  const updateCourseProgress = (courseId, videoIndex) => {
    if (!user) return;
    
    const newProgress = {
      ...courseProgress,
      [courseId]: {
        ...courseProgress[courseId],
        currentVideo: videoIndex,
        lastAccessed: new Date().toISOString()
      }
    };
    
    setCourseProgress(newProgress);
    localStorage.setItem(`progress_${user.id}`, JSON.stringify(newProgress));
  };

  const getCourseProgress = (courseId) => {
    return courseProgress[courseId] || { currentVideo: 0, lastAccessed: null };
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    isAuthenticated: !!user,
    purchasedCourses,
    purchaseCourse,
    hasPurchasedCourse,
    updateCourseProgress,
    getCourseProgress
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
