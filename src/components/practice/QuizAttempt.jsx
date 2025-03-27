import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios';

const QuizAttempt = () => {
  const { techStackId, difficulty } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const startQuiz = async () => {
      try {
        const response = await axiosInstance.post('/api/practice/start', {
          techStackId,
          difficulty
        });
        setQuiz(response.data);
        setTimeLeft(response.data.questions[0].timeLimit);
        setLoading(false);
      } catch (err) {
        if (err.response?.status === 401) {
          setError('Please login to attempt the quiz');
        } else {
          setError(err.response?.data?.message || 'Failed to start quiz');
        }
        setLoading(false);
      }
    };

    startQuiz();
  }, [techStackId, difficulty]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || quizCompleted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizCompleted]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft]);

  const handleAnswerSelect = (optionIndex) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = async () => {
    const newAnswers = [...selectedAnswers];
    if (newAnswers[currentQuestion] === undefined) {
      newAnswers[currentQuestion] = null;
    }
    setSelectedAnswers(newAnswers);

    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(quiz.questions[currentQuestion + 1].timeLimit);
    } else {
      await submitQuiz(newAnswers);
    }
  };

  const submitQuiz = async (answers) => {
    try {
      const response = await axiosInstance.post(
        `/api/practice/submit/${quiz.attemptId}`, 
        { answers }
      );
      setResults(response.data);
      setQuizCompleted(true);
    } catch (err) {
      setError('Failed to submit quiz');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
          {error === 'Please login to attempt the quiz' && (
            <button
              onClick={() => navigate('/login')}
              className="ml-4 text-red-500 hover:text-red-600"
            >
              Go to Login
            </button>
          )}
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Quiz Results</h2>
          <div className="text-center mb-8">
            <p className="text-4xl font-bold text-red-600">
              Score: {results.totalScore}
            </p>
          </div>
          
          <div className="space-y-6">
            {results.questions.map((q, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg ${
                  q.isCorrect ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <p className="font-medium mb-2">{q.question}</p>
                <p className="text-sm text-gray-600 mb-2">
                  Your answer: {q.selectedOption !== null ? `Option ${q.selectedOption + 1}` : 'No answer'}
                </p>
                <p className="text-sm">
                  {q.isCorrect ? (
                    <span className="text-green-600">Correct!</span>
                  ) : (
                    <span className="text-red-600">Incorrect</span>
                  )}
                </p>
                <p className="text-sm text-gray-600 mt-2">{q.explanation}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/practice')}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Back to Practice
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </span>
          <span className={`text-sm font-medium ${
            timeLeft <= 10 ? 'text-red-600' : 'text-red-600'
          }`}>
            Time left: {timeLeft}s
          </span>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-medium mb-6">{question.question}</h2>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`w-full text-left p-4 rounded-lg transition-colors ${
                  selectedAnswers[currentQuestion] === index
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNextQuestion}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            {currentQuestion + 1 === quiz.questions.length ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizAttempt; 