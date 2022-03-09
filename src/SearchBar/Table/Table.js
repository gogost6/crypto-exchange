import "./Table.scss";
import Items from "./Items";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import TableHeader from "./TableHeader";
import binanceLogo from '../../assets/binance-logo.jpg';
import huobiLogo from '../../assets/huobi.jpg';

const Table = ({ loader }) => {
    const pairs = useSelector(state => state.exchange.value.binanceAll);
    const searchedPair = useSelector(state => state.exchange.value.searchedPair);
    const hours24Change = useSelector(state => state.exchange.value.searchedPair24Hr);
    const huobiPair = useSelector(state => state.exchange.value.huobiPair);
    const itemsPerPage = 5;
    const priceChangeStyle = hours24Change.priceChangePercent > 0 ? { color: 'green' } : { color: 'red' };
    console.log(huobiPair);
    const [items, setItems] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setItems(pairs);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, pairs, items]);

    return (<div className="table-container">
        <div className="binance-div">
            <h3>Data from</h3>
            <img src={binanceLogo} alt="binance" />
        </div>
        {/* {loader.current ? <div className="loader-wrapper">
            <div className="typing-demo">
            Loading crypto pairs...
            </div>
        </div> : ''} */}
        {searchedPair.price ? <>
            <TableHeader pairs={pairs} items={items} setItems={setItems} />
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
            <div className="huobi-div hide-logo">
                <h3>Data from</h3>
                <img src={huobiLogo} alt="huobi" />
            </div>
            {huobiPair.close
                ? <>
                    <TableHeader pairs={pairs} items={items} setItems={setItems} />
                    <div className="symbol-container">
                        <h4>{huobiPair.symbol}</h4>
                        <p>{`${(Number(huobiPair.close)).toFixed(2)}`}</p>
                        <p>
                            Not avaible in API
                        </p>
                        <p>{`${(Number(huobiPair.amount)).toFixed(2)}M`}</p>
                    </div>
                </>
                : <h2 style={{margin: '27px auto'}}>Pair not found in Huobi</h2>}


        </>
            : <>
                <Items currentItems={currentItems} />
                <ReactPaginate
                    className="pagination"
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                />
            </>}
    </div>)
}

export default Table;