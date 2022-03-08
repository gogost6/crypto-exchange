import "./SearchBar.scss";
import Table from './Table/Table.js';
import { useDispatch } from "react-redux";
import { addPairs, addSearchedPair, add24Hr } from '../features/exchange/exchangeSlice.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBomb } from '@fortawesome/free-solid-svg-icons';
import { getLiveTickerPriceBinance, get24HrPriceChange, getAll24HrPriceChange } from '../services/binance.js';
import { useEffect, useState } from "react";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [notFoundPair, setNotFoundPair] = useState(false);

    useEffect(() => {
        getAll24HrPriceChange()
            .then(res => dispatch(addPairs(res)))
            .catch(err => setNotFoundPair(true))
    }, []);


    const onSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let data = Object.fromEntries(formData);
        let pair = data.pair;

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
            {notFoundPair ? <FontAwesomeIcon icon={faBomb} /> : ''}
            <Table />
        </div>);

};

export default SearchBar;