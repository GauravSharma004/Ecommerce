import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { callAPI } from "../utils/CallApi";
import {ProductDetails} from "./index";
import { GB_CURRENCY } from "../utils/constants";
import { useDispatch } from "react-redux";
import {addToCart} from '../redux/cartSlice'

function ProductPage(){
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState("1")

    useEffect(() => {
        callAPI(`data/products.json`)
        .then((productResults) => {
            setProduct(productResults[id])
        })
    }, [id])

    const addQuantityToProduct = () => {
        // Create a copy of the product and add the updated quantity
        const updatedProduct = {
            ...product,
            quantity: parseInt(quantity) // Ensure quantity is an integer
        };
        
        // Dispatch the updated product to the cart
        dispatch(addToCart(updatedProduct));
    };
    

    if(!product?.title) return <h1>Loading Product ...</h1>
    return(
        product &&   
        <div className="h-screen bg-amazonclone-background">
            <div className="min-w-[1000px] m-auto max-w-[1500px] p-4">
                <div className="grid grid-cols-10 gap-2">
                    {/* Left */}
                    <div className="col-span-3 p-8 rounded bg-white m-auto">
                        <img src={`${product.image}`} alt = "Main Product"/>
                    </div>
                    {/* Middle */}
                    <div className="col-span-5 p-4 rounded bg-white divide-y divide-gray-400">
                    <div className="mb-3">
                <ProductDetails product={product} ratings={true} />
              </div>
              <div className="text-left text-base xl:text-lg mt-3">
                {product.description}
              </div>
                    </div>
                    {/* Right */}
                    <div className="col-span-2 p-4 rounded bg-white">
                    <div className="text-xl xl:text-2xl text-red-700 text-right font-semibold">
                        {GB_CURRENCY.format(product.price)}
                    </div>
                    <div className="text-base xl:text-lg text-gray-500 text-right font-semibold">
                       MRP: {" "}
                        <span className="line-through">
                        {GB_CURRENCY.format(product.oldPrice)}
                        </span>
                       
                    </div>
                    <div className="text-left text-sm xl:text-base text-blue-500 font-semibold mt-3">
                FREE Returns
              </div>
              <div className="text-left text-sm xl:text-base text-blue-500 font-semibold mt-1">
                FREE Delivery
              </div>
              <div className="text-left text-base xl:text-lg text-green-700 font-semibold mt-1">
                In Stock
              </div>
              <div className="text-left text-base xl:text-lg mt-1">
                Quantity:
                <select onChange={(e) => setQuantity(e.target.value)}
                className="p-2 bg-white border rounded-md focus:border-indigo-600">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>

                </select>
                </div>
                <Link to = {"/checkout"}>
                <button onClick={addQuantityToProduct}
                className="bg-yellow-400 w-full p-3 text-xs xl:text-sm rounded hover:bg-yellow-500
                mt-3">Add To Cart</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage