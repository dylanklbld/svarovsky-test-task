import React, { useEffect, useState } from 'react'

import { ResultTableWrapper } from '../components/Table/ResultTable'
import {SimpleSearchField} from '../components/SearchField'
import {searchRequest} from '../api/query'

export const SearchViewComponent = ()=>{
    const [searchRequestFunction, setSearchRequestFunction] = useState(null)
    const [query, setQuery] = useState('')

    const changeSearchRequestFunction = (query)=>{
        setSearchRequestFunction((setSearchResultData, options) => {
            return async(setSearchResultData, options) => searchRequest(query, setSearchResultData, options)
        })
        setQuery(query)
    }

    return <React.Fragment>
            <SimpleSearchField onSearchValueChanged={changeSearchRequestFunction}/>
            {searchRequestFunction && 
                <ResultTableWrapper key={query} 
                    title={"Search results"}
                    handleFetchDataChunck={searchRequestFunction} />}
        </React.Fragment>
}