import "./SearchBar.scss";
import Table from './Table/Table.js';
import { useDispatch, useSelector } from "react-redux";
import { addPairs, addSearchedPair, add24Hr, clearSearched, addHuobiPair } from '../features/exchange/exchangeSlice.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBomb } from '@fortawesome/free-solid-svg-icons';
import { getLiveTickerPriceBinance, get24HrPriceChange, getAll24HrPriceChange } from '../services/binance.js';
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getLiveTickerPriceHuobi } from "../services/huobi";
import ExchangeData from "../ExchangeData/ExchangeData";

const SearchBar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [notFoundPairBinance, setNotFoundPairBinance] = useState(false);
    const [notFoundPairHuobi, setNotFoundPairHuobi] = useState(false);
    const [emptySubmit, setEmptySubmit] = useState(false);
    const searchedPairBinance = useSelector((state) => state.exchange.value.searchedPair);
    const huobiPair = useSelector(state => state.exchange.value.huobiPair);
    const loader = useRef(true);
    const inputLocation = location.pathname.slice(1, location.pathname.length)
    const [inputLocationState, setInputLocationState] = useState(inputLocation);

    const onChangeInput = (e) => {
        setInputLocationState(e.target.value);
    }

    function getData(pair) {
        if (pair.includes('/')) {
            pair = pair.replace('/', '');
        }

        getLiveTickerPriceBinance(pair.toUpperCase())
            .then(res => {
                setNotFoundPairBinance(false);
                dispatch(addSearchedPair(res));
            })
            .catch(err => {
                setNotFoundPairBinance(true);
            });

        get24HrPriceChange(pair.toUpperCase())
            .then(res => {
                setNotFoundPairBinance(false);
                dispatch(add24Hr(res));
            })
            .catch(err => {
                setNotFoundPairBinance(true);
            });

        getLiveTickerPriceHuobi(pair.toLowerCase())
            .then(res => {
                if (res.status === 'error') {
                    setNotFoundPairHuobi(true);
                } else {
                    setNotFoundPairHuobi(false);
                    dispatch(addHuobiPair({ res, symbol: pair.toUpperCase() }));
                }
            })
            .catch(err => {
                setNotFoundPairHuobi(true);
            });
    }

    useEffect(() => {
        let newLocation = location.pathname;
        if (newLocation != '/') {
            return getData(newLocation);
        }

        getAll24HrPriceChange()
            .then(res => dispatch(addPairs(res)))
            .catch(err => setNotFoundPairBinance(true))
        setInterval(() => {
            getAll24HrPriceChange()
                .then(res => dispatch(addPairs(res)))
                .catch(err => setNotFoundPairBinance(true))
        }, 30000);
        return () => clearInterval()
    }, [emptySubmit]);


    const onSubmit = (e) => {
        e.preventDefault();
        setNotFoundPairBinance(false);
        setNotFoundPairHuobi(false);
        dispatch(clearSearched());

        let formData = new FormData(e.currentTarget);
        let data = Object.fromEntries(formData);
        let pair = data.pair;

        if (pair === '') {
            setEmptySubmit(true);
            setNotFoundPairBinance(false);
            setNotFoundPairHuobi(false);
            dispatch(clearSearched());
            return;
        } else {
            setEmptySubmit(false);
        }
        getData(pair);
    }

    return (
        <div className="container">
            <h2>Search for crypto pairs</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    id="header-search"
                    placeholder="BTC/USDT"
                    name="pair"
                    value={inputLocationState}
                    onChange={onChangeInput}
                />
                <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </form>
            {(notFoundPairBinance && notFoundPairHuobi) ? <>
                <h2 className="hide">Pair not found! Please try with another like BTC/USDT.</h2>
                <FontAwesomeIcon className="hide" icon={faBomb} style={{ 'fontSize': '100px', 'marginBottom': '50px' }} />
            </> : ''}
            {searchedPairBinance.price || huobiPair.close ? <Table /> : <ExchangeData />}
        </div>);
};

export default SearchBar;