import React from 'react';
import Header from './components/header/Header'
import './App.css';
import Content from "./components/content/Content";
import Counter from "./components/Counter";

function App() {
  return (
      <div data-testid="app-component">
          <Header/>
          <Content/>
          <Counter initialValue={0}/>
      </div>
  );
}

export default App;
