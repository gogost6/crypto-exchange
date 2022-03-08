import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    binanceAll: [],
    searchedPair: {},
    searchedPair24Hr: {},
    sortType: {
      name: '',
      price: '',
      '24hrPriceChangePercent': '',
      volume: ''
    }
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
    clearSearched: (state, action) => {
      state.value.searchedPair = {};
      state.value.searchedPair24Hr = {};
    },
    sortByName: (state, action) => {
      if (action.payload == 'asc') {
        state.value.binanceAll.sort((x, y) => {
          const a = x.symbol;
          const b = y.symbol
          return a.localeCompare(b);
        });
        state.value.sortType.name = 'desc';
      } else if (action.payload == 'desc') {
        state.value.binanceAll.sort((x, y) => {
          const a = x.symbol;
          const b = y.symbol
          return b.localeCompare(a);
        });
        state.value.sortType.name = 'asc';
      }
    },
    sortByPrice: (state, action) => {
      if (action.payload == 'asc') {
        state.value.binanceAll.sort((x, y) => {
          const a = x.lastPrice;
          const b = y.lastPrice
          return a - b;
        });
        state.value.sortType.price = 'desc';
      } else if (action.payload == 'desc') {
        state.value.binanceAll.sort((x, y) => {
          const a = x.lastPrice;
          const b = y.lastPrice;
          return b - a;
        });
        state.value.sortType.price = 'asc';
      }
    },
    sortBy24hrPriceChangePercent: (state, action) => {
      if (action.payload == 'asc') {
        state.value.binanceAll.sort((x, y) => {
          const a = x.priceChangePercent;
          const b = y.priceChangePercent;
          return a - b;
        });
        state.value.sortType['24hrPriceChangePercent'] = 'desc';
      } else if (action.payload == 'desc') {
        state.value.binanceAll.sort((x, y) => {
          const a = x.priceChangePercent;
          const b = y.priceChangePercent;
          return b - a;
        });
        state.value.sortType['24hrPriceChangePercent'] = 'asc';
      }
    },
    sortByVolume: (state, action) => {
      if (action.payload == 'asc') {
        state.value.binanceAll.sort((x, y) => {
          const a = x.volume;
          const b = y.volume;
          return a - b;
        });
        state.value.sortType.volume = 'desc';
      } else if (action.payload == 'desc') {
        state.value.binanceAll.sort((x, y) => {
          const a = x.volume;
          const b = y.volume;
          return b - a;
        });
        state.value.sortType.volume = 'asc';
      }
    }
  },
})

export const { addPairs, addSearchedPair, add24Hr, clearSearched, sortByName, sortByPrice, sortBy24hrPriceChangePercent, sortByVolume } = exchangeSlice.actions;

export default exchangeSlice.reducer;