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
      {selectedTask && (
        <FillInTheBlankChallenge
          onRemainingTime={setRemainingTime}
          onSelected={handleSelectTask}
          selectedTask={selectedTask}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
        />
      )}
    </div>
  );
};
