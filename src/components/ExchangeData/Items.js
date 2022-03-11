const Items = ({ currentItems }) => {
    return (
        currentItems ? <>
            {currentItems.map(x => <div className="symbol-container" key={x.symbol}>
                <h4>{x.symbol}</h4>
                <p>{Number(x.lastPrice).toFixed(2)}</p>
                <p
                    style={x.priceChangePercent > 0
                        ? { color: 'green' }
                        : { color: 'red' }}>
                    {x.priceChangePercent > 0
                        ? `+${x.priceChangePercent}`
                        : `${x.priceChangePercent}`}%</p>
                <p>{Number(x.volume).toFixed(2)}M</p>
            </div>)}
        </> : ''
    );
}

export default Items;