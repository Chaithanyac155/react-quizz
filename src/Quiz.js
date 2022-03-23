import React, { useEffect, useState } from "react";
import { data } from "./data";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [myanswer, setMyAnswer] = useState("");
  const [finish, setFinish] = useState(false);
  const [clickAnswer, setClickAnswer] = useState(false);
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(0);

  const selectAnswerRadio = (e) => {
    setMyAnswer(e.currentTarget.value);
    setClickAnswer(true);
    setShow(false);
  };

  const showAnswer = () => {
    setShow(!show);
    // setFinish(false);
  };
  const checkCorrectAnswer = () => {
    if (myanswer === data[currentQuestion].answer) {
      setScore(score + 1);
    }
  };
  const reset = () => {
    setMyAnswer("");
    setClickAnswer(false);
    setShow(false);
  };

  const handleSubmit = () => {
    if (currentQuestion === data.length - 1) {
      setFinish(true);
      setClickAnswer(true);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setFinish(false);
    setMyAnswer("");
    setClickAnswer(false);
    setScore(0);
  };
  if (finish) {
    return (
      <div className="container finish">
        <h4
          style={{ textAlign: "center", color: "" }}
          className="p-2 mb-3 bg-info text-white rounded"
        >
          Quiz
        </h4>
        <h5>Quiz Over!</h5>
        <h5>{`Your Score is ${score}/${data.length}`}</h5>
        <button
          type="button"
          className="btn btn-warning"
          onClick={handleRetakeQuiz}
        >
          Retake Quiz
        </button>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h4
          style={{ textAlign: "center", color: "" }}
          className="p-2 mb-3 bg-info text-white rounded"
        >
          Quiz
        </h4>
        <h4 className="question">
          {`${data[currentQuestion].id}) ${data[currentQuestion].question}`}
        </h4>
        <p className="questions-count">{`${currentQuestion + 1}/${
          data.length
        }`}</p>
        {data[currentQuestion].variants.map((variant, index) => (
          <li key={index} className="answer-item">
            <input
              type="radio"
              name="select-answer"
              value={variant}
              checked={myanswer === variant}
              onChange={selectAnswerRadio}
              className={`answer-item ${
                myanswer === variant
                  ? myanswer === data[currentQuestion].answer
                    ? "correctAnswer"
                    : "wrongAnswer"
                  : null
              }`}
            />
            <span className="ml-2" style={{ cursor: "default" }}>
              {variant}
            </span>
            <span
              className={` ${
                myanswer === variant
                  ? myanswer === data[currentQuestion].answer
                    ? "correctCaption"
                    : "wrongCaption"
                  : null
              }`}
            >{`${
              myanswer === variant
                ? myanswer === data[currentQuestion].answer
                  ? "Uho! right answer"
                  : "sry! wrong answer"
                : ""
            }`}</span>
          </li>
        ))}
        {clickAnswer && (
          <button
            type="button"
            className="showAnswer"
            onClick={() => showAnswer()}
          >
            Check your Answer Here!
          </button>
        )}
        {show && (
          <p className="actual-answer">
            Correct Answer: <span> {data[currentQuestion].answer}</span>
          </p>
        )}

        <div className="btn-prev-next">
          <button
            className="btn btn-secondary"
            disabled={currentQuestion === 0}
            onClick={() => {
              setCurrentQuestion(currentQuestion - 1);
              checkCorrectAnswer();
            }}
          >
            PREV
          </button>

          {currentQuestion < data.length - 1 && (
            <button
              className="btn btn-primary"
              disabled={currentQuestion === data.length - 1}
              onClick={() => {
                setCurrentQuestion(currentQuestion + 1);
                checkCorrectAnswer();
                reset();
              }}
            >
              NEXT
            </button>
          )}
          {currentQuestion === data.length - 1 && (
            <button className="btn btn-success" onClick={() => handleSubmit()}>
              SUBMIT
            </button>
          )}
        </div>
      </div>
    );
  }
};

export default Quiz;
