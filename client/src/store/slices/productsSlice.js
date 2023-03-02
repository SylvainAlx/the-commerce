import {createSlice} from '@reduxjs/toolkit'

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        allProducts: (state, action) => {
            return (
                action.payload
            )
        }
    }
})

export const {allProducts} = productsSlice.actions

export default productsSlice.reducer