import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { QuizQuestion } from '../types/Quiz';
import Button from '@mui/material/Button';

const EasyQuiz: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // useEffect hook to fetch quiz data
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        // Fetch quiz data from the API
        const response = await axios.get('https://opentdb.com/api.php?amount=10&difficulty=easy');
        // Process the fetched data to include shuffled answers
        const questionsWithAnswers: QuizQuestion[] = response.data.results.map((q: any) => ({
          ...q,
          answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5), // Shuffling answers
        }));
        // Update the state with the fetched questions
        setQuestions(questionsWithAnswers);
        // Set loading to false after data is fetched
        setLoading(false);
      } catch (err) {
        // Handle any errors during data fetching
        console.error('Error fetching quiz data:', err);
        setError('Failed to fetch quiz data');
        setLoading(false);
      }
    };

    // Call the fetchQuizData function
    fetchQuizData();
  }, []);

  // Function to handle answer selection
  const handleAnswerClick = (questionIndex: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  // Function to show the results
  const handleShowResults = () => {
    const correctAnswers = questions.reduce((acc, question, index) => {
      return acc + (selectedAnswers[index] === question.correct_answer ? 1 : 0);
    }, 0);
    setScore(correctAnswers);
    setShowResults(true);
  };

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>{error}</div>;
  }

  // Render the quiz questions and answers
  return (
    <div className="App">
      <header className="App-header">
        {questions.map((question, index) => (
          <div key={index} className="quiz-question">
            <h2 dangerouslySetInnerHTML={{ __html: question.question }} />
            <ul>
              {question.answers && question.answers.map((answer, i) => (
                <li
                  key={i}
                  onClick={() => handleAnswerClick(index, answer)}
                  className={
                    showResults
                      ? answer === question.correct_answer
                        ? 'correct-answer'
                        : selectedAnswers[index] === answer
                        ? 'incorrect-answer'
                        : ''
                      : selectedAnswers[index] === answer
                      ? 'selected-answer'
                      : ''
                  }
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              ))}
            </ul>
          </div>
        ))}
        <Button variant="contained" onClick={handleShowResults}>Show Results</Button>
        {showResults && (
          <div className="results">
            <h3>You got {score} out of 10 questions correct</h3>
          </div>
        )}
      </header>
    </div>
  );
}

export default EasyQuiz;