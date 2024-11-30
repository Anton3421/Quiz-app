import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import EasyQuiz from './components/EasyQuiz';
import MediumQuiz from './components/MediumQuiz';
import HardQuiz from './components/HardQuiz';
import HomePage from './components/HomePage';
import CustomAppBar from './components/CustomAppBar';

const App: React.FC = () => {
  return (
    <Router>
      <CustomAppBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/easy" element={<EasyQuiz />} />
        <Route path="/medium" element={<MediumQuiz />} />
        <Route path="/hard" element={<HardQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;