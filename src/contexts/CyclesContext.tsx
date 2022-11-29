import { createContext, ReactNode, useReducer, useState } from 'react';
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions';
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer';

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CycleContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleID: string | null;
  secondsCountdown: number;
  setSecondsCountdown: React.Dispatch<React.SetStateAction<number>>;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCycle: () => void;
  markCurrentCycleAsFinished: () => void;
}

export const CyclesContext = createContext({} as CycleContextType);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CycleContextProvider({ children }: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleID: null,
  });

  const [secondsCountdown, setSecondsCountdown] = useState(0);
  const { cycles, activeCycleID } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleID);

  const createNewCycle = (data: CreateCycleData) => {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedAt: new Date(),
    };
    dispatch(addNewCycleAction(newCycle));
    setSecondsCountdown(0);
  };

  const interruptCycle = () => {
    dispatch(interruptCurrentCycleAction());
  };

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleID,
        secondsCountdown,
        setSecondsCountdown,
        createNewCycle,
        interruptCycle,
        cycles,
        markCurrentCycleAsFinished,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
