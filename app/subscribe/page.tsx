"use client";

import { isValidEmail } from "../lib/utils";
import { useState } from "react";
import Image from "next/image";
import { useAppContext } from "../context";
import Button from "../components/Button";

export default function Home() {
  const { supabase } = useAppContext();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<any>(undefined);

  const subscribeToNewsletter = async () => {
    if (!isValidEmail(email)) {
      return alert(`Please enter a valid email address.`);
    }
  
    setLoading(true);
    let alertMessage = "";
  
    try {
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email, owner_id: '9ac39046-cfce-4cb5-a884-d7dcbd243f52' }]);
  
      if (error) {
        console.error("Error inserting data:", error.message);
        setSuccess(false);
        alertMessage = "Sorry, your subscription failed. Please try again.";
      } else {
        setSuccess(true);
        alertMessage = "You have successfully subscribed to our newsletter!";
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setSuccess(false);
      alertMessage = "Sorry, an unexpected error occurred. Please try again.";
    } finally {
      setLoading(false);
      alert(alertMessage);
    }
  };  

  return (
    <div className="bg-gray-900 min-h-screen py-8 text-[20px]">
      <div className="bg-gray-800 border border-gray-700 text-white container mx-auto grid gap-4 rounded-lg shadow-md max-w-[600px] overflow-hidden">
      <Image
          src="/banner.jpeg"
          alt={'newsletter'}
          width={600}
          height={200}
          className="object-cover responsive-img"
          style={{ maxHeight: '200px' }}
        />
        <div className="grid px-8 pb-6 text-gray-200 space-y-3 text-center">
          {!success && <>
            <p className="text-gray-300">Get the latest news and updates from us.</p>
            <div className="grid">
              <input
                type='email'
                name='email'
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
            </div>
            {success == false && <>
              <div className="notification error">Sorry, your subscription has failed!</div>
            </>}
            <div className="grid">
              <Button label={'Subscribe'} color="primary" loading={loading} onClick={subscribeToNewsletter} />
            </div>
          </>}
          {success == true && <>
              <div className="notification success">You have successfully subscribed!</div>
            </>}
        </div>
      </div>
    </div>
  )
}
