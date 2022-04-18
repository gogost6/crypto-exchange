import { configureStore } from '@reduxjs/toolkit';
import exchangeReducer from '../features/exchange/exchangeSlice';

export const store = configureStore({
    reducer: {
        exchange: exchangeReducer
    },
})