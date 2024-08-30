'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import styles from './Login.module.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to handle errors
  const router = useRouter(); // Initialize router

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Reset error state

    try {
      // const response = await fetch('http://localhost:3001/api/login', {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
                // Store the token and user data in local storage
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.existingUser));
              
        // alert('Login successful!');
        toast.success('You have been logged in successfully.');

        router.push('/'); 
      } else {
        // Handle errors
        toast.error('Login failed!');
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('An error occurred', error);
      setError('An error occurred while logging in. Please try again.');
      // toast.error('An error occurred while logging in.');
    }
  };

  return (
    <section className={`${styles['vh-100']} ${styles['gradient-custom']}`}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">

                <div className="mb-md-5 mt-md-4 pb-5">

                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>

                  <div data-mdb-input-init className="form-outline form-white mb-4">
                    <input type="email" id="typeEmailX" 
                    className="form-control form-control-lg" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    />
                    <label className="form-label" htmlFor="typeEmailX">Email</label>
                  </div>



                  <div data-mdb-input-init className="form-outline form-white mb-4">
                    <input type="password" id="typePasswordX" 
                    className="form-control form-control-lg" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password..."

                    />
                    <label className="form-label" htmlFor="typePasswordX">Password</label>
                  </div>

                  <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                  <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-light btn-lg px-5" type="submit" onClick={handleSubmit}>Login</button>

                  {/* <div className="d-flex justify-content-center text-center mt-4 pt-1">
                    <a href="#!" className="text-white">
                      <FontAwesomeIcon icon={faFacebookF} size="lg" />
                    </a>
                    <a href="#!" className="text-white mx-4 px-2">
                      <FontAwesomeIcon icon={faTwitter} size="lg" />
                    </a>
                    <a href="#!" className="text-white">
                      <FontAwesomeIcon icon={faGoogle} size="lg" />
                    </a>
                  </div> */}
                   <div className="d-flex align-items-center my-4">
                      <hr className="flex-grow-1" />
                      <span className="mx-2">or</span>
                      <hr className="flex-grow-1" />
                    </div>

                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <button
                        onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`}
                        className="btn btn-outline-light btn-lg px-5 d-flex align-items-center"
                      >
                        <FontAwesomeIcon icon={faGoogle} size="lg" className="me-2" />
                        Google
                      </button>
                    </div>
                    
                </div>

                <div>
                  <p className="mb-0">Dont have an account? <Link href="/auth/signup" className="text-white-50 fw-bold">Sign Up</Link></p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

  

