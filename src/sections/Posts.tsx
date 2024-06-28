'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './posts.css';

export default function posts() {
  const router = useRouter();
  const [items, setItems] = useState<any | []>([]);

 

  useEffect(() => {
    const getItemsData = () => {
      fetch('/api/postitems')
        .then(res => res.json())
        .then(data => setItems(data))
        .catch(e => console.log(e.message));
    };

    getItemsData();
  }, []);

  return (
    <section id="posts" className='posts'>
      <div className="container" data-aos='fade-up'>
        {items &&
          items.length > 0 &&
          items.map((item: { item: { id: string; title: string } }) => (
            <p key={item._id}>{ item._title }</p>
          ))}
      </div>
    </section>
  );
}