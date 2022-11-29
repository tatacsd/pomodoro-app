import { differenceInSeconds } from 'date-fns';
import { useContext, useEffect } from 'react';
import { CyclesContext } from '../../../../contexts/CyclesContext';
import { CountdownContainer, Separator } from './styles';

export function Countdown() {
  const {
    activeCycle,
    markCurrentCycleAsFinished,
    activeCycleID,
    secondsCountdown,
    setSecondsCountdown,
  } = useContext(CyclesContext);

  const totalActiveSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle
    ? totalActiveSeconds - secondsCountdown
    : 0;

  const minutesLeft = String(Math.floor(currentSeconds / 60)).padStart(2, '0');
  const secondsLeft = String(currentSeconds % 60).padStart(2, '0');

  // countdown
  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startedAt)
        );

        if (secondsDifference >= totalActiveSeconds) {
          // finish cycle
          markCurrentCycleAsFinished();

          setSecondsCountdown(totalActiveSeconds);
          clearInterval(interval);
        } else {
          setSecondsCountdown(secondsDifference);
        }
      }, 1000);
    }

    // cleanup
    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    totalActiveSeconds,
    activeCycleID,
    markCurrentCycleAsFinished,
  ]);

  // Document title with active cycle task
  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutesLeft}:${secondsLeft} - ${activeCycle.task}`;
    }
  }, [minutesLeft, secondsLeft]);
  return (
    <CountdownContainer>
      <span>{minutesLeft[0]}</span>
      <span>{minutesLeft[1]}</span>
      <Separator>:</Separator>
      <span>{secondsLeft[0]}</span>
      <span>{secondsLeft[1]}</span>
    </CountdownContainer>
  );
}
