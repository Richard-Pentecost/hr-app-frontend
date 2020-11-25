import React from 'react';
import SearchBox from '@govuk-react/search-box'
import Layout from '@govuk-react/layout';
import GridRow from '@govuk-react/grid-row';
import GridCol from '@govuk-react/grid-col';

const SearchBar = ({ setSearchField, placeholder }) => {

    const onSearchChange = (e) => {
        setSearchField(e.target.value); 
    };

    return (
        <>
          <Layout>
              <GridRow>
                  <GridCol style={{display:'flex', justifyContent:'flex-end', paddingRight:'25px'}}>
                  <SearchBox
                      style={{width:'30%'}} 
                      type='search'
                      placeholder={placeholder}
                      onChange={onSearchChange} 
                      />
                  </GridCol>
              </GridRow>
          </Layout>
      </>
    )
};
    
export default SearchBar;