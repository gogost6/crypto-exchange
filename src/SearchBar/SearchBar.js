import "./SearchBar.scss";
import Table from './Table/Table.js';
import { useDispatch } from "react-redux";
import { addPairs, addSearchedPair, add24Hr, clearSearched } from '../features/exchange/exchangeSlice.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBomb } from '@fortawesome/free-solid-svg-icons';
import { getLiveTickerPriceBinance, get24HrPriceChange, getAll24HrPriceChange } from '../services/binance.js';
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [notFoundPair, setNotFoundPair] = useState(false);
    const [emptySubmit, setEmptySubmit] = useState(false);
    const loader = useRef(true);

    function getData(pair) {
        if (pair.includes('/')) {
            pair = pair.replace('/', '');
        }

        getLiveTickerPriceBinance(pair.toUpperCase())
            .then(res => {
                setNotFoundPair(false);
                dispatch(addSearchedPair(res));
            })
            .catch(err => {
                setNotFoundPair(true);
            });

        get24HrPriceChange(pair.toUpperCase())
            .then(res => {
                setNotFoundPair(false);
                dispatch(add24Hr(res));
            })
            .catch(err => {
                setNotFoundPair(true);
            });
    }

    useEffect(() => {
        let newLocation = location.pathname;
        if (newLocation != '/') {
            return getData(newLocation);
        }

        getAll24HrPriceChange()
            .then(res => dispatch(addPairs(res)))
            .catch(err => setNotFoundPair(true))
        setInterval(() => {
            getAll24HrPriceChange()
                .then(res => dispatch(addPairs(res)))
                .catch(err => setNotFoundPair(true))
        }, 30000);
        return () => clearInterval()
    }, [emptySubmit]);


    const onSubmit = (e) => {
        e.preventDefault();
        setNotFoundPair(false);
        location.pathname = '/';
        
        let formData = new FormData(e.currentTarget);
        let data = Object.fromEntries(formData);
        let pair = data.pair;

        if (pair === '') {
            setEmptySubmit(true);
            setNotFoundPair(false);
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
                    placeholder="BTC/USD"
                    name="pair"
                />
                <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </form>
            {notFoundPair ? <>
                <h2 className="hide">Pair not found! Please try with another like SHIBB/USD.</h2>
                <FontAwesomeIcon className="hide" icon={faBomb} style={{ 'fontSize': '100px', 'marginBottom': '50px' }} />
            </> : ''}
            <Table loader={loader} />
        </div>);

};

export default SearchBar;