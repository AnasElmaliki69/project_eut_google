import React from 'react';

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-indigo-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-6xl font-bold hover:text-blue-300">ANIR</a>
        <ul className="flex space-x-4"> 
          <li>
          <a href="/about" className="text-white ">About</a>
          </li> 
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
