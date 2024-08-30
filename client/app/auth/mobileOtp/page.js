'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import styles from './mobileOtp.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function Signup() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSendOtp = async () => {
   
    try {
          // Retrieve user data from local storage
      const userData = JSON.parse(localStorage.getItem('user'));
      const UID = userData ? userData.UID : null; // Extract UID from user data
      const token = localStorage.getItem('token'); // Assuming JWT token is stored here

      const response = await fetch('http://localhost:3001/api/send-mobile-otp', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ mobileNumber,UID }),
      });

      const data = await response.json();
      console.log('Server Response:', data);
      if (response.ok) {
        toast.success('OTP has been sent to your mobile number.');

      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('An error occurred', error);
      setError('An error occurred while sending OTP. Please try again.');
      toast.error('An error occurred while sending OTP. ');
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();

    try {
             // Retrieve user data from local storage
             const userData = JSON.parse(localStorage.getItem('user'));
             const UID = userData ? userData.UID : null; // Extract UID from user data
             const token = localStorage.getItem('token'); // Assuming JWT token is stored here
       
      // const response = await fetch('http://localhost:3001/api/verify-mobile-otp', {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/verify-mobile-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp ,UID}),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('OTP verified successfully. You are now signed up.');
        router.push('/');
      } else {
        setError(data.message || 'Failed to verify OTP');
      }
    } catch (error) {
      console.error('An error occurred', error);
      setError('An error occurred while verifying OTP. Please try again.');
      toast.error('An error occurred while verifying OTP.');
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

                  <h2 className="fw-bold mb-2 text-uppercase">Otp Verification</h2>
                  <p className="text-white-50 mb-5">Please enter your mobile number and OTP!</p>

                  {error && <p className="text-danger">{error}</p>}

                  <div data-mdb-input-init className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="typeMobileNumber"
                      name="mobileNumber"
                      className="form-control form-control-lg"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="Enter your mobile number..."
                    />
                    <button
                      className="btn btn-outline-light btn-sm mt-2"
                      onClick={handleSendOtp}
                    //   disabled={otpSent} // Disable the button after OTP is sent
                    >
                      Send OTP
                    </button>
                  </div>

                  <div data-mdb-input-init className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="typeOtp"
                      name="otp"
                      className="form-control form-control-lg"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP..."
                    //   disabled={!otpSent} // Disable the OTP input until OTP is sent
                    />
                    <button
                      className="btn btn-outline-light btn-lg mt-2"
                      onClick={handleVerifyOtp}
                    //   disabled={!otpSent} 
                    >
                      Verify OTP
                    </button>
                  </div>


                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
