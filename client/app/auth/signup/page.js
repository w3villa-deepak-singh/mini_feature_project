'use client'
require('dotenv').config();

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';

import styles from './Signup.module.css';
import 'react-toastify/dist/ReactToastify.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

console.log("Backend URL:>>>>>>>>>>>>>", process.env.NEXT_PUBLIC_BACKEND_URL);




export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    // Validation checks
    if (!email.includes('@') || !email.includes('.com')) {
      setError('Email or Password is invalid');
      return;
    }
    if (password.length < 5) {
      setError('Email or Password is invalid');
      return;
    }



    try {
      // const response = await fetch('http://localhost:3001/api/signup', {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/signup`, {

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
        localStorage.setItem('user', JSON.stringify(result.data.newUser));
        // alert('An email has been sent to your email address. Please verify your account.');
        toast.success('An email has been sent to your email address. Please verify your account.');
        router.push('/auth/mobileOtp');
      } else {
        console.error('Signup failed', data);
        toast.error('signup failed');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };


  return (
    <>

      <section className={`${styles['vh-100']} ${styles['gradient-custom']}`}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                <div className="card-body p-5 text-center">

                  <div className="mb-md-5 mt-md-4 pb-5">

                    <h2 className="fw-bold mb-2 text-uppercase">Signup</h2>
                    <p className="text-white-50 mb-5">Please enter your email and password!</p>

                    {error && <p className="text-danger">{error}</p>}

                    <div data-mdb-input-init className="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="typeEmailX"
                        name="email"
                        className="form-control form-control-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email......"
                      />
                      <label className="form-label" htmlFor="typeEmailX" style={{ marginTop: '10px' }}>Email</label>
                    </div>

                    <div data-mdb-input-init className="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="typePasswordX"
                        name="password"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password......"
                      />
                      <label className="form-label" htmlFor="typePasswordX" style={{ marginTop: '10px' }}>Password</label>
                    </div>



                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-light btn-lg px-5" type="submit" onClick={handleSubmit}>Signup</button>


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
                    <p className="mb-0">Already a user? <Link href="/auth/login" className="text-white-50 fw-bold"> Login</Link></p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}













// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import styles from './Signup.module.css';

// export default function Signup() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError(''); 

//     try {
//       const response = await fetch('http://localhost:3000/api/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Signup successful:', data);
//         router.push('/');
//       } else {
//         const errorData = await response.json();
//         console.error('Signup failed:', errorData);
//         setError('Signup failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setError('An error occurred. Please try again later.');
//     }
//   };

//   return (
//     <main className={styles.main}>
//       <div className={styles.container}>
//         <h1 className={styles.heading}>Please signup</h1>
//         <form className={styles.form} onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
//             <input
//               type="email"
//               className="form-control"
//               id="exampleInputEmail1"
//               aria-describedby="emailHelp"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="exampleInputPassword1"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <button type="submit" className="btn btn-primary">Submit</button>
//           {error && <p className={styles.error}>{error}</p>}
//           <div className={styles.loginLink}>
//             <span>Already a user? </span>
//             <a href="/auth/login">Login</a>
//           </div>
//         </form>
//       </div>
//     </main>
//   );
// }
