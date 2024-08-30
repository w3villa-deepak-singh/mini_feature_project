
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
// import styles from "./page.module.css";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

// console.log("dfnfnf",NEXT_PUBLIC_STRIPE_PUBLIC_KEY);


const PricingCard = ({ title, price, onBuy }) => (
  <div className="card m-2" style={{width: '18rem'}}>
    <div className="card-body">
      <h5 className="card-title text-center">{title}</h5>
      <p className="card-text text-center display-4">rupee{price}</p>
      <button className="btn btn-primary w-100" onClick={() => onBuy(title, price)}>
        Buy
      </button>
    </div>
  </div>
);


export default function Plans() {
  const router = useRouter();

  const handleBuy = async (title, price) => {
    console.log(`Bought ${title} plan for $${price}`);
    try {
      // const userData = JSON.parse(localStorage.getItem('user'));
      // const UID = userData ? userData.UID : null; // Extract UID from user data
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');
        
    const stripe = await stripePromise;
    if (!stripe) {
        console.error("Stripe has not been initialized");
        return;
    }


       

          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            },
            body: JSON.stringify({ title, price }),
          });
    

  //   const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment`, {
      
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({title,price,UID}),
  
  // });
  const session = await response.json();
  if (session.error) {
      console.error("Error creating checkout session:", session.error);
      return;
  }
  const result = await stripe.redirectToCheckout({
      sessionId: session.id
  });
  if (result.error) {
      console.error("Payment error:", result.error.message);
  }
} catch (error) {
  console.error("Payment processing error:", error.message);
}
  };


  return (
    <main >
        
        <div className="flex justify-center space-x-4">
          <PricingCard title="Silver" price={200} onBuy={handleBuy} />
          <PricingCard title="Gold" price={400} onBuy={handleBuy} />
       </div>
    </main>
  );
}
