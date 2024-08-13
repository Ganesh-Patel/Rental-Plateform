import React, { createContext, useContext, useEffect, useState } from 'react';
import auth from '../../../firebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        const storedUserName = localStorage.getItem('userName');
        setUserName(storedUserName);
      } else {
        setCurrentUser(null);
        setUserName(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function signup(email, password, userName) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem('userName', userName);
      setUserName(userName);
      toast.success('Signup successful!');
      navigate('/login');
    } catch (error) {
      toast.error(`Signup failed: ${error.message}`);
      throw error;
    }
  }

  async function login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
      throw error;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      localStorage.removeItem('userName'); // Clear userName from local storage
      setUserName(null);
      toast.success('Logout successful!');
      navigate('/login');
    } catch (error) {
      toast.error(`Logout failed: ${error.message}`);
      throw error;
    }
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    userName
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
