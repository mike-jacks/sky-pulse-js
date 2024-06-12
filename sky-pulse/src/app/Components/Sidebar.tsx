"use client"

import { useState } from "react";


export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleIsOpen() {
        setIsOpen(!isOpen);
    }
  return (
    <div className={`drawer ${isOpen ? '' : ''}`}>
      <input id="my-drawer" type="checkbox" className="drawer-toggle" aria-label="Toggle sidebar"/>
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn drawer-button" aria-label="Open drawer" onClick={toggleIsOpen}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay" aria-label="Close sidebar"></label>
        <div className="flex flex-col p-4 w-60 min-h-full bg-base-200 text-base-content relative">
          {/* Close button at the top right */}
          <label htmlFor="my-drawer" className="btn btn-square btn-outline drawer-button absolute top-4 right-4" aria-label="Close drawer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </label>
          {/* Sidebar content here */}
          <ul className="menu mt-8">
            <li>
              <a href="/" aria-label="Home">
                Home
              </a>
            </li>
            <li>
              <a href="/About" aria-label="About">
                About
              </a>
            </li>
            <li>
              <a href="/FAQ" aria-label="FAQ">
                FAQ
              </a>
            </li>
            <li>
              <a href="/Contact" aria-label="Contact">
                Contact Me
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
