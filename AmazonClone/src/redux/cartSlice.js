import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  productNumber: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
        const addProductExists = state.products.find((product) => product.id === action.payload.id)
        console.log("Product added")

        if(addProductExists){
          addProductExists.quantity += parseInt(action.payload.quantity)
          console.log("addProductExists")
        }
        else{
          console.log("addProductNotExists")
            state.products.push({
              ...action.payload, 
              quantity: parseInt(action.payload.quantity)
            })
        }
        state.productNumber = state.productNumber + parseInt(action.payload.quantity)
    },
    removeFromCart: (state, action) => {
      //Find the product removing from the array
      const productToRemove = state.products.find((product) => product.id === action.payload)
      //remove the quantity from product number
      state.productNumber = state.productNumber - productToRemove.quantity
      //Find index of the product removing
      const index = state.products.findIndex((product) => product.id === action.payload)
      //remove from the array
      state.products.splice(index, 1)
    },

    incrementInCart: (state, action) => {
      //Find the item to increase in the array
      const itemInc = state.products.find((item) => item.id === action.payload)
      //Increse The quantity
      if(itemInc.quantity >= 1){
        itemInc.quantity = itemInc.quantity + 1
      }

      //increase the quantity in porductNumber
      state.productNumber = state.productNumber + 1
    },

    decrementInCart: (state, action) => {
      //Find the item to decrease in the array
      const itemDec = state.products.find((item) => item.id === action.payload)

      //Decrease the quantity
      if(itemDec.quantity === 1){
        const index = state.products.findIndex((item) => item.id === action.payload)
        state.products.splice(index, 1)
      }
      else{
        itemDec.quantity--
      }

      state.productNumber = state.productNumber - 1
    }
    }
}
)

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, incrementInCart, decrementInCart } = cartSlice.actions

export default cartSlice.reducer