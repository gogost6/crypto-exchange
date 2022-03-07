import "./Table.scss";
import Items from "./Items";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";

const Table = ({ binanceAll, price, symbol, priceChangePercent, volume }) => {
    const priceChangeStyle = priceChangePercent > 0 ? { color: 'green' } : { color: 'red' };
    const [items, setItems] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setItems(binanceAll);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, binanceAll, items]);

    return (<div className="table-container">
        <div className="symbol-container small">
            <p>Name</p>
            <p>Price</p>
            <p>24h Change</p>
            <p>24h Volume</p>
        </div>
        {price
            ? <div className="symbol-container">
                <h4>{symbol}</h4>
                <p>{price}</p>
                <p style={priceChangeStyle}>
                    {priceChangePercent > 0
                        ? `+${priceChangePercent}`
                        : `${priceChangePercent}`}%
                </p>
                <p>{volume}</p>
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