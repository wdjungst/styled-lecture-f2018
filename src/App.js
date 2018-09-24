import React from 'react'
import {
  Header,
  Button,
  Segment,
  Card,
  Icon,
  Grid,
} from 'semantic-ui-react'
import styled, { keyframes } from 'styled-components'
import axios from 'axios'
import { HeaderText } from './Typography'

const SearchBox = styled.input.attrs({
  placeholder: 'search',
  id: 'myInput',
})`
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
`
const ButtonLink = styled.a`
  float: right;
  padding: 10px 30px;
  border-radius: 10px;
  color: ${ props => props.theme.fg } !important;
  background-color: ${ props => props.theme.bg };
`

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Star = styled.div`
  display: inline-block;
  color: yellow;
  text-shadow: 1px 1px 1px black;
  animation: ${rotate360} 2s linear infinite;
`

const AppContainer = styled.div`
  background: linear-gradient(to bottom right, aliceblue, black);
`

const Transparent = styled(Segment)`
  background: transparent !important;
`

const StyledCard = styled(Card)`
  height: 200px;
`

const IssueCard = styled(StyledCard)`
  border: solid 3px red !important;
`

const Truncated = styled.div`
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

class App extends React.Component {
  state = { repos: [], visible: [] }

  componentDidMount() {
    //this.getRepos()
  }

  getRepos = () => {
    axios.get('https://api.github.com/users/wdjungst/repos?sort=create')
      .then( res => this.setState({ repos: res.data, visible: res.data }) )
  }

  search = () => {
    const regex = new RegExp(this.searchTerm.value.toLowerCase())
    const { repos } = this.state
    if (this.searchTerm.value === '') {
      this.setState({ visible: repos })
    } else {
      const found = repos.filter( r => regex.test(r.full_name.toLowerCase()) )
      this.setState({ visible: found })
    }
  }

  render() {
    return (
      <AppContainer>
        <Button onClick={this.getRepos}>Get Repos</Button>
        <label>Search</label>
        <SearchBox 
          onChange={this.search} 
          innerRef={ domNode => this.searchTerm = domNode }
        />
        <HeaderText fSize="large">My Portfolio</HeaderText>
        <Transparent>
          <HeaderText>My Projects</HeaderText>
          <Grid>
            <Grid.Row>
              { this.state.visible.map( r => {
                    const TheCard = r.open_issues > 0 ? IssueCard : StyledCard
                    return (
                      <Grid.Column key={r.id} width={4}>
                        <TheCard>
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
                            { r.stargazers_count > 0 &&
                                <Star>
                                  <Icon name="star" />
                                </Star>
                            }
                          </Card.Content>
                          <Card.Content extra>
                            <ButtonLink
                              href={r.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                            </ButtonLink>
                          </Card.Content>
                        </TheCard>
                      </Grid.Column>
                    )
                  }
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

