import React, {useState} from 'react'

import useDebounce from '../hooks/useDebounce'
import useEffectExceptMount from '../hooks/useEffectExceptMount'

//  After there is a change in the field, wait for 200ms
const debounce = 200

export const SimpleSearchField = ({onSearchValueChanged}) => {
    const [searchValue,
        setSearchValue] = useState('')
    const debouncedSearchValue = useDebounce(searchValue, debounce)

    useEffectExceptMount(() => {
        debouncedSearchValue && onSearchValueChanged(debouncedSearchValue)
    }, [debouncedSearchValue])

    return <React.Fragment>
        <div className="test-search-field">
            <span>search icon</span>
            <input
                type="text"
                className="test-search-input-field"
                placeholder="Search for a product"
                value={searchValue}
                onChange={(e) => {
                setSearchValue(e.target.value)
            }}/>
            <div></div>
        </div>
    </React.Fragment>
}
