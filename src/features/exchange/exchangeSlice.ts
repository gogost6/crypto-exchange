import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BinancePair, BinanceTicker, HuobiPair } from "../../interfaces";

interface exchangeState {
    value: {
        binanceAll: BinancePair[];
        searchedPair: BinanceTicker;
        searchedPair24Hr: BinancePair;
        sortType: {
            name: string;
            price: string;
            "24hrPriceChangePercent": string;
            volume: string;
        };
        huobiPair: HuobiPair;
    };
}

const initialState: exchangeState = {
    value: {
        binanceAll: [],
        searchedPair: { symbol: "", price: "" },
        searchedPair24Hr: {
            symbol: "",
            priceChange: "",
            priceChangePercent: "",
            weightedAvgPrice: "",
            prevClosePrice: "",
            lastPrice: "",
            lastQty: "",
            bidPrice: "",
            bidQty: "",
            askPrice: "",
            askQty: "",
            openPrice: "",
            highPrice: "",
            lowPrice: "",
            volume: "",
            quoteVolume: "",
            openTime: 0,
            closeTime: 0,
            firstId: 0,
            lastId: 0,
            count: 0,
        },
        sortType: {
            name: "",
            price: "",
            "24hrPriceChangePercent": "",
            volume: "",
        },
        huobiPair: { close: 0, symbol: "", amount: "" },
    },
};

export const exchangeSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addPairs: (state, action: PayloadAction<BinancePair[]>) => {
            state.value.binanceAll = action.payload;
        },
        addSearchedPair: (state, action: PayloadAction<BinanceTicker>) => {
            state.value.searchedPair = action.payload;
        },
        add24Hr: (state, action: PayloadAction<BinancePair>) => {
            state.value.searchedPair24Hr = action.payload;
        },
        addHuobiPair: (state, action) => {
            state.value.huobiPair = {
                symbol: action.payload.symbol,
                ...action.payload.res.tick,
            };
        },
        clearSearched: (state) => {
            state.value.searchedPair = { price: "", symbol: "" };
            state.value.searchedPair24Hr = {
                symbol: "",
                priceChange: "",
                priceChangePercent: "",
                weightedAvgPrice: "",
                prevClosePrice: "",
                lastPrice: "",
                lastQty: "",
                bidPrice: "",
                bidQty: "",
                askPrice: "",
                askQty: "",
                openPrice: "",
                highPrice: "",
                lowPrice: "",
                volume: "",
                quoteVolume: "",
                openTime: 0,
                closeTime: 0,
                firstId: 0,
                lastId: 0,
                count: 0,
            };
            state.value.huobiPair = { close: 0, symbol: "", amount: "" };
            state.value.binanceAll = [];
        },
        sortByName: (state, action: PayloadAction<string>) => {
            if (action.payload === "asc") {
                state.value.binanceAll.sort((x, y) => {
                    const a = x.symbol;
                    const b = y.symbol;
                    return a.localeCompare(b);
                });
                state.value.sortType.name = "desc";
            } else if (action.payload === "desc") {
                state.value.binanceAll.sort((x, y) => {
                    const a = x.symbol;
                    const b = y.symbol;
                    return b.localeCompare(a);
                });
                state.value.sortType.name = "asc";
            }
        },
        sortByPrice: (state, action: PayloadAction<string>) => {
            if (action.payload === "asc") {
                state.value.binanceAll.sort((x, y) => {
                    const a = Number(x.lastPrice);
                    const b = Number(y.lastPrice);
                    return a - b;
                });
                state.value.sortType.price = "desc";
            } else if (action.payload === "desc") {
                state.value.binanceAll.sort((x, y) => {
                    const a = Number(x.lastPrice);
                    const b = Number(y.lastPrice);
                    return b - a;
                });
                state.value.sortType.price = "asc";
            }
        },
        sortBy24hrPriceChangePercent: (state, action) => {
            if (action.payload === "asc") {
                state.value.binanceAll.sort((x, y) => {
                    const a = Number(x.priceChangePercent);
                    const b = Number(y.priceChangePercent);
                    return a - b;
                });
                state.value.sortType["24hrPriceChangePercent"] = "desc";
            } else if (action.payload === "desc") {
                state.value.binanceAll.sort((x, y) => {
                    const a = Number(x.priceChangePercent);
                    const b = Number(y.priceChangePercent);
                    return b - a;
                });
                state.value.sortType["24hrPriceChangePercent"] = "asc";
            }
        },
        sortByVolume: (state, action: PayloadAction<string>) => {
            if (action.payload === "asc") {
                state.value.binanceAll.sort((x, y) => {
                    const a = Number(x.volume);
                    const b = Number(y.volume);
                    return a - b;
                });
                state.value.sortType.volume = "desc";
            } else if (action.payload === "desc") {
                state.value.binanceAll.sort((x, y) => {
                    const a = Number(x.volume);
                    const b = Number(y.volume);
                    return b - a;
                });
                state.value.sortType.volume = "asc";
            }
        },
    },
});

export const {
    addPairs,
    addSearchedPair,
    add24Hr,
    addHuobiPair,
    clearSearched,
    sortByName,
    sortByPrice,
    sortBy24hrPriceChangePercent,
    sortByVolume,
} = exchangeSlice.actions;

export default exchangeSlice.reducer;
