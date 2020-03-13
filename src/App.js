import React, { useEffect, useState, useRef } from 'react'

function App() {
  const BASE_URL = 'http://hn.algolia.com/api/v1/search?query'
  const [results, setResults] = useState([])
  const [query, setQuery] = useState('react')
  const [loading, isLoading] = useState(false)
  const [error, setError] = useState('')
  const [url, setUrl] = useState(`${BASE_URL}=${query}`)
  const searchFieldRef = useRef()

  useEffect(() => {
    const getResults = async () => {
      isLoading(true)
      try {
        console.log('Fetching results...')
        const response = await fetch(url)
        const result = await response.json()
        setResults(result.hits)
      } catch (err) {
        setError(err.message)
      } finally {
        isLoading(false)
      }
    }
    getResults()
  }, [url])

  const handleChange = e => {
    e.preventDefault()
    setUrl(`${BASE_URL}=${query}`)
  }

  const clearSearch = () => {
    setQuery('')
    searchFieldRef.current.focus()
    setResults([])
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Google Hook News</h1>
        <p className="subtitle">Finding the tech news</p>
        <nav className="panel">
          <p className="panel-heading">what are you looking for?</p>
          <form onSubmit={handleChange}>
            <div className="column is-full">
              <div className="field has-addons">
                <p className="control is-expanded has-icons-left">
                  <input
                    className="input"
                    type="text"
                    placeholder="Search"
                    ref={searchFieldRef}
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-search"></i>
                  </span>
                </p>
                <div className="control">
                  <button type="submit" className="button is-primary">
                    search
                  </button>
                </div>
              </div>
            </div>
          </form>
          {error && <h3>{error}</h3>}
          {loading ? (
            <div>Loading results...</div>
          ) : (
            results.map(result => (
              <a
                href={result.url}
                className="panel-block"
                key={result.objectID}
              >
                {result.title}
              </a>
            ))
          )}
          <div className="panel-block">
            <button
              onClick={clearSearch}
              className="button is-link is-outlined is-fullwidth"
            >
              Clear the results
            </button>
          </div>
        </nav>
      </div>
    </section>
  )
}

export default App
