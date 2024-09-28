// src/components/SignUp.tsx
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword,   signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore, GoogleAuthProvider } from '../../firebaseConfig';
import './SignUp.css'
import { useNavigate } from 'react-router-dom';


interface SignUpForm {
  name: string;
  email: string;
  password: string;
  role: string;
}

const SignUp: React.FC = () => {
  const [form, setForm] = useState<SignUpForm>({ name: '', email: '', password: '', role: '' });
  const [error, setError] = useState<string | null>(null);
  const [googleUser, setGoogleUser] = useState<any>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save the Google user in state to prompt for role
      setGoogleUser(user);
      setForm({ ...form, name: user.displayName || '', email: user.email || '', password: '' });
    } catch (err: any) {
      setError(err.message);
    }
  };

 

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = googleUser
        ? { user: googleUser } // Use the Google user if they signed up with Google
        : await createUserWithEmailAndPassword(auth, form.email, form.password);

      const user = userCredential.user;

      // Store user data in Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        name: form.name,
        email: form.email,
        role: form.role,
        createdAt: new Date(),
        num_properties: 0,
      });

      console.log('User created successfully:', user);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignin = () => {
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <p>Sign Up</p>
        {error && <p className="error-message">{error}</p>}
        <label>
          Name:
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        { !googleUser && (
          <label>
            Password:
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </label>
        )}
        <label>
          Role:
          <select name="role" value={form.role} onChange={handleChange} required>
            <option value="" disabled>Select role</option>
            <option value="lister">Property Lister</option>
            <option value="agent">Agent</option>
            <option value="buyer">Buyer</option>
            <option value="renter">Renter</option>
          </select>
        </label>
        <button type="submit">Sign Up</button>
        <button type="button" onClick={handleGoogleSignUp}>Sign Up with Google</button>
        <p>Already have an account? </p>
        <button type="button" onClick={handleSignin}>Sign in</button>
      </form>
    </div>
  );
};

export default SignUp;
