import React from 'react'
import {
  Header,
  Button,
  Segment,
  Card,
  Icon,
  Grid,
} from 'semantic-ui-react'
import styled from 'styled-components'
import axios from 'axios'
import { HeaderText } from './Typography'

const AppContainer = styled.div`
  background: linear-gradient(to bottom right, aliceblue, black);
`

const Transparent = styled(Segment)`
  background: transparent !important;
`

const StyledCard = styled(Card)`
  height: 200px;
`

const Truncated = styled.div`
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

class App extends React.Component {
  state = { repos: [] }

  componentDidMount() {
    //this.getRepos()
  }

  getRepos = () => {
    axios.get('https://api.github.com/users/wdjungst/repos?sort=create')
      .then( res => this.setState({ repos: res.data }) )
  }

  render() {
    return (
      <AppContainer>
        <Button onClick={this.getRepos}>Get Repos</Button>
        <HeaderText fSize="large">My Portfolio</HeaderText>
        <Transparent>
          <HeaderText>My Projects</HeaderText>
          <Grid>
            <Grid.Row>
              { this.state.repos.map( r =>
                  <Grid.Column key={r.id} width={4}>
                    <StyledCard>
                      <Card.Content>
                        <Card.Header>
                          <Truncated>
                            { r.full_name }
                          </Truncated>
                        </Card.Header>
                        <Card.Meta>
                          <Truncated>
                            { r.description }
                          </Truncated>
                        </Card.Meta>
                      </Card.Content>
                    </StyledCard>
                  </Grid.Column>
                )
              }
            </Grid.Row>
          </Grid>
        </Transparent>
        <Transparent>
          <HeaderText fSize="small">Contact</HeaderText>
        </Transparent>
      </AppContainer>
    )
  }
}

export default App

