import React from 'react';
import AnirChat from './components/AnirChat';
import NavbarDefault from './components/navbar';
import 'tailwindcss/tailwind.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavbarDefault /> 
      <AnirChat />
    </div>
  );
}

export default App;
