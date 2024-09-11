import React, { useState, useEffect } from "react";
import { POKEMON_STATUS_FREE } from "@context";
import { useBattleContext } from "@context";
import { IfElse } from "@ds";

// styles
import "./RandomTaskPicker.scss";

export type TChallenge = {
  description: string;
  challenge: string;
  id: number;
  difficulty: number;
  answer: string;
  timer: number;
};

const ANSWER_IS_UNANSWERED = 0;
const ANSWER_IS_INCORRECT = 2;
const ANSWER_IS_CORRECT = 1;

export const RandomTaskPicker: React.FC = () => {
  const ctx = useBattleContext();
  const { state, handleCorrect, handleWrong, handleSelectTask } = ctx;
  const { pokemonStatus, selectedTask = {} } = state;

  const [remainingTimeInPercentage, setRemainingTimeInPercentage] =
    useState<number>(0);
  const [answerInputs, setAnswerInputs] = useState<Record<string, string>>({});
  const [correct, setCorrect] = useState<number>(ANSWER_IS_UNANSWERED);
  const [isSlideDown, setIsSlideDown] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  // const [tasks, setTasks] = useState<TChallenge[]>([]);

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
      .map((part: any, index: any) => {
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
  function selectRandomTask(tasks: TChallenge[] = []) {
    if (tasks.length === 0) return;

    const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
    handleSelectTask(randomTask);
    setRemainingTime(randomTask.timer);
    setAnswerInputs({});
    setCorrect(ANSWER_IS_UNANSWERED);
  }

  useEffect(() => {
    selectRandomTask();
  }, []);

  useEffect(() => {
    const tasksFromLocalStorage = localStorage.getItem("learnimon__challenges");

    if (!tasksFromLocalStorage) return;

    const tasks = JSON.parse(tasksFromLocalStorage!);

    selectRandomTask(tasks);
  }, []);

  const slideDownClass = isSlideDown ? "slide-down" : "";

  console.log("selectedTask", selectedTask?.answer?.split(" "));

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
              {selectedTask.challenge
                .trim()
                .split(" ")
                .map((part: any, index: any) => {
                  const correctAnswerIndexLength =
                    selectedTask.answer.split(" ")[index].length;
                  return (
                    <IfElse condition={part.includes("--")} key={index}>
                      <input
                        onChange={({ target: t }) =>
                          handleInputChange(index, t.value)
                        }
                        value={answerInputs[index] || ""}
                        className='p-2 d-inline-flex mx-2 fs-3 fw-8'
                        disabled={correct !== ANSWER_IS_UNANSWERED}
                        type='text'
                        style={{
                          width:
                            correctAnswerIndexLength > 2
                              ? correctAnswerIndexLength * 20 + "px"
                              : correctAnswerIndexLength * 30 + "px",
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
