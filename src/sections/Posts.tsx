'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './posts.css';
import PostItemOne from '@/components/PostItemOne';

export default function Posts() {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [item, setItem] = useState<any>({});

  const getItemsData = () => {
    fetch('/api/postitems')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(e => console.log(e.message));
  };

  const getSinglePostData = (id: string) => {
    fetch(`/api/postitems/${id}`)
      .then(res => {
        if (res.status === 404) {
          router.push('/not-found');
        }
        return res.json();
      })
      .then(data => setItem(data))
      .catch(e => console.log(e.message));
  };

  useEffect(() => {
    getItemsData();
    getSinglePostData('667e247b69ea2644dc4ac4bb');
  }, []);

  return (
    <section id="posts" className="posts">
      <div className="container" data-aos="fade-up">
        <div className="row g-5">
          <div className="col-lg-4">
            <PostItemOne large={true} item={item} />
          </div>
          <div className="col-lg-8">
            <div className="row g-5">
              <div className="col-lg-4 border-start custom-border">
                {items &&
                  items.length > 0 &&
                  items
                    .filter(
                      (item: { trending: boolean; top: boolean }) =>
                        item.trending || item.top
                    )
                    .slice(0, 3)
                    .map((item: {
                      _id: string;
                      img: string;
                      category: string;
                      date: string;
                      title: string;
                      brief: string;
                      avatar: string;
                      author: string;
                    }) => (
                      <PostItemOne key={item._id} large={false} item={item} />
                    ))}
              </div>
              <div className="col-lg-4"></div>
              <div className="col-lg-4"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
