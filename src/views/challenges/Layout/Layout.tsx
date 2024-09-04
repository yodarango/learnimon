import { IfElse, Input, Portal, Snackbar, Thumbnail, Toast } from "@ds";
import ShroodEmpty from "@assets/images/shrood_empty.webp";
import { TaskCard } from "../comonents/TaskCard/TaskCard";
import { useEffect, useState } from "react";

// styles
import "./Layout.scss";

export const Layout = () => {
  const [tasks, setTasks] = useState<Record<string, any>[]>([]);
  const [isToasterOpen, setIsToasterOpen] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    challenge: "",
    answer: "",
    id: "",
    difficulty: 0,
    timer: 0,
  });

  useEffect(() => {
    const tasks = localStorage.getItem("learnimon__challenges");

    if (tasks) {
      setTasks(JSON.parse(tasks));
    }
  }, []);

  const handleAddNewTask = () => {
    if (
      formData.description &&
      formData.challenge &&
      formData.answer &&
      formData.difficulty &&
      formData.timer
    ) {
      const newTasks = [
        ...tasks,
        {
          ...formData,
          id: Math.random().toString(36).substr(2, 9),
        },
      ];
      setTasks(newTasks);
      localStorage.setItem("learnimon__challenges", JSON.stringify(newTasks));
      setFormData({
        description: "",
        challenge: "",
        difficulty: 0,
        answer: "",
        timer: 0,
        id: "",
      });
    } else {
      setIsToasterOpen(true);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    localStorage.setItem("learnimon__challenges", JSON.stringify(newTasks));
  };

  return (
    <div className='layout-99th'>
      <Portal>
        <Snackbar
          onClose={() => setIsToasterOpen(false)}
          autoHideDuration={4000}
          open={isToasterOpen}
        >
          <Toast type='danger' title={"Missing fields!"}>
            Please fill in all the fields.
          </Toast>
        </Snackbar>
      </Portal>
      <h3 className='mb-6'>Challenges 🔥</h3>
      <div className='layout-99th__form'>
        <Input
          placeholder='Enter description'
          onChange={({ target: { value } }) =>
            setFormData({ ...formData, description: value })
          }
          value={formData.description}
          className='w-100 mb-4'
          multiline
        />
        <Input
          placeholder='Enter challenge'
          onChange={({ target: { value } }) =>
            setFormData({ ...formData, challenge: value })
          }
          value={formData.challenge}
          className='w-100  mb-4'
          multiline
        />
        <Input
          placeholder='Enter answer'
          onChange={({ target: { value } }) =>
            setFormData({ ...formData, answer: value })
          }
          value={formData.answer}
          className='w-100  mb-4'
          multiline
        />
        <div className='d-flex align-items-center justify-content-start gap-2'>
          <ion-icon name='flame-outline' />
          <Input
            placeholder='Enter difficulty'
            onChange={({ target: { value } }) =>
              setFormData({ ...formData, difficulty: Number(value) })
            }
            value={formData.difficulty}
            className='mb-4'
            type='number'
          />
        </div>
        <div className='d-flex align-items-center justify-content-start gap-2'>
          <ion-icon name='time-outline' />
          <Input
            placeholder='Enter time limit'
            onChange={({ target: { value } }) =>
              setFormData({ ...formData, timer: Number(value) })
            }
            value={formData.timer}
            className='mb-4'
            type='number'
          />
        </div>

        <button className='bg-nu color-alpha' onClick={handleAddNewTask}>
          <ion-icon name='add-outline' />
        </button>
      </div>
      <IfElse condition={tasks.length === 0}>
        <div className='layout-99th__empty'>
          <Thumbnail
            alt='A Purple rooky looking into an empty box'
            className='w-100'
            src={ShroodEmpty}
          />
          <p className='text-center'>There are no tasks!</p>
        </div>
        <div className='layout-99th__tasks'>
          {tasks.map((task) => (
            <TaskCard
              handleDelete={handleDeleteTask}
              key={task.id}
              task={task}
            />
          ))}
        </div>
      </IfElse>
    </div>
  );
};
