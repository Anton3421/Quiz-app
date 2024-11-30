import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { QuizQuestion } from '../types/Quiz';
import Button from '@mui/material/Button';

const MediumQuiz: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=10&difficulty=medium');
        const questionsWithAnswers: QuizQuestion[] = response.data.results.map((q: any) => ({
          ...q,
          answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5), // Shuffling answers
        }));
        setQuestions(questionsWithAnswers);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching quiz data:', err);
        setError('Failed to fetch quiz data');
        setLoading(false);
      }
    };
  
    fetchQuizData();
  }, []);

  const handleAnswerClick = (questionIndex: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        {questions.map((question, index) => (
          <div key={index} className="quiz-question">
            <h2 dangerouslySetInnerHTML={{ __html: question.question }} />
            <ul>
              {question.answers && question.answers.length > 0 ? (
                question.answers.map((answer, i) => (
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
                ))
              ) : (
                <li>No answers available</li> // Optional: handle the case if answers are not loaded for some reason
              )}
            </ul>
          </div>
        ))}
        {showResults && (
          <div className="results">
            {questions.map((question, index) => (
              <div key={index}>
                <p dangerouslySetInnerHTML={{ __html: question.question }} />
                <p>
                  Correct Answer: {question.correct_answer}
                  {selectedAnswers[index] && (
                    <span>
                      {' | Your Answer: '}{selectedAnswers[index]} 
                      {selectedAnswers[index] === question.correct_answer ? 
                        ' (Correct)' : ' (Incorrect)'}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
        <Button variant="contained" onClick={handleShowResults}>Show Results</Button>
      </header>
    </div>
  );
}

export default MediumQuiz;