// src/components/Login.tsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword ,GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import './Login.css'

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const { user, loading } = useUser();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Fetch user data from Firestore
      const userDoc = doc(firestore, 'users', user.uid);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        setUserData(userSnapshot.data());
      } else {
        // Optional: Save new user data to Firestore if needed
        setError('No user data found.');
      }

      console.log('User logged in with Google successfully:', user);
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      // Fetch user data from Firestore
      const userDoc = doc(firestore, 'users', user.uid);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        setUserData(userSnapshot.data());
      } else {
        setError('No user data found.');
      }

      console.log('User logged in successfully:', user);
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Sign in</h2>
        {error && <p className="error-message">{error}</p>}
        <label>
          Email:
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label>
        <button type="submit">Sign in</button>
        <button type="button" className='google-signin' onClick={handleGoogleSignIn}>Sign in with Google</button>
        <button onClick={handleSignUp}>Sign up</button>
      </form>
      {userData && (
        <div className="user-info">
          <h3>User Information:</h3>
          <p className='redname'><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Role:</strong> {userData.role}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
