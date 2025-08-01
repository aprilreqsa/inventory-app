import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Category {
    id?: string;
    name: string;
    description?: string;
}

interface CategoryState {
    categories: Category[];
}

const initialState: CategoryState = {
  categories: []
};
export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<Category>) => {
            state.categories.push(action.payload);
        },
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
        },
        removeCategory: (state, action) => {
            state.categories = state.categories.filter(category => category.name !== action.payload.name);
        },
        updateCategory: (state, action) => {
            const index = state.categories.findIndex(category => category.name === action.payload.name);
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
        }
    },
});

export const { addCategory, removeCategory, updateCategory, setCategories } = categorySlice.actions;
export default categorySlice.reducer;