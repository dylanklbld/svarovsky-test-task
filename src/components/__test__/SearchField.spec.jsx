import "@testing-library/jest-dom"

import { fireEvent, render, wait } from '@testing-library/react'

import React from 'react'
import { SimpleSearchField } from '../SearchField'

it('should render', () => {
    const { container } = render(<SimpleSearchField onSearchRequestDone={() => { }} />)

    expect(container).toMatchSnapshot()
})


it('should call onSearchRequestDone', async () => {
    const onSearchRequestDone = jest.fn().mockName('onSearchRequestDone')
    const { container } = render(<SimpleSearchField onSearchValueChanged={onSearchRequestDone} />)
    await wait()
    expect(container).toMatchSnapshot()

    const inputField = container.querySelector('.test-search-input-field')
    fireEvent.change(inputField, { target: { value: 'kase' } })

    await new Promise(resolve => setTimeout(resolve, 300))

    expect(onSearchRequestDone).toHaveBeenCalledWith("kase")
})