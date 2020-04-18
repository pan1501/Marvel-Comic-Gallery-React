import React, { Component } from "react";
import styled from "@emotion/styled";
import SearchSection from "./components/SearchSection";
import PopulerMovieSection from "./components/PopulerMovieSection";
import MovieDetailSection from "./components/MovieDetailSection";
import { BrowserRouter as Router, Route, Switch, useParams } from "react-router-dom";
import "./App.css";

const PopularMoviesContainer = styled("div")`
  padding: 0 17px;
`

const PopularMovieTitle = styled("div")`
  margin-top: 44px;
  text-align: left;
  font-size: 20px;
  color: #E3F4FC;
`
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedValue: null,
      selectedMovie: null,
    };
  }

  getSearchedValue = (dataFromSearch) => {
    this.setState({ searchedValue: dataFromSearch });
  }

  getShowDetailStatus = (selectedMovie, searchedValue) => {
    this.setState({selectedMovie: selectedMovie});
    this.setState({searchedValue: searchedValue});
  }

  render() {
    return (
      <Router className="App">
        <Switch>
          <Route exact path="/">
            <PopularMoviesContainer>
              <SearchSection callbackFromParent={this.getSearchedValue}/>
              <PopularMovieTitle><strong>Popular Movies</strong></PopularMovieTitle>
              <PopulerMovieSection searchedValue={this.state.searchedValue} showDetailStatusCallBack={this.getShowDetailStatus}/>
            </PopularMoviesContainer>
          </Route>
          <Route path="/movies">
            <MovieDetailSection />
          </Route>
        </Switch>
      </Router>
    );

  }
}

export default App;
