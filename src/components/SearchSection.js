import React from "react";
import axios from 'axios';
import logo from "../main-logo.svg";
import searchIcon from "../search-icon.svg"
import styled from "@emotion/styled";

const SearchContainer = styled.div`
    display:flex;
    flex-direction: column;
`
const Logo = styled.img`
    flex: 1;
    padding: 100px;
`

const SearchBarContainer = styled.div`
    flex: 1;
`
const SearchBar =styled.input`
    width: 90%;
    padding: 12px 24px;
    background-color: white;
    font-size: 14px;
    line-height: 18px;
    color: #575756;
    border-radius: 1.5rem;
    border: 1px solid;
`

const SearchButton = styled.button`
    vertical-align: middle;
    margin-left: -50px;
    border: none;
`

const SearchIcon = styled.img`
`
export default class SearchSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: null,
            movies: null
        };
    }
    
    componentDidMount() {
        axios.get('https://api.themoviedb.org/3/authentication/token/new?api_key=6ed12e064b90ae1290fa326ce9e790ff').then(res => {
            axios.get(`https://www.themoviedb.org/authenticate/${res.data.request_token}?redirect_to=http://www.yourapp.com/approved`).then(res => {
                console.log(res)
            })
        })
    }
    
    render() {
        return (
            <SearchContainer>
                <Logo src={logo} alt="main-logo"/>
                <SearchBarContainer >
                    <SearchBar type="search" placeholder="Search..." />
                    <SearchButton>
                        <SearchIcon src={searchIcon} alt="search-icon"/>
                    </SearchButton>
                </SearchBarContainer>
            </SearchContainer>
        )
    }
}