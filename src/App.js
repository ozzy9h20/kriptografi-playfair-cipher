import React from 'react';
import Playfair from './features/playfair/Playfair';
import './App.css';

function App() {
  return (
    <div className="ui container">
      <div className="ui segment">
        <h2 className="ui header">Enkripsi Playfair Cipher</h2>
        <Playfair />
      </div>
    </div>
  );
}

export default App;
