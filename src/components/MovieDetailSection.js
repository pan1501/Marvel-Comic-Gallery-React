import React from "react";
import styled from "@emotion/styled";
import axios from 'axios';
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Route, Link, useParams } from "react-router-dom";

const Background = styled("div")(({ url }) => `
    background-image: url(https://image.tmdb.org/t/p/original${url});
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
    height: 250px;
    width: 100%
`)
const BackButton = styled("div")`
    position: absolute;
    top: 35px;
    left: 24px;
    color: #FFFFFF;
    font-size:20px;
    cursor: pointer;
`
const TitleSection = styled("div")`
    padding: 20px;
    display:flex;
    justify-content: space-evenly;
`

const OtherInfo = styled("div")`
    color: #B8D8E6;
    margin-top:12px;

`
const ProfilePicContainer = styled("div")`
    margin-top: -70px;
`
const ProfilePic = styled("div")(({ url }) => `
    background-image: url(https://image.tmdb.org/t/p/original${url});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 140px;
    height: 215px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5), 0px 8px 16px rgba(0, 0, 0, 0.5), 0px 16px 32px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
`);

const DetailSection = styled("div")(({ url }) => `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-left: 18px;
    @media only screen and (max-width: 414px) {
        align-items: baseline;
    }
`)


const Title = styled("div")`
    font-size: 28px;
    color: #E3F4FC;
`
const Seperater = styled("div")`
    margin: 30px 20px;
    border: 1px solid #0F303D;
    box-sizing: border-box;
`
const OverviewSection = styled("div")`
    padding: 20px;
`
const Header = styled("div")`
    font-weight: bold;
    font-size: 20px;
    text-align: left;
    color: #E3F4FC;
`
const Body = styled("div")`
    font-size: 16px;
    margin-top:12px;
    text-align: left;
    color: #9FBBC7;
`
export default class MovieDetailSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieDetail: null
        };
    }

    componentDidMount() {
        let movieId = window.location.pathname.split("/")[2];
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=6ed12e064b90ae1290fa326ce9e790ff&language=en-US`).then(res => {
            this.setState({ movieDetail: res.data })
        })
    }

    RenderMovieDetails = (movieDetail) => {
        let details = <div></div>

        if (movieDetail) {
            const score = +movieDetail.vote_average * 10;
            const release_year = moment(movieDetail.release_date, "YYYY-MM-DD").format("YYYY")
            const runtimeHours = Math.floor(movieDetail.runtime/60);
            const runtimeMin = Math.floor((movieDetail.runtime/60 - runtimeHours) * 60)
            details =  <Route exact path={`/movies/${movieDetail.id}`} render={() => (
            <div>
                <Background url={movieDetail.backdrop_path}/>
                <Link to="/">
                    <BackButton>
                        <FontAwesomeIcon icon={faArrowLeft}/>
                    </BackButton>
                </Link>
                <TitleSection>
                    <ProfilePicContainer>
                        <ProfilePic url={movieDetail.poster_path}/>
                    </ProfilePicContainer>
                    <DetailSection>
                        <Title>
                            <strong>
                                {movieDetail.title}
                            </strong>
                        </Title>
                        <OtherInfo>
                            {`${release_year} `}
                            <span>
                                &#183;
                            </span>
                            {` ${score}% User score ${runtimeHours}h ${runtimeMin}min`}
                            <br/>
                        </OtherInfo>
                    </DetailSection>
                </TitleSection>
                <Seperater/>
                <OverviewSection>
                    <Header>
                        Overview
                    </Header>
                    <Body>
                        {movieDetail.overview}
                    </Body>
                </OverviewSection>
            </div>
            )}/>
        }
        return details
    }

    render() {
        return (
            this.RenderMovieDetails(this.state.movieDetail)
        )
    }
}