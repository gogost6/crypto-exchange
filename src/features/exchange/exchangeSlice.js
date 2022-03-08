import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    binanceAll: [],
    searchedPair: {},
    searchedPair24Hr: {},
    sortType: ''
  },
}

export const exchangeSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addPairs: (state, action) => {
      state.value.binanceAll = action.payload;
    },
    addSearchedPair: (state, action) => {
      state.value.searchedPair = action.payload;
    },
    add24Hr: (state, action) => {
      state.value.searchedPair24Hr = action.payload;
    },
    sortByName: (state, action) => {
      if (action.payload == 'asc') {
        state.value.binanceAll.sort((x, y) => {
          const a = x.symbol;
          const b = y.symbol
          return a.localeCompare(b);
        });
        state.value.sortType = 'asc';
      } else if (action.payload == 'desc') {
        state.value.binanceAll.sort((x, y) => {
          const a = x.symbol;
          const b = y.symbol
          return b.localeCompare(a);
        });
        state.value.sortType = 'desc';
      }
    }
  },
})

export const { addPairs, addSearchedPair, add24Hr, sortByName } = exchangeSlice.actions;

export default exchangeSlice.reducer;