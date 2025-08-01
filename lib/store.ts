import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/productSlice';
import categoryReducer from './features/categorySlice';
import supplierReducer from './features/supplierSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    supplier: supplierReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;