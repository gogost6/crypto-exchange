import "./Table.scss";

const Table = ({ price, symbol, priceChange, volume }) => {
    const priceChangeStyle = priceChange > 0 ? { color: 'green' } : { color: 'red' };
    
    return (<div className="table-container">
        <div className="symbol-container small">
            <p>Name</p>
            <p>Price</p>
            <p>24h Change</p>
            <p>24h Volume</p>
        </div>
        <div className="symbol-container">
            <h4>{symbol}</h4>
            <p>{price}</p>
            <p style={priceChangeStyle}>{priceChange > 0 ? `+${priceChange}` : `-${priceChange}`}%</p>
            <p>{volume}</p>
        </div>
    </div>)
}

export default Table;