import "./SearchBar.scss";
import Table from './Table/Table.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBomb } from '@fortawesome/free-solid-svg-icons';
import { getLiveTickerPriceBinance, get24HrPriceChange, getAll24HrPriceChange } from '../services/binance.js';
import { useEffect, useState } from "react";

const SearchBar = () => {
    const [binancePair, setBinancePair] = useState({});
    const [binance24Hr, setBinance24Hr] = useState({});
    const [binanceAll, setBinanceAll] = useState([]);
    const [notFoundPair, setNotFoundPair] = useState(false);
    
    useEffect(() => {
        getAll24HrPriceChange()
            .then(res =>setBinanceAll(res))
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
                setBinancePair(res);
            })
            .catch(err => {
                setNotFoundPair(true);
            });

        get24HrPriceChange(pair.toUpperCase())
            .then(res => {
                setNotFoundPair(false);
                setBinance24Hr(res);
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

            <Table
                binanceAll={binanceAll}
                price={Number(binancePair.price)}
                symbol={binancePair.symbol}
                priceChangePercent={Number(binance24Hr.priceChangePercent)}
                volume={Number(binance24Hr.volume)} />
        </div>);

};

export default SearchBar;