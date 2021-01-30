import React from "react";
import { Grid, Icon, Segment, } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { counter: 0, dropDownType: [], phase: 1, activeCluster: "", activeClusterData: [] }
  }


  componentDidMount() {
    //network call their to fetch dropdown types
    setTimeout(() => {
      this.setState({
        dropDownType: [{ label: "North Cluster" }, { label: "South Cluster" },
        { label: "East Cluster" }, { label: "West Cluster" }]
      })
    }, 500)
  }

  openActiveCluster = (label) => {
    this.setState({
      activeCluster: label,
      phase: 2,
      activeClusterData: [
        {
          blockName: "hello1",
          jobs: 10,
          address: "Singapore"
        },
        {
          blockName: "hello3",
          jobs: 11,
          address: "India"
        }
      ]
    })
  }


  render() {
    return (<div style={{ marginTop: "30px" }}>
      <Grid container stackable>
        <Grid.Column >
          {this.state.phase === 1 && <>
            {this.state.dropDownType.length > 0 && this.state.dropDownType.map(x => {
              return (
                <Segment class="ui top aligned">{x.label}
                  <button onClick={() => this.openActiveCluster(x.label)} class="ui right floated button"><Icon name="angle double right" /></button> </Segment>
              )
            })}</>
          }
          {
            this.state.phase === 2 && <>
              <button onClick={() => this.setState({
                activeCluster: "",
                phase: 1,
                activeClusterData: []
              })}>Back</button>
              {this.state.activeCluster}
              {this.state.activeClusterData.length > 0 && this.state.activeClusterData.map(x => {
                return (
                  <Segment class="ui top aligned">{x.blockName}
                    <br />
                    {`${x.jobs} jobs in it`}
                    <button class="ui right floated button"><Icon name="angle double right" /></button> </Segment>
                )
              })}
            </>
          }
        </Grid.Column>
      </Grid>
    </div >)
  }
}

export default App;
