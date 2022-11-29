import { ActionTypes } from './actions';

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startedAt: Date;
  interruptedAt?: Date;
  finishedAt?: Date;
}

export interface CyclesState {
  cycles: Cycle[];
  activeCycleID: string | null;
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleID: action.payload.newCycle.id,
      };
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleID) {
            return {
              ...cycle,
              interruptedAt: new Date(),
            };
          }
          return cycle;
        }),
        activeCycleID: null,
      };
    case ActionTypes.MAKE_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleID) {
            return {
              ...cycle,
              finishedAt: new Date(),
            };
          }
          return cycle;
        }),
        activeCycleID: null,
      };
    default:
      return state;
  }
}
