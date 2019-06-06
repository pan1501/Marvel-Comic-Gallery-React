import React from "react";
import logo from "../main-logo.svg";
import lineBackground from "../line-background.svg"
import styled from "@emotion/styled";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchContainer = styled.div`
    display:flex;
    flex-direction: column;
    background-image: url("${lineBackground}");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 95%;
`
const LogoContainer = styled.div`
    flex: 1;
    width: 66px;
    margin: auto;
    padding: 50px;
`

const SearchBarContainer = styled.div`
    flex: 1;
`
const SearchBar =styled.input`
    width: 100%;
    padding: 12px 24px;
    background-color: white;
    font-size: 14px;
    line-height: 18px;
    border-radius: 1.5rem;
    border: 1px solid white;
    ::placeholder{
        color: lightgreen;
    }
    ::-webkit-search-decoration,
    ::-webkit-search-cancel-button,
    ::-webkit-search-results-button,
    ::-webkit-search-results-decoration {
        display: none;
    }

`

const SearchButton = styled.div`
    vertical-align: middle;
    margin-left: -30px;
    border: none;
    display: inline-block;
    color: lightgreen;
`

export default class SearchSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: null
        };
    }

    updateSearchInput(inputValue) {
        this.passSearchedValueToParent(inputValue.target.value);
    }

    passSearchedValueToParent = (searchedValue) => {
        this.props.callbackFromParent(searchedValue)
    }

    render() {
        return (
            <SearchContainer>
                <LogoContainer>
                    <img src={logo} alt="main-logo"/>
                </LogoContainer>
                <SearchBarContainer >
                    <SearchBar type="search" placeholder="Search..." onChange={inputValue => this.updateSearchInput(inputValue)} />
                    <SearchButton>
                        <FontAwesomeIcon icon={faSearch} />
                    </SearchButton>
                </SearchBarContainer>
            </SearchContainer>
        )
    }
}