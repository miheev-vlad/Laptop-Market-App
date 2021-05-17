import './Pagination.css';

const Pagination = ({ page, pages, changePage }) => {
  const middlePagination = [...Array(pages)].map((_, idx) => (
    <button
      key={idx + 1}
      onClick={() => changePage(idx + 1)}
      disabled={page === idx + 1}
    >
      {idx + 1}
    </button>
  ))
  return pages > 1 && (
    <div className="pagination">
      <button
        className="pagination_prev"
        onClick={() => changePage(page - 1)}
        disabled={page === 1}
      >&#171;</button>
      {middlePagination}
      <button
        className="pagination_next"
        onClick={() => changePage(page + 1)}
        disabled={page === pages}
      >&#187;</button>
    </div>
  )
}

export default Pagination
