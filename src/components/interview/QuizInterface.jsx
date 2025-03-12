import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const QuizInterface = () => {
  const { stackId, level } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const capitalizedLevel = level.charAt(0).toUpperCase() + level.slice(1);
        console.log('Fetching quiz for:', { stackId, level: capitalizedLevel });
        
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Please login to attempt the quiz');
        }

        const response = await fetch(`https://lamback.onrender.com/api/techstack/${stackId}/questions/${capitalizedLevel}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Quiz data received:', data);

        if (!data || !Array.isArray(data)) {
          throw new Error('Invalid quiz data received');
        }

        setQuiz({ questions: data });
        setTimeLeft(30); // Set timer to 30 seconds
        setLoading(false);
      } catch (err) {
        console.error('Error fetching quiz:', err);
        setError(err.message || 'Failed to load quiz');
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [stackId, level]);

  useEffect(() => {
    if (timeLeft === null || quizCompleted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Automatically move to next question when time is up
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizCompleted]);

  const handleTimeUp = () => {
    if (!quizCompleted) {
      const currentQuestionData = quiz.questions[currentQuestion];
      const timeSpent = 30; // Full time spent

      // Ensure we always have a valid answer object, even if no option was selected
      const answer = {
        questionId: currentQuestionData._id,
        selectedOptionIndex: selectedOption === null ? -1 : selectedOption, // Use -1 for unanswered questions
        timeSpent
      };

      setAnswers([...answers, answer]);

      if (currentQuestion + 1 < quiz.questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setTimeLeft(30);
      } else {
        handleQuizSubmit();
      }
    }
  };

  const handleOptionSelect = (optionIndex) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to attempt the quiz');
      return;
    }
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    const currentQuestionData = quiz.questions[currentQuestion];
    const timeSpent = 30 - timeLeft;
    
    setAnswers([...answers, {
      questionId: currentQuestionData._id,
      selectedOptionIndex: selectedOption,
      timeSpent
    }]);

    if (selectedOption !== null) {
      const isCorrect = currentQuestionData.options[selectedOption].isCorrect;
      if (isCorrect) {
        setScore(score + currentQuestionData.points);
      }
    }

    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setTimeLeft(30);
    } else {
      handleQuizSubmit();
    }
  };

  const handleQuizSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required');
        return;
      }

      const finalAnswers = [...answers];
      
      // Add the last question's answer if not already added
      if (currentQuestion === quiz.questions.length - 1) {
        const lastAnswer = {
          questionId: quiz.questions[currentQuestion]._id,
          selectedOptionIndex: selectedOption === null ? -1 : selectedOption,
          timeSpent: 30 - timeLeft
        };
        // Check if the last answer is already in the answers array
        const lastAnswerExists = finalAnswers.some(answer => answer.questionId === lastAnswer.questionId);
        if (!lastAnswerExists) {
          finalAnswers.push(lastAnswer);
        }
      }

      // Ensure all answers have required fields and proper format
      const validAnswers = finalAnswers.map(answer => {
        if (!answer || !answer.questionId || answer.selectedOptionIndex === undefined) {
          // If answer is invalid, create a default answer for the corresponding question
          const questionIndex = finalAnswers.indexOf(answer);
          return {
            questionId: quiz.questions[questionIndex]._id,
            selectedOptionIndex: -1, // Indicate unanswered
            timeSpent: 30 // Max time
          };
        }
        return {
          questionId: answer.questionId,
          selectedOptionIndex: answer.selectedOptionIndex === null ? -1 : answer.selectedOptionIndex,
          timeSpent: answer.timeSpent || 30 // Default to max time if not specified
        };
      });

      // Validate answers array
      if (!validAnswers.length || validAnswers.length !== quiz.questions.length) {
        throw new Error('Invalid number of answers');
      }

      // Final validation
      validAnswers.forEach((answer, index) => {
        if (!answer.questionId || answer.selectedOptionIndex === undefined) {
          throw new Error(`Invalid answer format for question ${index + 1}`);
        }
      });

      const capitalizedLevel = level.charAt(0).toUpperCase() + level.slice(1);
      const response = await fetch(`https://lamback.onrender.com/api/techstack/${stackId}/questions/${capitalizedLevel}/submit`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answers: validAnswers })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to submit quiz: ${response.status}`);
      }

      const result = await response.json();
      setQuizCompleted(true);
      setScore(result.totalScore);
    } catch (err) {
      console.error('Error submitting quiz:', err);
      setError(err.message || 'Failed to submit quiz');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (quizCompleted) {
    const totalTimeSpent = answers.reduce((total, answer) => total + answer.timeSpent, 0);
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Completed!</h2>
            <div className="text-lg text-gray-600 mb-6">
              <p>Your Score: {score} points</p>
              <p>Time Taken: {totalTimeSpent} seconds</p>
            </div>
            <button
              onClick={() => navigate('/interview')}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Back to Interview Prep
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestionData = quiz.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Progress Bar */}
          <div className="h-2 bg-gray-200">
            <div
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>

          <div className="p-6">
            {/* Quiz Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm font-medium text-gray-500">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </div>
              <div className="text-sm font-medium text-gray-500">
                Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {currentQuestionData.questionText}
              </h3>
              <div className="space-y-4">
                {currentQuestionData.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={`w-full text-left p-4 rounded-lg border ${selectedOption === index ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-600 hover:bg-indigo-50'} transition-colors`}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setSelectedOption(-1);
                  handleNextQuestion();
                }}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Skip
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={selectedOption === null}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50 hover:bg-indigo-700 transition-colors"
              >
                {currentQuestion + 1 === quiz.questions.length ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizInterface;