import React, { useEffect, useState } from 'react';
import '../App.css';
import { QuizQuestion } from '../types/Quiz';
import Typography from '@mui/material/Typography';

const HomePage: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h4" gutterBottom>
          Welcome to the Quiz App
        </Typography>
      </header>
    </div>
  );

}

export default HomePage;