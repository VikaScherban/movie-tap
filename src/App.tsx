import React from 'react';
import Header from './components/header/Header'
import './App.css';
import Content from "./components/content/Content";
import Counter from "./components/Counter";

function App() {
  return (
      <div>
          <Header/>
          <Content/>
          <Counter/>
      </div>
  );
}

export default App;
