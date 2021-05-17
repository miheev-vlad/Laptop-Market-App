import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchField.css';

const SearchField = ({ show, click }) => {
  const sideSearchClass = ['sidesearch'];
  if (show) {
    sideSearchClass.push('show');
  }
  const [search, setSearch] = useState('')
  const [suggestDetails, setSuggestDetails] = useState(null)
  const [loadSerch, setLoadSerch] = useState(false)
  const fetchSuggestion = (query) => {
    setLoadSerch(true)
    setSearch(query)
    fetch('/api/products/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    })
      .then((res) => res.json())
      .then((results) => {
        setLoadSerch(false)
        setSuggestDetails(results.product)
      })
  }
  useEffect(() => {
    setSearch('')
  }, [])
  return (
    <div className={sideSearchClass.join(' ')}>
      <input
        className="search_input"
        type="text"
        placeholder="search model"
        value={search}
        onChange={(e) => fetchSuggestion(e.target.value)}
      />
      {suggestDetails && !loadSerch && suggestDetails.length === 0 && search && <span>Nothing was found...</span>}
      {!loadSerch && !search && <span>Enter a value to search</span>}
      {loadSerch && <div className="loader"></div>}
      <div className="search_container">
        {suggestDetails && !loadSerch && suggestDetails.length > 0 && search && (suggestDetails.map((item) => {
          return (
            <div key={item._id} className="search_results">
              <Link
                to={`/product/${item._id}`}
                onClick={() => {
                  setSearch('')
                  setSuggestDetails(null)
                }}
                className="search_link"
              >
                {item.model}
              </Link>
            </div>) 
          }))}
        </div>
    </div>
  )
};

export default SearchField;