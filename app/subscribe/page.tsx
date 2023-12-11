"use client";

import { isValidEmail } from "../lib/utils";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState<string>("");

  const subscribeToNewsletter = () => {
    if (!isValidEmail(email)) return alert(`Please enter a valid email address.`);
    // All the operations
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
        <div className="grid px-8 pb-6 text-gray-200 text-center">
          <h1 className="text-3xl font-bold">Subscribe to our newsletter</h1>
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
            <button>Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  )
}
