import React from "react";
import {ProductBadge, ProductRatings} from "./index";

function ProductDetails({product, ratings}){
    return (
        <div className="mb-1">
            <div className="text-left text-xl xl:text-2xl font-medium mb-1">{product.title}</div>
            <div className="text-left text-sm xl:text-base mb-1">by <span className="text-blue-500">{product.brand}</span></div>
                {ratings && (
            <div className="text-left text-sm xl:text-base mb-1">
                <ProductRatings avgRating = {product.avgRating} 
                        ratings = {product.ratings}
                        />
            </div>
                )}
            <div className="text-left text-sm xl:text-base mb-1">{product.attribute}</div>
            <div className="text-left"><ProductBadge badge = {product.badge} /></div>

        </div>
    )
}

export default ProductDetails