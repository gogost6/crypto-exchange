import "./SearchBar.scss";
import Table from './Table/Table.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { getLiveTickerPriceBinance, get24HrPriceChange } from '../services/binance.js';
import { useState } from "react";

const SearchBar = () => {
    const [binancePair, setBinancePair] = useState({});
    const [binance24Hr, setBinance24Hr] = useState({});
    const [notFoundPair, setNotFoundPair] = useState('');

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
                console.log(res);
                setBinancePair(res);
            })
            .catch(err => {
                console.log(err);
                setNotFoundPair('Pair is not available nor in Binance, nor in Huobi!');
            });

        get24HrPriceChange(pair.toUpperCase())
            .then(res => {
                console.log(res);
                setBinance24Hr(res);
            })
            .catch(err => {
                console.log(err);
                setNotFoundPair('Pair is not available nor in Binance, nor in Huobi!');
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
            {binancePair.price
                ? <Table
                    price={Number(binancePair.price)}
                    symbol={binancePair.symbol} 
                    priceChange={Number(binance24Hr.priceChangePercent)}
                    volume={Number(binance24Hr.volume)}/>
                : ''}
        </div>);

};

export default SearchBar;