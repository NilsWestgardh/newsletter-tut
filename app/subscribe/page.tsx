"use client";

import { isValidEmail } from "../lib/utils";
import { useState } from "react";
import Image from "next/image";
import { useAppContext } from "../context";

export default function Home() {
  const { supabase } = useAppContext();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<any>(undefined);

  const subscribeToNewsletter = async () => {
    if (!isValidEmail(email)) return alert(`Please enter a valid email address.`);
    
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('subscribers')
        .insert([{ email, owner_id: '40cd69a9-c719-4d7a-b821-c740fcd0fef2' }]) // Update owner_id to your user id
        .select();

        if (data) {
          console.log(data);
          setSuccess(true);
        }

    } catch (error: any) {
      setSuccess(false);
      throw new Error(error);
    } finally {
      setLoading(false);
    }

    return alert(`You have successfully subscribed to our newsletter!`);
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
          <p className="text-gray-300">Get the latest news and updates from us.</p>
          <div className="grid">
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid">
            <button className="primary" onClick={subscribeToNewsletter}>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  )
}
