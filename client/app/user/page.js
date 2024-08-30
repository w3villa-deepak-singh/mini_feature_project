'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import UserProfileForm from '../component/UserProfileForm';
import Header from '../component/Navbar';
export default function User() {

  

  return (
    <>
     <Header />
    <UserProfileForm />
    </>
  );
}
