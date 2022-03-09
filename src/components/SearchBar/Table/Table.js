import "./Table.scss";
import { useSelector } from "react-redux";
import TableHeader from "./TableHeader";
import binanceLogo from '../../../assets/binance-logo.jpg';
import huobiLogo from '../../../assets/huobi.jpg';

const Table = ({ loader }) => {
    const searchedPair = useSelector(state => state.exchange.value.searchedPair);
    const hours24Change = useSelector(state => state.exchange.value.searchedPair24Hr);
    const huobiPair = useSelector(state => state.exchange.value.huobiPair);
    const priceChangeStyle = hours24Change.priceChangePercent > 0 ? { color: 'green' } : { color: 'red' };

    return (<div className="table-container">
        {/* {loader.current ? <div className="loader-wrapper">
            <div className="typing-demo">
            Loading crypto pairs...
            </div>
        </div> : ''} */}
        {searchedPair.price ? <>
            <div className="binance-div">
                <h3>Data from</h3>
                <img src={binanceLogo} alt="binance" />
            </div>
            <TableHeader />
            <div className="symbol-container">
                <h4>{searchedPair.symbol}</h4>
                <p>{`${(Number(searchedPair.price)).toFixed(2)}`}</p>
                <p style={priceChangeStyle}>
                    {hours24Change.priceChangePercent > 0
                        ? `+${hours24Change.priceChangePercent}`
                        : `${hours24Change.priceChangePercent}`}%
                </p>
                <p>{`${(Number(hours24Change.volume)).toFixed(2)}M`}</p>
            </div>
            <div style={{ 'marginTop': '50px' }}></div>
        </>
            : <>
                <div className="binance-div">
                    <h3>Data from</h3>
                    <img src={binanceLogo} alt="binance" />
                </div>
                <h3 style={{ 'marginBottom': '100px' }}>Pair not found in Binance</h3>
            </>}
        {huobiPair.close
            ? <>
                <div className="huobi-div hide-logo">
                    <h3>Data from</h3>
                    <img src={huobiLogo} alt="huobi" />
                </div>
                <TableHeader />
                <div className="symbol-container">
                    <h4>{huobiPair.symbol}</h4>
                    <p>{`${(Number(huobiPair.close)).toFixed(2)}`}</p>
                    <p>
                        Not avaible in API
                    </p>
                    <p>{`${(Number(huobiPair.amount)).toFixed(2)}M`}</p>
                </div>
            </>
            : <>
                <div className="huobi-div hide-logo">
                    <h3>Data from</h3>
                    <img src={huobiLogo} alt="huobi" />
                </div>
                <h3 style={{ 'marginTop': '43px' }}>Pair not fount in Huobi</h3>
            </>}
    </div>)
}

export default Table;