import { formatDistanceToNow } from 'date-fns';
import { useContext } from 'react';
import { CyclesContext } from '../../contexts/CyclesContext';
import { HistoryContainer, HistoryList, Status } from './styles';

export function History() {
  const { cycles } = useContext(CyclesContext);
  return (
    <HistoryContainer>
      <h1>History</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>task</th>
              <th>duration</th>
              <th>start</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutes</td>
                <td>
                  {formatDistanceToNow(new Date(cycle.startedAt), {
                    addSuffix: true,
                  })}
                </td>
                <td>
                  {cycle.interruptedAt && (
                    <Status statusColor="interrupted">interrupted</Status>
                  )}
                  {cycle.finishedAt && (
                    <Status statusColor="completed">completed</Status>
                  )}
                  {!cycle.interruptedAt && !cycle.finishedAt && (
                    <Status statusColor="inProgress">in progress</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
