import React, { Component } from "react";
// import axios from 'axios';
import styled from "@emotion/styled";
import SearchSection from "./components/SearchSection";
import PopulerMovieSection from "./components/PopulerMovieSection";
import "./App.css";

const PopularMovieTitle = styled("div")`
  margin-top: 12px;
`
class App extends Component {

  render() {
    return (
      <div className="App">
        <SearchSection/>
        <PopularMovieTitle>Popular Movies</PopularMovieTitle>
        <PopulerMovieSection/>
      </div>
    );

  }
}

export default App;
