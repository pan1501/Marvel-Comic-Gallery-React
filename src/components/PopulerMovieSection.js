import React from "react";
import axios from 'axios';
import styled from "@emotion/styled";
import moment from "moment";

const MoviesContainer = styled("div")`
    display: grid;
    // grid-template-columns: repeat(2, minmax(auto, auto));
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 30px;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: space-evenly;
    padding: 15px;
`
const MovieContainer = styled("div")`
    height: 300px;
`

const MovieBackground = styled("div")(({ url }) => `
    background-image: url(https://image.tmdb.org/t/p/w185_and_h278_bestv2${url});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    box-shadow: 0 6px 10px -4px rgba(0,0,0,1);
    height: 250px;
    border-radius: 0.7rem;
    cursor: pointer;
    .green{
        background-color: lightgreen;
    }
    .purple{
        background-color: purple;
    }
    .red {
        background-color: red;
    }
`)

const Score = styled("div")`
    
    color: white;
    border-radius: 1.5rem;
    width: 15%;
    padding: 3px 8px;
    font-size: 12px;
    top: 4px;
    left: 4px;
    position: relative;

`
const MovieTitle = styled("div")`
    margin-top:12px;
    font-size: 14px;
    text-align: left;
`

const MovieDate = styled("div")`
    margin-top: 6px;
    font-size: 12px;
    text-align: left;
`
function directToNewPage() {

}
const RenderMovies = (movies) => {
    let eachMovie = null;
    if (movies !== null) {
        eachMovie = movies.map((movie) => {
            const score = +movie.vote_average * 10;
            let colorClass = "green";

            if (score < 70) {
                colorClass = "purple";
            }
            if (score < 50) {
                colorClass = "red";
            }

            const dateFormat = moment(movie.release_date, "YYYY-MM-DD").format("MMM YYYY")

           return (
            <MovieContainer key={movie.title}>
                <MovieBackground
                    onClick={directToNewPage()}
                    url={movie.backdrop_path}>
                    <Score className={colorClass}>{`${score}%`}</Score>
                </MovieBackground>
                <MovieTitle>
                    {movie.title}
                </MovieTitle>
                <MovieDate>
                    {dateFormat}
                </MovieDate>
            </MovieContainer>
           )
        });
    }
    return (eachMovie);

}
export default class PopulerMovieSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: null
        };
    }
  
    componentDidMount() {
        // axios.get('https://api.themoviedb.org/3/authentication/token/new?api_key=6ed12e064b90ae1290fa326ce9e790ff').then(res => {
        //     axios.post(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=6ed12e064b90ae1290fa326ce9e790ff`, {
        //         "username": "jumboFED",
        //         "password": "jumbofrontendcodeproject",
        //         "request_token": `${res.data.request_token}`
        //       })
        //     .then(res => {
        //        console.log(res);
        //     })
        // })
        axios.get("https://api.themoviedb.org/3/movie/popular?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US&page=1").then(res => {
            this.setState({ movies: res.data.results })
        })
    }
    
    render() {
        
        return (
            <MoviesContainer>
                {RenderMovies(this.state.movies)}
            </MoviesContainer>
        )
    }
}