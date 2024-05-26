import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import Info from './Info';
import Questions from './Questions';
import { questions } from './data';

function App() {
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [correctAnswerList, setCorrectAnswerList] = useState([]);
  const [wrongAnswerList, setWrongAnswerList] = useState([]);

  const startQuiz = () => {
    setShowQuestions(true);
    setShowOptions(false);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setCorrectAnswerList([]);
    setWrongAnswerList([]);
  };

  useEffect(() => {
    let timer;

    const showQuestionOptions = () => {
      setShowOptions(true);
      timer = setTimeout(() => {
        handleNextQuestion();
      }, 30000); // 30 saniye sonra otomatik olarak sonraki soruya geç
    };

    if (showQuestions && !showOptions) {
      timer = setTimeout(() => {
        showQuestionOptions();
      }, 10000);
    }

    return () => clearTimeout(timer);
  }, [showQuestions, showOptions, currentQuestionIndex]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setShowOptions(false);
  };

  const handleOptionClick = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswers(prevCount => prevCount + 1);
      setCorrectAnswerList(prevList => [...prevList, questions[currentQuestionIndex].question]);
    } else {
      setWrongAnswers(prevCount => prevCount + 1);
      setWrongAnswerList(prevList => [...prevList, questions[currentQuestionIndex].question]);
    }
    handleNextQuestion();
  };

  useEffect(() => {
    const optionsTimer = setTimeout(() => {
      setShowOptions(true);
    }, 10000);

    return () => clearTimeout(optionsTimer);
  }, [showQuestions]);

  useEffect(() => {
    const questionTimer = setTimeout(() => {
      handleNextQuestion();
    }, 30000); // 30 saniye sonra otomatik olarak sonraki soruya geç

    return () => clearTimeout(questionTimer);
  }, [currentQuestionIndex]);

  return (
    <>
      <Header />
      {!showQuestions && <Info startQuiz={startQuiz} />}
      {showQuestions && currentQuestionIndex < questions.length && (
        <Questions
          question={questions[currentQuestionIndex]}
          showOptions={showOptions}
          onOptionClick={handleOptionClick}
        />
      )}
      {currentQuestionIndex === questions.length && (
        <div>
          <p>Test bitti!</p>
          <p>Doğru cevaplar: {correctAnswers}</p>
          <p>İşaretlenen doğru cevaplar:</p>
          <ul>
            {correctAnswerList.map((answer, index) => (
              <li key={index}>{answer}</li>
            ))}
          </ul>
          <p>Yanlış cevaplar: {wrongAnswers}</p>
          <p>İşaretlenen yanlış cevaplar:</p>
          <ul>
            {wrongAnswerList.map((answer, index) => (
              <li key={index}>{answer}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
