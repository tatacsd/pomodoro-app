import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { CycleContext } from '../..';
import { FormContainer, MinutesAmountInput, TaskInput } from './styles';

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext);
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

      <label htmlFor="minutsAmount">For how long?</label>
      <MinutesAmountInput
        type="number"
        id="minutsAmount"
        placeholder="00"
        min={1}
        max={60}
        {...register('minutsAmount', { valueAsNumber: true })}
        disabled={!!activeCycle}
      />
      <span>minutes.</span>
    </FormContainer>
  );
}
