import styled from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonVariant
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 50px;
  border-radius: 5px;
  border: none;
  margin: 10px;

  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};
`
