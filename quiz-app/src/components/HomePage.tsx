import React, { useEffect, useState } from 'react';
import '../App.css';
import Typography from '@mui/material/Typography';

const HomePage: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h2" gutterBottom>
          Welcome to the Quiz App
        </Typography>
        <Typography variant="body1" gutterBottom>
          Test your knowledge with our fun and challenging quizzes. Choose from different difficulty levels and categories to start your quiz journey.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Click on the menu icon to navigate to different quizzes. You can select from Easy, Medium, and Hard quizzes.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Good luck and have fun!
        </Typography>
      </header>
    </div>
  );

}

export default HomePage;