import { useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import './App.css'

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetch('data.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
      })

  }, []);

  let categoryData = products?.map(product => product.category);
  categoryData = ["All", ...new Set(categoryData)];

  console.log(['categoryData'], categoryData);

  const handleCategory = category => {
    console.log(category);
  }
  // Style component


  return (

    <>
      <h1 className='text-center text-3xl font-semibold my-5'>Welcome to DevTown</h1>
      <div className='flex flex-row gap-10'>

        <div className='w-1/2 h-[450px] grid grid-cols-1 px-10 sticky top-[10px]'>
          {
            categoryData.map((data, i) =>
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
            products?.map((product, i) =>
              <div key={i} className='rounded-lg w-full m-2 pb-5 border-2'>
                <img src={product.img} className='rounded-t-lg mx-auto' alt="" />
                <h1 className='font-semibold text-center py-2 text-2xl '>{product.name}</h1>
                <div className='py-1 pl-5'>
                  <p><span className='text-xl'>category:</span> {product.category}</p>
                  <p><span className='text-xl'>seller:</span> {product.seller}</p>
                  <p><span className='text-xl'>stock:</span> {product.stock}</p>
                  <p><span className='text-xl'>shipping:</span> ${product.shipping}</p>
                  <p><span className='text-xl'>Price:</span> ${product.price}</p>
                  <p className='flex gap-3 items-center '><span className='text-xl'>ratings:</span> {product.ratings}<Rating
                    style={{ maxWidth: 100 }}
                    value={product.ratings}
                    readOnly
                  />
                  </p>
                </div>
              </div>)
          }
        </div>
      </div>
    </>

  )
}

export default App
