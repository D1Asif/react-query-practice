import { useState } from 'react'
import './App.css'
import AddProduct from './components/AddProduct'
import ProductDetails from './components/ProductDetails'
import ProductList from './components/ProductList'

function App() {
  const [selectedProductId, setSelectedProductId] = useState('1');
  return (
    <div className='flex'>
      <AddProduct />
      <ProductList handleClick={setSelectedProductId} />
      <ProductDetails selectedProductId={selectedProductId} />
    </div>  
  )
}

export default App
