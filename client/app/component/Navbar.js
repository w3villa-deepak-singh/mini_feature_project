'use client';

import React, { useState , useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';


import '../styles/navbar.css'

export default function Header() {
    const router = useRouter();
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
   

    // Function to toggle the dropdown visibility
    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };
       // Function to handle mouse enter event
    const handleMouseEnter = () => {
        setDropdownVisible(true);
    };

    // Function to handle mouse leave event
    const handleMouseLeave = () => {
        setDropdownVisible(false);
    };

    // Function to handle clicks outside of the dropdown
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        // Add event listener for clicks outside the dropdown
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Clean up event listener on component unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    const handleLogout = async () => {
        try {
          // const response = await fetch('http://localhost:3001/api/logout', {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/logout`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          const data = await response.json();
          if (response.ok) {
            // Clear token and user data from local storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            // alert('You have been logged out successfully.');
            toast.success('You have been logged out successfully.');
            router.push('/auth/login'); 
          } else {
            alert(data.message || 'Failed to log out');
          }
        } catch (error) {
          console.error('An error occurred', error);
          toast.error('An error occurred while logging out. Please try again.');
        }
      };

    return (
     <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">

              

                <Link href="/" className="navbar-brand  text-white">
                    Logo
                </Link>


                <div className=" justify-content-center d-flex">
                    <ul className="navbar-nav d-flex flex-row">
                        <li className="nav-item mx-4">
                            <Link href="/" className="nav-link  text-white">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item mx-4">
                            <Link href="/auth/plans" className="nav-link  text-white">
                                Plans
                            </Link>
                        </li>
                        <li className="nav-item mx-4">
                            <Link href="/user" className="nav-link  text-white">
                                Profile
                            </Link>
                        </li>
                    </ul>
                </div>
                 

                <div className=" justify-content-center d-flex">
                    <ul className="navbar-nav d-flex flex-row">
                  
                        <li className="nav-item mx-4">
                            <Link href="/auth/login" className="nav-link  text-white">
                                Login
                            </Link>
                        </li>
                   
                        <li className="nav-item mx-4">
                            <Link href="/auth/signup" className="nav-link  text-white">
                                Signup
                            </Link>
                        </li>

                      
                    </ul>
                </div>

                {/* Right side: User Icon with Dropdown */}
                <div className="d-flex align-items-center position-relative border rounded bg-light user-container"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                    <div className="nav-link  text-black" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
                        User
                    </div>

                    {/* Dropdown menu */}
                    {dropdownVisible && (
                        <div className="user-dropdown position-absolute bg-white border rounded p-2" 
                        ref={dropdownRef}
                        >
                            <Link href="/user" className="dropdown-item ">
                                My Profile
                            </Link>
                            <div className="dropdown-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                Logout
                            </div>
                        </div>
                    )}
                </div>


            </div>
        </nav>
     </>
    );
}


{/* <FontAwesomeIcon icon="fa-solid fa-user" /> */ }