import React, { useState, useEffect } from "react";
import { POKEMON_STATUS_FREE } from "@context";
import { useBattleContext } from "@context";
import { IfElse } from "@ds";

// styles
import "./RandomTaskPicker.scss";

interface Task {
  description: string;
  task: string;
  id: number;
  difficulty: number;
  answer: string;
  timer: number;
}

const tasks: Task[] = [
  {
    description:
      "Translate the following sentence to Spanish. <p class='color-chi'>The house is big</p>",
    task: "La -- es --.",
    answer: "La casa es grande",
    id: 1,
    difficulty: 2,
    timer: 30,
  },
  {
    description:
      "Translate the following sentence to Spanish. <p class='color-chi'>The dog is black</p>",
    task: "El -- es --.",
    answer: "El perro es negro",
    id: 2,
    difficulty: 2,
    timer: 25,
  },
  {
    description:
      "Translate the following sentence to Spanish. <p class='color-chi'>The apple is red</p>",
    task: "La -- es --.",
    answer: "La manzana es roja",
    id: 3,
    difficulty: 3,
    timer: 20,
  },
  {
    description:
      "Translate the following sentence to Spanish. <p class='color-chi'>The car is fast</p>",
    task: "El -- es --.",
    answer: "El carro es rapido",
    id: 4,
    difficulty: 3,
    timer: 35,
  },
  {
    description:
      "Translate the following sentence to Spanish. <p class='color-chi'>The tree is tall</p>",
    task: "El -- es --.",
    answer: "El arbol es alto",
    id: 5,
    difficulty: 4,
    timer: 40,
  },
];

const ANSWER_IS_UNANSWERED = 0;
const ANSWER_IS_INCORRECT = 2;
const ANSWER_IS_CORRECT = 1;

export const RandomTaskPicker: React.FC = () => {
  const ctx = useBattleContext();
  const { state, handleCorrect, handleWrong } = ctx;
  const { pokemonStatus } = state;

  const [remainingTimeInPercentage, setRemainingTimeInPercentage] =
    useState<number>(0);
  const [answerInputs, setAnswerInputs] = useState<Record<string, string>>({});
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [correct, setCorrect] = useState<number>(ANSWER_IS_UNANSWERED);
  const [isSlideDown, setIsSlideDown] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  // countdown
  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
        setRemainingTimeInPercentage(
          100 - (remainingTime / selectedTask!.timer) * 100
        );
      }, 1000);
      return () => clearTimeout(timer);
    } else if (remainingTime === 0 && correct === null && selectedTask) {
      setRemainingTimeInPercentage(100);
      setCorrect(ANSWER_IS_INCORRECT);
    }
  }, [remainingTime, correct, selectedTask]);

  const handleInputChange = (idex: number, value: string) => {
    const newInputs = { ...answerInputs };
    newInputs[idex] = value;
    setAnswerInputs(newInputs);
  };

  // Checks the user's answer against the correct answer
  function checkAnswer() {
    if (!selectedTask) return;

    const userAnswer = selectedTask.answer
      .split(" ")
      .map((part, index) => {
        if (!!answerInputs[index])
          return part.replace(part.trim(), answerInputs[index]);
        return part;
      })
      .join("")
      .replace(/ /g, "")
      .toLowerCase();
    const correctAnswer = selectedTask.answer.replace(/ /g, "").toLowerCase();

    if (userAnswer === correctAnswer) {
      setCorrect(ANSWER_IS_CORRECT);
      handleCorrect();
    } else {
      setCorrect(ANSWER_IS_INCORRECT);
      handleWrong();
    }
  }

  // Selects a random task from the list
  function selectRandomTask() {
    const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
    setSelectedTask(randomTask);
    setRemainingTime(randomTask.timer);
    setAnswerInputs({});
    setCorrect(ANSWER_IS_UNANSWERED);
  }

  useEffect(() => {
    selectRandomTask();
  }, []);

  const slideDownClass = isSlideDown ? "slide-down" : "";

  if (pokemonStatus !== POKEMON_STATUS_FREE) return <></>;

  return (
    <div
      className={
        "random-task-picker-82mv d-flex align-items-center justify-content-center p-5 " +
        slideDownClass
      }
    >
      <div
        className='random-task-picker-82mv__timer'
        style={{ width: `${remainingTimeInPercentage}%` }}
      />
      <button
        onClick={() => setIsSlideDown(!isSlideDown)}
        className='random-task-picker-82mv__close bg-nu color-alpha'
      >
        <ion-icon
          name={!isSlideDown ? "chevron-down-outline" : "chevron-up-outline"}
        />
      </button>
      {selectedTask && (
        <div className='random-task-picker-82mv__content'>
          <div>
            <div
              className='random-task-picker-82mv__description fs-2 mb-4 text-center'
              dangerouslySetInnerHTML={{ __html: selectedTask.description }}
            />
            <div className='random-task-picker-82mv__task d-flex align-items-center justify-content-center flex-wrap'>
              {selectedTask.task.split(" ").map((part, index) => {
                return (
                  <IfElse condition={part.includes("--")} key={index}>
                    <input
                      onChange={({ target: t }) =>
                        handleInputChange(index, t.value)
                      }
                      value={answerInputs[index] || ""}
                      className='p-4 d-inline-flex mx-2 fs-3 fw-8'
                      disabled={correct !== ANSWER_IS_UNANSWERED}
                      type='text'
                      style={{
                        width:
                          selectedTask.answer.split(" ")[index].length * 20 +
                          "px",
                      }}
                    />
                    <h3 className='fs-3'>{part}</h3>
                  </IfElse>
                );
              })}
            </div>

            <button
              onClick={checkAnswer}
              disabled={correct !== ANSWER_IS_UNANSWERED}
              className='m-auto d-block mt-4 bg-nu color-alpha fw-8 fs-1'
            >
              <u>Submit</u>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
