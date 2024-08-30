
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import '../styles/homePage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




export default function HomePage() {
  const router = useRouter();



  return (
    <section className='mainHomePage'>
    <h1>
      Hello welcome!
    </h1>
    <FontAwesomeIcon icon="fa-solid fa-user" />
    </section>
  );
}
