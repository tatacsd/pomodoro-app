import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { CyclesContext } from '../../../../contexts/CyclesContext';
import { FormContainer, MinutesAmountInput, TaskInput } from './styles';

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">Work on:</label>
      <TaskInput
        type="text"
        id="task"
        placeholder="What are you working on?"
        list="tasks-suggestions"
        disabled={!!activeCycle}
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

      <label htmlFor="minutesAmount">For how long?</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        min={1}
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
        disabled={!!activeCycle}
      />
      <span>minutes.</span>
    </FormContainer>
  );
}
