import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
    id?: string;
    name?: string;
    description?: string;
    price?: number | string;
    categoryId?: string;
    supplierId?: string;
}
interface ProductState {
    products: Product[];
    product: Product;
    
}
const initialState: ProductState = {
  products: [],
  product: {
    id:"",
    name:"",
    description:"",
    price:"",
    categoryId:"",
    supplierId:""   
  }
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        },
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(product => product.name !== action.payload.name);
        },
        updateProduct: (state, action) => {
            const index = state.products.findIndex(product => product.name === action.payload.name);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        setProduct: (state, action: PayloadAction<Product>) => {
            state.product = action.payload
        }
    },
});

export const { addProduct, removeProduct, updateProduct, setProducts } = productSlice.actions;
export default productSlice.reducer;