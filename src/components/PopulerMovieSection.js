import React from "react";
import axios from 'axios';
import styled from "@emotion/styled";
import moment from "moment";
import { Route, Link } from "react-router-dom"

const MoviesContainer = styled("div")`
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(150px,1fr));
    grid-gap: 30px;
    justify-content: baseline;
    margin-top: 12px;
`

const MovieBackground = styled("div")(({ url }) => `
    background-image: url(https://image.tmdb.org/t/p/original${url});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5), 0px 8px 16px rgba(0, 0, 0, 0.5), 0px 16px 32px rgba(0, 0, 0, 0.5);
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
    text-align: center;
`
const MovieTitle = styled("div")`
    margin-top:12px;
    font-size: 14px;
    text-align: left;
    color: #E6F7FF;
`

const MovieDate = styled("div")`
    margin-top: 6px;
    font-size: 12px;
    text-align: left;
    color: #A1D1E6;
`

export default class PopulerMovieSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: null,
            movieClicked: null,
            renderDetails: false
        };
    }
  
    componentWillMount() {
        axios.get("https://api.themoviedb.org/3/movie/popular?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US").then(res => {
            this.setState({ movies: res.data.results });
        })
    }
 
    RenderMovies = (movies, searchedValue) => {
        let eachMovie = null;
        if (!movies) return;
        eachMovie = movies.map((movie) => {
            var render;
            if (searchedValue === null || movie.title.includes(searchedValue)) {
                const score = +movie.vote_average * 10;
                movie.user_score = score;

                let colorClass = "green";
    
                if (score < 70) {
                    colorClass = "purple";
                }
                if (score < 50) {
                    colorClass = "red";
                }
    
                const dateFormat = moment(movie.release_date, "YYYY-MM-DD").format("MMM YYYY");
                render = <Route key={movie.title} exact path={`/`}  render={() => (
                    <div >
                        <Link to={`/movies/${movie.id}`}>
                            <MovieBackground
                                url={movie.poster_path}>
                                <Score className={colorClass}>{`${score}%`}</Score>
                            </MovieBackground>
                            <MovieTitle>
                                {movie.title}
                            </MovieTitle>
                            <MovieDate>
                                {dateFormat}
                            </MovieDate>
                        </Link>
                    </div>
                )}/>
            }
            return render;
        });
    
        return (eachMovie);
    }



    render() {
        return (
            <MoviesContainer>
                {this.RenderMovies(this.state.movies, this.props.searchedValue)}
            </MoviesContainer>
        )
    }
}