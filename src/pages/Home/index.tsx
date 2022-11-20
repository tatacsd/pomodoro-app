import { Play } from 'phosphor-react';
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles';

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Work on:</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="What are you working on?"
            list="tasks-suggestions"
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
            step={5}
            min={5}
            max={60}
          />
          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit">
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
