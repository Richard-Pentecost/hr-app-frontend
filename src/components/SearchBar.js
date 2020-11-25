import React from 'react';
import SearchBox from '@govuk-react/search-box'
// import Layout from '@govuk-react/layout';
import GridRow from '@govuk-react/grid-row';
import GridCol from '@govuk-react/grid-col';

const SearchBar = ({ setSearchField, placeholder, heading }) => {

    const onSearchChange = (e) => {
        setSearchField(e.target.value); 
    };

    return (
        <>
            <GridRow>
                <GridCol>
                    {heading}
                </GridCol>
                <GridCol>
                    <SearchBox
                        style={{width:'100%'}} 
                        type='search'
                        placeholder={placeholder}
                        onChange={onSearchChange} 
                    />
                </GridCol>
            </GridRow>
        </>
    )
};
    
export default SearchBar;