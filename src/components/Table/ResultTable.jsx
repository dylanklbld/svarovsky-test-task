import '../../styles/table.css'

import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import ScrollToTopButton from '../ScrollToButton'
import useEffectExceptMount from '../../hooks/useEffectExceptMount'
import { useIsInView } from '../../hooks/useIsInVIew'

const defaultOptions = {
    perPage: 16
}

export const ResultTableWrapper = ({ title, handleFetchDataChunck, options = defaultOptions }) => {
    const [chunckData, setChunckData] = useState(null)
    const [fullData, setFullData] = useState([])
    const [page, setPage] = useState(1)
    const [isBusy, setIsBusy] = useState(false)

    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        handleFetchDataChunck(setChunckData)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffectExceptMount(() => {
        if (chunckData && chunckData.results) {
            const results = chunckData.results[0]
            setTotalPages(results.nbPages)
            setFullData(fullData.concat(results.hits))
        }
    }, [chunckData])


    return fullData && <ResultTableComponent {...{ title, isBusy }}
        data={fullData}
        renderLoadingButton={() => {
            return page < totalPages ? <button disabled={isBusy} onClick={async () => {
                setIsBusy(true)
                setPage(page + 1)
                await handleFetchDataChunck(setChunckData, Object.assign({ page: page + 1 }, options))
                setIsBusy(false)
            }}>Load more...</button> : <div>Done</div>
        }} />
}

ResultTableWrapper.propTypes = {
    title: PropTypes.string,
    handleFetchDataChunck: PropTypes.func.isRequired
}

export const ResultTableComponent = ({ title, data, renderLoadingButton, isBusy = false }) => {
    const [renderToTopButton, setRenderToTopButton] = useState(false)
    const [refTopDiv, inView] = useIsInView()

    React.useEffect(() => {
        setRenderToTopButton(!inView)
    }, [inView])

    return data ? <React.Fragment>
        <div ref={refTopDiv} />
        <table>
            <caption>{title}</caption>
            <thead>
                <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Overview</th>
                    <th scope="col">Price</th>
                    <th scope="col">Rating</th>
                </tr>
            </thead>
            <tbody>
                {data.map((value) => {
                    const productId = value ? value['ikea_id'] : 0
                    return <tr key={productId}>
                        <td data-label="Product">

                            <div className="container">
                                <div className="product"><img
                                    className="fit-picture"
                                    src={`${value.image}`}
                                    alt={value['name']} /></div>
                            </div>

                        </td>
                        <td data-label="Overview">{value.description}</td>
                        <td data-label="Price">{value.price}</td>
                        <td data-label="Rating">{value.rating}</td>
                    </tr>
                })}
            </tbody>
        </table>
        {isBusy && <div>BUSY STATE</div>}
        {renderLoadingButton && renderLoadingButton()}
        {renderToTopButton && <ScrollToTopButton />}

    </React.Fragment> : <div>"No data"</div>
}

ResultTableComponent.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    handleFetchDataChunck: PropTypes.func.isRequired
}
