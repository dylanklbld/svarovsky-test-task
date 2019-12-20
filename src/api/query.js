
const API = 'https://latency-dsn.algolia.net/1/indexes/*/'
const apiKey = '6be0576ff61c053d5f9a3225e2a90f76'
const applicationId = 'latency'


// curl 'https://latency-dsn.algolia.net/1/indexes/*/queries?x-algolia-api-key=6be0576ff61c053d5f9a3225e2a90f76&x-algolia-application-id=latency' 
// --data '{"requests":[{"indexName":"ikea","params":"query=cheese&hitsPerPage=16"}]}'

const defaultOptions = {
  page: 1,
  perPage: 16
}


export const searchRequest = async (queryText, handleSetData, options = defaultOptions) => {
  try {
    return await fetch(
      `${API}queries?` + new URLSearchParams({
        'x-algolia-api-key': apiKey,
        'x-algolia-application-id': applicationId
      }),
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          requests: [{
            indexName: 'ikea',
            params: `query=${queryText}&hitsPerPage=${options.perPage}&page=${options.page}`
          }]
        })
      }
    ).then(response => {
      if (response.status >= 400 && response.status < 600) {
        throw new Error("Bad response from server");
      }

      return response.json()
    })
      .then(response => {
        handleSetData && handleSetData(response)
        return response
      })
      .catch(error => {
        console.log("ERROR")
        throw error
      })
  } catch (err) {
    throw err
  }
}