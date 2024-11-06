import { useState } from "react";

export const ANSWER_IS_UNANSWERED = 0;
export const ANSWER_IS_INCORRECT = 2;
export const ANSWER_IS_CORRECT = 1;

export type FillInTheBlankChallengeProps = {
  onRemainingTime: (time: number) => void;
  onCorrect: () => void;
  onWrong: () => void;
  selectedTask: any;
};

export const useFillInTheBlankChallenge = (
  props: FillInTheBlankChallengeProps
) => {
  const [answerInputs, setAnswerInputs] = useState<Record<string, string>>({});
  const [correct, setCorrect] = useState<number>(ANSWER_IS_UNANSWERED);

  const { onCorrect, onWrong, selectedTask } = props;

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
      onCorrect();
    } else {
      setCorrect(ANSWER_IS_INCORRECT);
      onWrong();
    }
  }

  return {
    handleInputChange,
    selectedTask,
    answerInputs,
    checkAnswer,
    correct,
  };
};
