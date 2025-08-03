import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Supplier {
    id?: string; 
    name?: string;
    contact?: string;
    address?: string;
}

interface SupplierState {
    suppliers: Supplier[];
    supplier: Supplier
}
const initialState: SupplierState = {
    suppliers: [],
    supplier: {
        id: "",
        name:"",
        contact:"",
        address:""
    }
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
            state.suppliers = state.suppliers.filter(supplier => supplier.id !== action.payload.id);
        },
        updateSupplier: (state, action) => {
            const index = state.suppliers.findIndex(supplier => supplier.id === action.payload.id);
            if (index !== -1) {
                state.suppliers[index] = action.payload;
            }
        },
        setSupplier: (state, action: PayloadAction<Supplier>) => {
            state.supplier = action.payload
        }
    },
});
export const { addSupplier, removeSupplier, updateSupplier, setSuppliers, setSupplier } = supplierSlice.actions;
export default supplierSlice.reducer;