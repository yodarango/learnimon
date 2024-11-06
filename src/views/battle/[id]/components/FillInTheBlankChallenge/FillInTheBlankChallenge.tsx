// styles
import "./FillInTheBlankChallenge.scss";
import { Button, IfElse } from "@ds";
import {
  FillInTheBlankChallengeProps,
  useFillInTheBlankChallenge,
  ANSWER_IS_UNANSWERED,
} from "./useFillInTheBlankChallenge";

export const FillInTheBlankChallenge = (
  props: FillInTheBlankChallengeProps
) => {
  const {
    handleInputChange,
    answerInputs,
    selectedTask,
    checkAnswer,
    correct,
  } = useFillInTheBlankChallenge(props);

  return (
    <div className='fill-in-the-blank-11ta'>
      <div>
        <div
          className='fill-in-the-blank-11ta__description fs-2 mb-4 text-center'
          dangerouslySetInnerHTML={{ __html: selectedTask.description }}
        />
        <div className='fill-in-the-blank-11ta__task d-flex align-items-center justify-content-center flex-wrap'>
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

        <Button
          disabled={correct !== ANSWER_IS_UNANSWERED}
          className='m-auto w-100 mt-6 fw-8 fs-1'
          onClick={checkAnswer}
          maxWidth={"20rem"}
          primary
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
