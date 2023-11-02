import { useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import './App.css'

function App() {
  const [products, setProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  useEffect(() => {

    fetch('data.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setProductsData(data)
      })

  }, []);

  const totalPages = Math.ceil(productsData.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = productsData.slice(startIndex, endIndex);

  const categoryData = products?.map(product => product.category);
  const uniqueCategoryData = ["All", ...new Set(categoryData)];

  // console.log(['uniqueCategoryData'], uniqueCategoryData);

  const handleCategory = category => {
    console.log(category);

    if (category !== "All") {
      const filterCategory = products.filter((product) => product.category === category)
      setProductsData(filterCategory);
    } else {
      setProductsData(products)
    }

    setCurrentPage(1);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  // Style component


  return (

    <>
      <h1 className='text-center text-3xl font-semibold my-5'>Welcome to DevTown</h1>
      <div className='flex flex-row gap-10'>

        <div className='w-72 h-[450px] grid grid-cols-1 px-10 sticky top-[10px]'>
          {
            uniqueCategoryData.map((data, i) =>
              <h5 key={i}
                className='my-2 border-2 rounded-lg py-1 px-5 cursor-pointer'
                onClick={() => handleCategory(data)}
              >
                {data}
              </h5>)
          }
        </div>

        <div className='grid grid-cols-3 gap-5'>
          {
            currentProducts?.map((product, i) =>
              <div key={i} className='rounded-lg w-96 m-2 pb-5 border-2'>
                <img src={product.img} className=' rounded-t-lg mx-auto' alt="" />
                <h1 className='font-semibold text-center py-2 text-2xl '>{product.name}</h1>
                <div className='py-1 pl-5'>
                  <p><span className='text-xl'>category:</span> {product.category}</p>
                  <p><span className='text-xl'>seller:</span> {product.seller}</p>
                  <p><span className='text-xl'>stock:</span> {product.stock}</p>
                  <p><span className='text-xl'>Price:</span> ${product.price}</p>
                  <p className='flex gap-3 items-center '><span className='text-xl'>ratings:</span> {product.ratings}<Rating
                    style={{ maxWidth: 100 }}
                    value={product.ratings}
                    readOnly
                  />
                  </p>
                </div>
              </div>
              )}
        </div>

      </div>

      <div className="pagination text-center my-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button  ${currentPage === index + 1 ? 'active' : ''
              }`}
          >
            <p className='border-2 px-5 mx-2'>{index + 1}</p>
          </button>
        ))}
      </div>
    </>

  )
}

export default App
