/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query"
import axios from "axios"


export default function ProductDetails({ selectedProductId }) {
  const { data: selectedProduct, error, isLoading } = useQuery({
    queryKey: ["products", selectedProductId],
    queryFn: async ({ queryKey }) => {
      const response = await axios.get(`http://localhost:3000/${queryKey[0]}/${selectedProductId}`)
      return response.data;
    }
  });


  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (isLoading) {
    return <div>Fetching product details...</div>
  }


  return (
    <div className="relative pt-10">
      <div className="w-1/5 p-3 hidden lg:block fixed right-10 border rounded-md">
      <h2 className="text-3xl pb-4 font-bold">Product Details</h2>
      {
        selectedProduct &&
        <>
          <img
            src={selectedProduct.thumbnail}
            alt={selectedProduct.title}
            className="rounded-md object-cover h-60 w-60"
          />
          <p className="text-2xl pt-3 font-semibold">{selectedProduct.title}</p>
          <p className="text-xl pt-3">{selectedProduct.description}</p>
          <p className="text-xl pt-3 font-semibold">Rating: {selectedProduct.rating}/5</p>
          <p className="text-xl pt-3 font-semibold">Price: ${selectedProduct.price}</p>
        </>
      }
    </div>
    </div>
  )
}
