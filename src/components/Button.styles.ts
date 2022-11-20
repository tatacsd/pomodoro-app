import styled from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContainerProps {
  variant: ButtonVariant;
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green',
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 50px;
  border-radius: 5px;
  border: none;
  margin: 10px;

  /* get the color from the theme */
  background-color: ${(props) => props.theme.primary};

  /* background-color: ${(props) => buttonVariants[props.variant]}; */
`;
