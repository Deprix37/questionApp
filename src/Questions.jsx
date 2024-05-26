import React, { useState, useEffect } from 'react';

const Questions = ({ question, showOptions, onOptionClick }) => {
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    // Herhangi bir cevap seçeneği tıklandığında hemen yeni soruya geç
    if (selectedOption) {
      const isCorrect = selectedOption === question.answer;
      onOptionClick(isCorrect); // Yeni soruya geç ve doğru/yanlış cevabı işaretle
      setSelectedOption(''); // Seçilen seçeneği sıfırla
    }
  }, [selectedOption, onOptionClick, question]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="question-container">
      <div className="question">
        <img src={question.media} alt="question media" />
        <p>{question.question}</p>
      </div>
      {showOptions && (
        <div className="options">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              disabled={selectedOption !== ''}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Questions;