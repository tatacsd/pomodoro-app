import { HistoryContainer, HistoryList, Status } from './styles';

export function History() {
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
            <tr>
              <td>task 1</td>
              <td>1h</td>
              <td>10:00</td>
              <td>
                <Status statusColor="completed"> Done </Status>
              </td>
            </tr>
            <tr>
              <td>task 1</td>
              <td>1h</td>
              <td>10:00</td>
              <td>
                <Status statusColor="completed"> Done </Status>
              </td>
            </tr>
            <tr>
              <td>task 1</td>
              <td>1h</td>
              <td>10:00</td>
              <td>
                <Status statusColor="completed"> Done </Status>
              </td>
            </tr>
            <tr>
              <td>task 1</td>
              <td>1h</td>
              <td>10:00</td>
              <td>
                <Status statusColor="completed"> Done </Status>
              </td>
            </tr>
            <tr>
              <td>task 1</td>
              <td>1h</td>
              <td>10:00</td>
              <td>
                <Status statusColor="completed"> Done </Status>
              </td>
            </tr>
            <tr>
              <td>task 1</td>
              <td>1h</td>
              <td>10:00</td>
              <td>
                <Status statusColor="completed"> Done </Status>
              </td>
            </tr>
            <tr>
              <td>task 1</td>
              <td>1h</td>
              <td>10:00</td>
              <td>
                <Status statusColor="completed"> Done </Status>
              </td>
            </tr>
            <tr>
              <td>task 1</td>
              <td>1h</td>
              <td>10:00</td>
              <td>
                <Status statusColor="completed"> Done </Status>
              </td>
            </tr>
            <tr>
              <td>task 1</td>
              <td>1h</td>
              <td>10:00</td>
              <td>
                <Status statusColor="completed"> Done </Status>
              </td>
            </tr>
            <tr>
              <td>task 1</td>
              <td>1h</td>
              <td>10:00</td>
              <td>
                <Status statusColor="completed"> Done </Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}