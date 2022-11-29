import { createContext, ReactNode, useState } from 'react';

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startedAt: Date;
  interruptedAt?: Date;
  finishedAt?: Date;
}
interface CycleContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleID: string | null;
  setCycles: React.Dispatch<React.SetStateAction<Cycle[]>>;
  secondsCountdown: number;
  setSecondsCountdown: React.Dispatch<React.SetStateAction<number>>;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCycle: () => void;
}

export const CyclesContext = createContext({} as CycleContextType);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CycleContextProvider({ children }: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleID, setActiveCycleID] = useState<string | null>(null);
  const [secondsCountdown, setSecondsCountdown] = useState(0);
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID);

  const createNewCycle = (data: CreateCycleData) => {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedAt: new Date(),
    };
    setCycles((state) => [...state, newCycle]);
    setActiveCycleID(newCycle.id);
    setSecondsCountdown(0);
  };

  const interruptCycle = () => {
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
  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleID,
        setCycles,
        secondsCountdown,
        setSecondsCountdown,
        createNewCycle,
        interruptCycle,
        cycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
