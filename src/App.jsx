import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    price: '',
    size: '',
    category: '',
  });

  useEffect(() => {

    fetch('data.json')
      .then(res => res.json())
      .then(data => {
        setFilteredProducts(data)
        setProducts(data)
      })

  }, []);
  let categoryData = products?.map(product => product.category);

  categoryData = ["All", ...new Set(categoryData)]

  return (
    <>
      <p>Dev Town: {products.length}</p>
      <h1>
        {
          categoryData
        }
      </h1>
    </>
  )
}

export default App
