import React, { Component } from "react";
import styled from "@emotion/styled";
import SearchSection from "./components/SearchSection";
import PopulerMovieSection from "./components/PopulerMovieSection";
import MovieDetailSection from "./components/MovieDetailSection";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
      showDetail: false
    };
  }
  
  getSearchedValue = (dataFromSearch) => {
    this.setState({ searchedValue: dataFromSearch });
  }

  getShowDetailStatus = (showDetail, selectedMovie, searchedValue) => {
    this.setState({showDetail: showDetail});
    this.setState({selectedMovie: selectedMovie});
    this.setState({searchedValue: searchedValue});
  }

  RenderMovieSectionOrDetailSection = (getSearchedValue, searchedValue, getShowDetailStatus, showDetail, selectedMovie) => {
    let render = null;
    if (showDetail && selectedMovie) {
      render = <MovieDetailSection selectedMovie={selectedMovie} showDetailStatusCallBack={getShowDetailStatus}/>
    }
    return render;
  }

  render() {
    return (
      <Router className="App">
        <Route exact path="/" render={() => {
          return(
          <PopularMoviesContainer>
            <SearchSection callbackFromParent={this.getSearchedValue}/>
            <PopularMovieTitle><strong>Popular Movies</strong></PopularMovieTitle>
            <PopulerMovieSection searchedValue={this.state.searchedValue} showDetailStatusCallBack={this.getShowDetailStatus}/>
          </PopularMoviesContainer>
        )}}/>
        {this.RenderMovieSectionOrDetailSection(this.getSearchedValue, this.state.searchedValue, this.getShowDetailStatus, this.state.showDetail, this.state.selectedMovie)}
      </Router>
    );

  }
}

export default App;
