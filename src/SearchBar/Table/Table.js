import "./Table.scss";
import Items from "./Items";
import { useDispatch, useSelector } from "react-redux";
import { addPairs } from '../../features/exchange/exchangeSlice';
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import TableHeader from "./TableHeader";

const Table = () => {
    const pairs = useSelector(state => state.exchange.value.binanceAll);
    const searchedPair = useSelector(state => state.exchange.value.searchedPair);
    const hours24Change = useSelector(state => state.exchange.value.searchedPair24Hr);

    const itemsPerPage = 5;
    const priceChangeStyle = hours24Change.priceChangePercent > 0 ? { color: 'green' } : { color: 'red' };

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
        <TableHeader pairs={pairs} items={items} setItems={setItems} />
        {searchedPair.price ? <div className="symbol-container">
            <h4>{searchedPair.symbol}</h4>
            <p>{searchedPair.price}</p>
            <p style={priceChangeStyle}>
                {hours24Change.priceChangePercent > 0
                    ? `+${hours24Change.priceChangePercent}`
                    : `${hours24Change.priceChangePercent}`}%
            </p>
            <p>{hours24Change.volume}</p>
        </div>
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