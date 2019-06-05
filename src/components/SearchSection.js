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

// function keyUpHandler(SearchInput, e) {
//     debugger;
// }
export default class SearchSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: null
        };
    }

    updateSearchInput(inputValue) {
        this.setState({ searchInput: inputValue.target.value });
    }

    render() {
        return (
            <SearchContainer>
                <Logo src={logo} alt="main-logo"/>
                <SearchBarContainer >
                    <SearchBar type="search" placeholder="Search..." onChange={inputValue => this.updateSearchInput(inputValue)} />
                    <SearchButton>
                        <SearchIcon src={searchIcon} alt="search-icon"/>
                    </SearchButton>
                </SearchBarContainer>
            </SearchContainer>
        )
    }
}