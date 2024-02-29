import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios";
import { useState } from "react"

export default function AddProduct() {
  const [state, setState] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 5,
    thumbnail: ""
  })

  const queryClient = useQueryClient();

  const {mutate, isError, isSuccess, error} = useMutation({
    mutationFn: async (addProduct) => {
      const response = await axios.post(`http://localhost:3000/products`, addProduct)
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"])
    }
  });

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const productToAdd = {
      ...state,
      id: crypto.randomUUID().toString()
    }
    mutate(productToAdd);
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="p-5 w-1/5 hidden lg:block sticky left-0 h-screen top-0 border rounded-md">
      <h2 className="text-3xl pb-4 font-bold">Add Product</h2>
      {isSuccess && <p className="py-2 text-green-400">Product added!</p>}
      <form action=""
        className="flex flex-col"
        onSubmit={handleSubmit}
      >
        <input
          className="p-2 mb-3"
          type="text"
          name="title"
          value={state.title}
          placeholder="Add product title"
          onChange={handleChange}
        />
        <textarea
          className="p-2 mb-3"
          type="text"
          name="description"
          value={state.description}
          placeholder="Add product description"
          onChange={handleChange}
        />
        <input
          className="p-2 mb-3"
          type="number"
          name="price"
          value={state.price}
          placeholder="Add product price"
          onChange={handleChange}
        />
        <input
          className="p-2 mb-3"
          type="text"
          name="thumbnail"
          value={state.thumbnail}
          placeholder="Add product thumbnail"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="p-2 bg-gray-900 hover:bg-gray-800 text-white rounded-md"
        >
          Add
        </button>
      </form>
    </div>

  )
}
