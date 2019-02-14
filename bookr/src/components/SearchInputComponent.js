import React from 'react';
import styled from 'styled-components';

const SearchBoxContainer = styled.div`
`;

const SearchInput = styled.input`
  margin: 10px 15px;

`;


const SearchInputComponent = props => {
  return(
      <SearchBoxContainer>
        <SearchInput
        type="text"
        onChange={props.updateSearch}
        name="searchInput"
        value={props.searchInput}/>
        <button onClick={props.getBookByTitle}/>
        </SearchBoxContainer>
    )
}

export default SearchInputComponent;