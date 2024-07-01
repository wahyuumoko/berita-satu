'use client'

import React, { useState } from 'react';
import './header.css';
import Nav from './Nav';
import Sci from './Sci';
import SearchForm from './SearchForm';

export default function Header() {
    const [open, setOpen] = useState(false);
    const [on, setOn] = useState(false);

    const handleFormOpen = (e: Event | any) => { 
        e.preventDefault();
        setOpen(!open);
    };
    
    const handleToggleMenu = () => { 
        setOn(!on);
        let body: HTMLElement | any = document.querySelector('body');
        body.classList.toggle('mobile-nav-active');
    }; 

    return (
        <header
            id="header" 
            className="header d-flex align-items-center fixed-top"
        >
            <div className="container-fluid container-xl d-flex align-item-center justify-content-between">
            <a href="/" className="logo d-flex align-items-center">
            {/* <img scr="" alt"" /> */}
            <h1>Berita Satu</h1>
                </a>
                <Nav />
                <div className="position-relative">
                    <Sci />
                    <a className='mx-2 js-search--open' onClick={handleFormOpen}>
                     <span className="bi-search"></span> 
                    </a>

                    {
                        on ? (
                            <i className='bi bi-x mobile-nav-toggle' onClick={handleToggleMenu}></i>
                        ) : (<i className='bi bi-list mobile-nav-toggle' onClick={handleToggleMenu}
                        ></i>
                    )}
                    <SearchForm active={open} formOpen={handleFormOpen}/>
                    <a href="/signin" className="bi-person-circle color-black">
            log-in
          </a>
                </div>
            </div>
        </header>
    );
}
