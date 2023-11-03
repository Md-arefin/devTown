import { useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import styled from 'styled-components';
import './App.css'

function App() {
  const [products, setProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const productsPerPage = 9;

  useEffect(() => {

    fetch('data.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setProductsData(data)
      })

  }, []);

  // page calculations
  const totalPages = Math.ceil(productsData.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = productsData.slice(startIndex, endIndex);

  // data for categories
  const categoryData = products?.map(product => product.category);
  const uniqueCategoryData = ["All", ...new Set(categoryData)];
  // console.log(['uniqueCategoryData'], uniqueCategoryData);

  const handleCategory = category => {
    // console.log(category);

    if (category !== "All") {
      const filterCategory = products.filter((product) => product.category === category)
      setProductsData(filterCategory);
    } else {
      setProductsData(products)
    }
    // handlePrice();
    setCurrentPage(1);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrice = (PriceRange) => {

    if (PriceRange === '0-150') {
      const filteredProducts = productsData.filter((product) => product.price >= 0 && product.price <= 150);
      setProductsData(filteredProducts)

    } else if (PriceRange === '150-400') {
      const filteredProducts = productsData.filter((product) => product.price >= 150 && product.price <= 400);
      setProductsData(filteredProducts)

    } else if (PriceRange === 'over400') {
      const filteredProducts = productsData.filter((product) => product.price > 400);
      setProductsData(filteredProducts)

    } else if (PriceRange === 'all') {
      setProductsData(products)
    }

  };


  // Style component
  const AppContainer = styled.div`
  text-align: center;
  margin: 2rem 0;

  h1{
    font-size: 3rem;
    font-weight: bold;
  }

  @media (max-width: 576px) {
    width: 374px;
    h1{
      font-size: 1.5rem;
      font-weight: bold;
    }
  }

  @media (min-width: 577px) and (max-width: 768px) {
    width:  750px;
    h1{
      font-size: 2.5rem;
      font-weight: bold;
    }
  }
`;

  const InputContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;

  @media (max-width: 576px) {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  }
`;

  const Input = styled.input`
  border: 1px solid ;
  border-radius: 10px;
  width: 30vw;
  padding: 20px 15px;

  @media (max-width: 576px) {
    width: 80vw;
  }

  @media (min-width: 577px) and (max-width: 768px) {
    width: 50vw;
  }
`;

  const SearchButton = styled.button`
  background-color: #000;
  color: #fff;
  width: 10rem;
  padding: 10px;
  border-radius: 10px;
  font-size: 2rem;

  @media (max-width: 576px) {
    width: 8rem;
    padding: 10px 15px;
    border-radius: 10px;
    font-size: 20px;
  }

  
`;

  const DataContainer = styled.div`
display: flex;
direction: row
gap: 2rem;

@media (max-width: 576px) {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
`;


  // position: sticky;
  // top: 0px;
  const CategoryContainer = styled.div`
  width: 18rem;
  height: 57rem;
  grid-template-columns: 1fr;
  padding: 1rem ;
  margin: 0 1rem 0 0;


  @media (max-width: 576px) {
    width: 90%;
    margin: 0 .1rem;
    padding: 1rem ;
  }

  @media (min-width: 577px) and (max-width: 768px) {
    width: 18rem;
    margin: 0 .1rem;
    padding: .5rem ;
    position: sticky;
    top: 0px;
  }
  `;

  const CategoryHeading = styled.p`
  text-align: center;
  font-size: 2rem;
  font-weight: semibold;
  margin-bottom: 1rem;
`;

  const CategoryItem = styled.p`
  margin-top: 20px;
  text-align: left;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 15px 25px;
  cursor: pointer;
`;

  const ProductContainer = styled.div`

`;

  const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 576px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: 577px) and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;


  const PriceRangeContainer = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

  const PriceRangeHeading = styled.p`
  font-size: 2rem;
  font-weight: semibold;
  margin: 1rem 0 0 0;
`;

  const PriceRangeForm = styled.form`
  padding: 2px;
`;

  const PriceRangeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 25px;
  height: 30px
  
`;

  const PriceRangeInput = styled.input`
  margin-right: 1px;
`;

  const PriceRangeLabel = styled.p`
  font-size: 20px;
`;

  const ProductCard = styled.div`
  width: 29rem;
  margin: 2rem;
  padding-bottom: 1rem;
  border-radius: 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);

  .ProductImage{
    border-radius: 16px 16px 0 0;
    width: 100%;
  }

  .productTitle{
  font-size: 25px;
  padding: 10px 5px
  }

  p{
    text-align: left; 
    padding: 5px 15px;

    span{
      font-size:22px;
      font-weight: semibold;
      padding-right:15px;
    }
  }


  @media (max-width: 576px) {
    width: 90vw;
    margin: 10px;
  }
  
`;

  const Ratings = styled.p`
  display: flex;
  align-items: center;
  gap: 5px;
`;

  const Pagination = styled.p`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  

  p{
  border-radius: 50px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 15px 18px;
  margin: 0 15px;
  background-color: rgb(203 213 225);
}

@media (max-width: 576px) {
  p{
    padding: 5px 8px;
    margin: 0 5px;
  }
}
`;



  return (
    <AppContainer>
      <h1>Welcome to DevTown</h1>
      <InputContainer>
        <Input type="text" placeholder="Type here" />
        <SearchButton>Search</SearchButton>
      </InputContainer>

      <DataContainer className="dataContainer">
        <CategoryContainer>
          <CategoryHeading>Category</CategoryHeading>

          {uniqueCategoryData.map((data, i) => (
            <CategoryItem key={i} onClick={() => handleCategory(data)}>
              {data}
            </CategoryItem>
          ))}
          <PriceRangeContainer>
            <PriceRangeHeading>Price</PriceRangeHeading>

            <PriceRangeForm>

              <PriceRangeItem>
                <PriceRangeInput
                  type="radio"
                  name="price-range"
                  value="all"
                  checked={selectedPriceRange === 'all'}
                  onChange={() => setSelectedPriceRange('all')}
                  onClick={() => handlePrice("all")}
                />
                <PriceRangeLabel>ALL</PriceRangeLabel>
              </PriceRangeItem>

              <PriceRangeItem>
                <PriceRangeInput
                  type="radio"
                  name="price-range"
                  value="0-150"
                  checked={selectedPriceRange === '0-150'}
                  onChange={() => setSelectedPriceRange('0-150')}
                  onClick={() => handlePrice("0-150")}
                />
                <PriceRangeLabel>$0 - $150</PriceRangeLabel>
              </PriceRangeItem>

              <PriceRangeItem>
                <PriceRangeInput
                  type="radio"
                  name="price-range"
                  value="150-400"
                  checked={selectedPriceRange === '150-400'}
                  onChange={() => setSelectedPriceRange('150-400')}
                  onClick={() => handlePrice("150-400")}
                />
                <PriceRangeLabel>$150 - $400</PriceRangeLabel>
              </PriceRangeItem>

              <PriceRangeItem>
                <PriceRangeInput
                  type="radio"
                  name="price-range"
                  value="over400"
                  checked={selectedPriceRange === 'over400'}
                  onChange={() => setSelectedPriceRange('over400')}
                  onClick={() => handlePrice('over400')}
                />
                <PriceRangeLabel>Over $400</PriceRangeLabel>
              </PriceRangeItem>

            </PriceRangeForm>

          </PriceRangeContainer>
        </CategoryContainer>

        <ProductContainer>
          {currentProducts.length >= 1 ? (
            <ProductGrid>

              {currentProducts.map((product, i) => (
                <ProductCard key={i}>
                  <img src={product.img} className='ProductImage' alt="" />
                  <h1 className='productTitle'>{product.name}</h1>
                  <p>
                    <span className=''>Category:</span>
                    {product.category}
                  </p>

                  <p>
                    <span className=''>Seller:</span>
                    {product.seller}
                  </p>
                  <p>
                    <span className=''>Stock:</span> {product.stock}
                  </p>
                  <p>
                    <span className=''>Price:</span> ${product.price}
                  </p>
                  <Ratings className=''>
                    <span className=''>Ratings:</span> {product.ratings}<Rating
                      style={{ maxWidth: 100 }}
                      value={product.ratings}
                      readOnly
                    />
                  </Ratings>
                </ProductCard>
              ))}
            </ProductGrid>
          ) : (
            <p>There is No products</p>
          )}
        </ProductContainer>
      </DataContainer>

      <Pagination className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            onClick={() => handlePageChange(index + 1)} >
            <p >{index + 1}</p>
          </div>
        ))}
      </Pagination>

    </AppContainer>

  )
}

export default App;
