import { FillInTheBlankChallenge } from "../FillInTheBlankChallenge/FillInTheBlankChallenge";
import React, { useState, useEffect } from "react";
import { useBattleContext } from "@context";

// styles
import "./RandomTaskPicker.scss";

export type TChallenge = {
  description: string;
  challenge: string;
  difficulty: number;
  answer: string;
  timer: number;
  id: number;
};

export const RandomTaskPicker: React.FC = () => {
  const ctx = useBattleContext();
  const { state, handleCorrect, handleWrong, handleSelectTask } = ctx;
  const { selectedTask = {} } = state;

  const [remainingTimeInPercentage, setRemainingTimeInPercentage] =
    useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  // Selects a random task from the list in the local storage
  function selectRandomTask(tasks: TChallenge[] = []) {
    if (tasks.length === 0) return;

    const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
    setRemainingTime(randomTask.timer);
    handleSelectTask(randomTask);
  }

  useEffect(() => {
    const tasksFromLocalStorage = localStorage.getItem("learnimon__challenges");

    if (!tasksFromLocalStorage) return;

    const tasks = JSON.parse(tasksFromLocalStorage!);

    selectRandomTask(tasks);
  }, []);

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
    } else {
      setRemainingTimeInPercentage(100);
    }
  }, [remainingTime, selectedTask]);

  return (
    <div className={"random-task-picker-82mv p-5 "}>
      <div
        className='random-task-picker-82mv__timer'
        style={{ width: `${remainingTimeInPercentage}%` }}
      />

      {/* eventually this will need to be conditionally render based on the type of challenge */}
      {selectedTask?.id && (
        <FillInTheBlankChallenge
          onRemainingTime={setRemainingTime}
          selectedTask={selectedTask}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
        />
      )}
    </div>
  );
};
