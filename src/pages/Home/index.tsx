import { zodResolver } from '@hookform/resolvers/zod';
import { HandPalm, Play } from 'phosphor-react';
import { createContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as zod from 'zod';
import { Countdown } from './components/Countdown';
import { NewCycleForm } from './components/NewCycleForm';
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles';

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startedAt: Date;
  interruptedAt?: Date;
  finishedAt?: Date;
}
export interface CycleContextType {
  activeCycle: Cycle | undefined;
  activeCycleID: string | null;
  setCycles: React.Dispatch<React.SetStateAction<Cycle[]>>;
  secondsCountdown: number;
  setSecondsCountdown: React.Dispatch<React.SetStateAction<number>>;
}

const newCycleFormValidationSchema = zod.object({
  task: zod
    .string()
    .min(3, 'Task name must have at least 3 characters')
    .max(30, 'Task name must have at most 30 characters'),
  minutsAmount: zod
    .number()
    .int()
    .min(1, 'Minutes amount must be at least 1')
    .max(60, 'Minutes amount must be at most 60'),
});

export type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export const CycleContext = createContext({} as CycleContextType);

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleID, setActiveCycleID] = useState<string | null>(null);
  const [secondsCountdown, setSecondsCountdown] = useState(0);
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutsAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const task = watch('task');
  const isSubmitDisabled = !task;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID);

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

  const handleInterruptCycle = () => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleID) {
          return {
            ...cycle,
            interruptedAt: new Date(),
          };
        }
        return cycle;
      })
    );
    setActiveCycleID(null);
  };

  console.log('cycles', cycles);
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CycleContext.Provider
          value={{
            activeCycle,
            activeCycleID,
            setSecondsCountdown,
            secondsCountdown,
            setCycles,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CycleContext.Provider>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interrupt
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
