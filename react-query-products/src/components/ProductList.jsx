/* eslint-disable react/prop-types */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react";

async function fetchProducts({ queryKey }) {
  const response = await axios.get(`http://localhost:3000/${queryKey[0]}?_page=${queryKey[1]}&_per_page=6`);
  return response.data;
}

export default function ProductList({ handleClick }) {
  const [page, setPage] = useState(1);

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products", page],
    queryFn: fetchProducts
  })

  const queryClient = useQueryClient();

  const { mutate, isSuccess } = useMutation({
    mutationFn: async (deleteProductId) => {
      const response = await axios.delete(`http://localhost:3000/products/${deleteProductId}`)
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"])
    }
  })

  function handleDelete(deleteProductId) {
    mutate(deleteProductId);
  }

  if (isLoading) {
    return <div>
      Fetching data...
    </div>
  }

  if (error) {
    return <div>
      `Error: ${error.message}`
    </div>
  }

  return (
    <div className="pt-5 pl-3 w-3/5 flex ">
      <div >
        <h2 className="text-3xl p-2 font-bold">Product List</h2>
        {isSuccess && <p className="py-2 text-green-400">Product deleted!</p>}
        <ul className="flex flex-wrap">
          {
            products?.data?.length && products.data.map((product) => (
              <li key={product.id}
                className="p-4 border rounded-md m-3 md:w-1/3 min-w-60"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="rounded-md object-cover h-60 w-60"
                />
                <p className="text-xl pt-2 text-wrap">{product.title}</p>
                <p className="text-xl pb-2 font-semibold">Price: ${product.price}</p>
                <button
                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md mt-2 mr-2"
                  onClick={() => handleClick(product.id)}
                >
                  Details
                </button>
                <button
                  className="p-2 bg-red-400 hover:bg-red-500 rounded-md mt-2 text-white"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </li>
            ))
          }
        </ul>
        <div className="flex justify-center p-5">
          <button
            className="p-2 rounded-md bg-blue-700 text-white hover:bg-blue-600 disabled:bg-slate-400"
            disabled={!products?.prev}
            onClick={() => setPage(products.prev)}
          >
            Prev
          </button>
          <button
            className="p-2  ml-2 rounded-md bg-blue-700 text-white hover:bg-blue-600 disabled:bg-gray-300"
            disabled={!products?.next}
            onClick={() => setPage(products.next)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
