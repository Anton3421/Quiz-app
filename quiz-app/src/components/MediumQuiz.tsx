import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { QuizQuestion } from '../types/Quiz';

const MediumQuiz: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=10&difficulty=medium');
        setQuestions(response.data.results);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching quiz data:', err);
        setError('Failed to fetch quiz data');
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

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
              {[...question.incorrect_answers, question.correct_answer].map((answer, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: answer }} />
              ))}
            </ul>
          </div>
        ))}
      </header>
    </div>
  );
}

export default MediumQuiz;