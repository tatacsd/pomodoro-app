import styled from 'styled-components';

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`;
export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;

    min-width: 600px;

    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem; /* 14px */
      line-height: 1.6rem; /* 24px */

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1rem;
      }

      &:last-child {
        border-bottom-left-radius: 8px;
        padding-right: 1rem;
      }
    }

    td {
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      background-color: ${(props) => props.theme['gray-700']};
      padding: 1rem;
      font-size: 0.875rem; /* 14px */
      line-height: 1.6rem; /* 24px */

      &:first-child {
        width: 50%;
        border-top-left-radius: 8px;
      }

      &:last-child {
        border-bottom-left-radius: 8px;
      }
    }
  }
`;

const STATUS_COLORS = {
  completed: 'green-500',
  interrupted: 'red-500',
  inProgress: 'yellow-500',
} as const;
interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS;
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]};
  }
`;
