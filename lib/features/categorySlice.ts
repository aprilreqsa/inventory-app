import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Category {
    id?: string;
    name?: string;
    description?: string;
}

interface CategoryState {
    categories: Category[];
    category: Category
}

const initialState: CategoryState = {
  categories: [],
  category: {
    name: "",
    description: ""
  }
};
export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<Category>) => {
            state.category = action.payload
        },
        addCategory: (state, action: PayloadAction<Category>)=> {
            state.categories.push(action.payload)
        },
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
        },
        removeCategory: (state, action) => {
            state.categories = state.categories.filter(category => category.name !== action.payload.name);
        },
        updateCategory: (state, action) => {
            const index = state.categories.findIndex(category => category.id === action.payload.id);
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
        }
    },
});

export const { setCategory, removeCategory, updateCategory, setCategories, addCategory } = categorySlice.actions;
export default categorySlice.reducer;