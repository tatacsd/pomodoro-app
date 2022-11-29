import { zodResolver } from '@hookform/resolvers/zod';
import { differenceInSeconds } from 'date-fns';
import { Play } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles';

const newCycleFormValidationSchema = zod.object({
  task: zod
    .string()
    .min(3, 'Task name must have at least 3 characters')
    .max(30, 'Task name must have at most 30 characters'),
  minutsAmount: zod
    .number()
    .int()
    .min(5, 'Minutes amount must be at least 5')
    .max(60, 'Minutes amount must be at most 60'),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startedAt: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleID, setActiveCycleID] = useState<string | null>(null);
  const [secondsCountdown, setSecondsCountdown] = useState(0);
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutsAmount: 0,
    },
  });

  const task = watch('task');
  const isSubmitDisabled = !task;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID);
  const totalActiveSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle
    ? totalActiveSeconds - secondsCountdown
    : 0;

  const minutesLeft = String(Math.floor(currentSeconds / 60)).padStart(2, '0');
  const secondsLeft = String(currentSeconds % 60).padStart(2, '0');

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        setSecondsCountdown(
          differenceInSeconds(new Date(), activeCycle.startedAt)
        );
      }, 1000);
    }

    // cleanup
    return () => {
      clearInterval(interval);
    };
  }, [activeCycle]);

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutsAmount,
      startedAt: new Date(),
    };
    setCycles((state) => [...state, newCycle]);
    setActiveCycleID(newCycle.id);
    setSecondsCountdown(0);

    reset();
  };

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Work on:</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="What are you working on?"
            list="tasks-suggestions"
            {...register('task')}
          />

          <datalist id="tasks-suggestions">
            <option value="Front-end development" />
            <option value="Back-end development" />
            <option value="Mobile development" />
            <option value="UI/UX design" />
            <option value="Marketing" />
            <option value="Writing" />
            <option value="Reading" />
            <option value="Learning" />
          </datalist>

          <label htmlFor="minutsAmount">For how long?</label>
          <MinutesAmountInput
            type="number"
            id="minutsAmount"
            placeholder="00"
            min={5}
            max={60}
            {...register('minutsAmount', { valueAsNumber: true })}
          />
          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutesLeft[0]}</span>
          <span>{minutesLeft[1]}</span>
          <Separator>:</Separator>
          <span>{secondsLeft[0]}</span>
          <span>{secondsLeft[1]}</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
