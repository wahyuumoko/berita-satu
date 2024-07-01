'use client'


import React, {useState, useEffect} from 'react'
import {initialPost} from '@/sections/Posts';
import Image from 'next/image';
export default function PostItem({params}: {params: { id : string } }) {
    const id: string = params.id;

    const [item, setItem] = useState(initialPost);

    const getSinglePostData= ()=>{
        fetch('/api/postitems/${id}')
        .then(res=>res.json())
        .then(data=>setItem(data))
        .catch(e => console.log(e.massage));
    };

    useEffect(() => {
        getSinglePostData();
    }, []);
  return (
    <main id="main">
        <section className="single-post-content">
            <div className="container">
                <div className="row">
                    <div className="col-md-9 post-content">
                        <div className="single-post">
                            <div className="post-meta">
                                <span className="date">{item.category}</span>
                                <span className="mx-1">
                                    <i className="bi bi-dot"></i>
                                    </span>
                                <span>{new Date(item.date).toLocaleDateString('en-US')}</span>
                            </div>
                            <h1 className="mb-5">{item.title}</h1>
                            <p>
                                <span className="firstcharacter">
                                    {item.brief && item.brief.charAt(0)}
                                </span>
                                {item.brief && item.brief.substring(1)}
                            </p>
    
                            <figure className="my-4">
                                <Image 
                                    src={'/${item.img}'}
                                    alt="" 
                                    className="image-fluid"
                                    width={100}
                                    height={100}
                                    layout="responsive"
                                />
                                <figcaption>
                                    Lorem Insum de Nalika Insum Tak parani
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
  )
}
