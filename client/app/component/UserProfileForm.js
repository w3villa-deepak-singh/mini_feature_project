'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import jsPDF from 'jspdf'; 
// import styles from '../styles/userForm.css';
import { toast } from 'react-toastify';
import '../styles/userForm.css'

export default function UserProfileForm() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(router.pathname);
  const [UID, setUID] = useState(null);

    // Determine if the fields should be read-only
    const isReadOnly = currentPath === '/user';


  // const localStorageuserData = JSON.parse(localStorage.getItem('user'));
  // const UID = localStorageuserData ? localStorageuserData.UID : null; 
  // console.log("update profile UID",UID);


  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    profession: '',
    subscription_type: '',
    address: '',
    city: '',
    country: ''
  });

  // Function to fetch user data from the API
  const fetchUserData = async () => {
    if (!UID) return;
    try {

      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-profile/${UID}`);
      const result = await response.json();


      console.log(result.data);
      // Check if the response has data and update state
      if (result.data) {
        setUserData({
          firstName: result.data.firstName || '',
          lastName: result.data.lastName || '',
          email: result.data.email || '',
          mobileNumber: result.data.mobileNumber || '',
          profession: result.data.profession || '',
          subscription_type: result.data.subscription_type || '',
          address: result.data.address || '',
          city: result.data.city || '',
          country: result.data.country || ''
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


    // Function to generate and download PDF
    const generatePDF = () => {
      const doc = new jsPDF();
      doc.setFontSize(12);
      doc.text(`First Name: ${userData.firstName}`, 10, 10);
      doc.text(`Last Name: ${userData.lastName}`, 10, 20);
      doc.text(`Email: ${userData.email}`, 10, 30);
      doc.text(`Mobile Number: ${userData.mobileNumber}`, 10, 40);
      doc.text(`Profession: ${userData.profession}`, 10, 50);
      doc.text(`Subscription Type: ${userData.subscription_type}`, 10, 60);
      doc.text(`Address: ${userData.address}`, 10, 70);
      doc.text(`City: ${userData.city}`, 10, 80);
      doc.text(`Country: ${userData.country}`, 10, 90);
  
      doc.save('user-profile.pdf');
    };


  // Function to handle form submission
  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!UID) return;
    console.log("updated data", userData)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update-profile/${UID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('User profile updated:', result);
        toast.success("profile updated successfully");
        // Optionally, you can display a success message to the user here
      } else {
        console.error('Failed to update user profile:', response.statusText);
        // Optionally, display an error message to the user
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };


  // Function to handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData({
      ...userData,
      [id]: value,
    });
  };
  console.log(userData)




  // for fetch UID from local UID
  useEffect(() => {
    const localStorageUserData = JSON.parse(localStorage.getItem('user'));
    const userUID = localStorageUserData ? localStorageUserData.UID : null;
    setUID(userUID); // Set UID state
  }, []); 
    console.log("update profile UID",UID);


  // Call fetchUserData inside useEffect when the component mounts
  useEffect(() => {
      if (UID) {
    fetchUserData();
  }
  }, [UID]);


  useEffect(() => {
    setCurrentPath(pathname);
    console.log('Current path:', pathname);
  }, [pathname]);



  return (
    <section className='userFormSection'>
    <form className="userForm card bg-dark text-white"  onSubmit={handleSubmit}>
      <div className="row ">

        <div className="row">
          <div className="col">
            <label htmlFor="firstName">First Name</label>
            <input type="text" className="form-control" value={userData.firstName} id="firstName" placeholder="First name"
             onChange={handleInputChange}
             readOnly={isReadOnly}
             />
          </div>
          <div className="col">
            <label htmlFor="lastName">LastName</label>
            <input type="text" className="form-control" id="lastName" value={userData.lastName} placeholder="Last name" 
            onChange={handleInputChange} 
            readOnly={isReadOnly}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label htmlFor="inputEmail4">Email</label>
            <input type="email" className="form-control" value={userData.email} id="inputEmail4" placeholder="Email" readOnly />
          </div>
          <div className="col">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input type="number" className="form-control" value={userData.mobileNumber} id="mobileNumber" placeholder="Mobile number" 
            onChange={handleInputChange} 
            readOnly={isReadOnly}
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label htmlFor="profession">Profession</label>
            <input type="text" className="form-control" value={userData.profession} id="profession" placeholder="Profession"
             onChange={handleInputChange} 
             readOnly={isReadOnly}
             />
          </div>
          <div className="col">
            <label htmlFor="subscriptionType">Subscription Type</label>
            <input type="text" className="form-control" value={userData.subscription_type} id="subscriptionType" placeholder="subscription Type" readOnly />
          </div>
        </div>



        <div className="row">
          <label htmlFor="address">Address</label>
          <input type="text" className="form-control" value={userData.address} id="address" placeholder="1234 Main St" 
          onChange={handleInputChange}
          readOnly={isReadOnly}
           />
        </div>


        <div className="row">
          <div className="col">
            <label htmlFor="city">City</label>
            <input type="text" className="form-control" value={userData.city} id="city" 
            onChange={handleInputChange} 
            readOnly={isReadOnly}
            />
          </div>

          <div className="col">
            <label htmlFor="zip">Zip</label>
            <input type="number" className="form-control" id="zip" 
            onChange={handleInputChange} 
            readOnly={isReadOnly}
            />
          </div>
        </div>


        <div className="row">
          <div className="col">
            <label htmlFor="state">State</label>
            <input type="text" className="form-control" id="state" onChange={handleInputChange}  readOnly={isReadOnly}/>
            {/* <select id="inputState" className="form-control" onChange={handleInputChange}>
              <option selected>Choose...</option>
              <option>...</option>
            </select> */}
          </div>

          <div className="col">
            <label htmlFor="country">Country</label>
            <input type="text" className="form-control" value={userData.country} id="country" 
            onChange={handleInputChange} 
            readOnly={isReadOnly}
            />
            {/* <select id="inputCountry" className="form-control" value={userData.country} onChange={handleInputChange}>
              <option selected>Choose...</option>
              <option>...</option>
            </select> */}
          </div>

        </div>

      </div>



      {currentPath === '/user/update-profile' && (
         <div className='d-flex justify-content-between mt-3'>
         <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      )}

      {currentPath === '/user' && (
          <div className='d-flex justify-content-between mt-3'>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => router.push('/user/update-profile')}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={generatePDF}
          >
            Download PDF
          </button>
        </div>
        
      )}


    </form>
    </section>
  );
}



// <button type="submit" className="btn btn-primary"> Submit</button>
// <button  className="btn btn-primary"
//   onClick={() => router.push('/user/update-profile')}
// > Update</button>
