import styled from 'styled-components';

const fontSize = (size) => {
  switch(size) {
    case 'large':
      return '4rem';
    case 'small':
      return '1rem';
    default:
      return '2rem';
  }
}

export const HeaderText = styled.h1`
  color: white !important;
  text-align: center;
  font-size: ${props => fontSize(props.fSize)} !important;
`

export const Paragraph = styled.p`
  color: blue;
`

