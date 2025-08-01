import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Supplier {
    id?: string; 
    name?: string;
    contact?: string;
    address?: string;
}

interface SupplierState {
    suppliers: Supplier[];
}
const initialState: SupplierState = {
    suppliers: []
};

export const supplierSlice = createSlice({
    name: "supplier",
    initialState,
    reducers: {
        addSupplier: (state, action: PayloadAction<Supplier>) => {
            state.suppliers.push(action.payload);
        },
        setSuppliers: (state, action: PayloadAction<Supplier[]>) => {
            state.suppliers = action.payload;
        },
        removeSupplier: (state, action) => {
            state.suppliers = state.suppliers.filter(supplier => supplier.name !== action.payload.name);
        },
        updateSupplier: (state, action) => {
            const index = state.suppliers.findIndex(supplier => supplier.name === action.payload.name);
            if (index !== -1) {
                state.suppliers[index] = action.payload;
            }
        }
    },
});
export const { addSupplier, removeSupplier, updateSupplier, setSuppliers } = supplierSlice.actions;
export default supplierSlice.reducer;