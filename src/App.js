import React from 'react'
import {
  Header,
  Button,
  Segment,
  Card,
  Icon
} from 'semantic-ui-react'
import styled from 'styled-components'
import { HeaderText } from './Typography'

const AppContainer = styled.div`
  background: linear-gradient(to bottom right, aliceblue, black);
`

const Transparent = styled(Segment)`
  background: transparent !important;
`

const App = () => (
  <AppContainer>
    <HeaderText fSize="large">My Portfolio</HeaderText>
    <Transparent>
      <HeaderText>My Projects</HeaderText>
    </Transparent>
    <Transparent>
      <HeaderText fSize="small">Contact</HeaderText>
    </Transparent>
  </AppContainer>
)

export default App

