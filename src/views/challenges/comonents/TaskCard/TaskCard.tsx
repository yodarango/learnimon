import React, { HTMLProps } from "react";

type TTask = Record<string, any>;

export const TaskCard: React.FC<HTMLProps<HTMLDivElement> & TTask> = (
  props
) => {
  const { task, handleDelete } = props;

  return (
    <div className='task-card-72 bg-gamma p-4 rounded'>
      <div className='d-flex align-items-center justify-content-between gap-4'>
        <p>{task.description}</p>
        <button
          className='bg-nu color-danger'
          onClick={() => handleDelete(task.id)}
        >
          <ion-icon name='trash-outline' />
        </button>
      </div>
    </div>
  );
};
