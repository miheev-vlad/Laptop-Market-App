import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Product from '../components/Product';
import './HomeScreen.css';
import { getPaginProducts as paginListProducts } from '../redux/actions/productActions';
import Loader from '../components/loader/Loader';
import Backdrop from '../components/Backdrop';
import Pagination from '../components/Pagination';
import SearchField from '../components/searcher/SearchField';

const HomeScreen = () => {
  const [page, setPage] = useState(localStorage.getItem('currentPage') ? JSON.parse(localStorage.getItem('currentPage')) : 1);
  const setCurrentPage = (currPage) => {
    setPage(currPage);
    localStorage.setItem('currentPage', JSON.stringify(currPage));
  }
  const dispatch = useDispatch();
  const getPaginProducts = useSelector(state => state.getPaginProducts);
  const { products, loading, error, pages } = getPaginProducts;
  useEffect(() => {
    dispatch(paginListProducts(page));
  }, [page])
  const [sideSearch, setSideSearch] = useState(false);
  return (
    <div className="homescreen">
      <Backdrop show={sideSearch} click={() => setSideSearch(false)} />
      <SearchField show={sideSearch} click={() => setSideSearch(false)} />
      <button className="searchBtn" onClick={() => setSideSearch(true)}>
        <i className="fas fa-search"></i>
      </button>
      {!loading && <Pagination page={page} pages={pages ? pages : 1} changePage={setCurrentPage} />}
      <div className="homescreen_products">
        {loading ? <Loader /> : error ? <h2 className="error_text">{error}</h2> : (
          products.map((product) => (
            <Product
              key={product._id}
              imageUrl={product.images}
              name={product.model}
              price={product.price}
              description={product.description}
              productId={product._id}
            />
          ))
        )}
      </div>
      {!loading && <Pagination page={page} pages={pages ? pages : 1} changePage={setCurrentPage} />}
    </div>
  )
}

export default HomeScreen;
