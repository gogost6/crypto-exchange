import "../Table/Table.scss";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import Items from "./Items";
import binanceLogo from '../../assets/binance-logo.jpg';
import TableHeader from "../Table/TableHeader";

const ExchangeData = () => {
    const pairs = useSelector(state => state.exchange.value.binanceAll);
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
        setItems(pairs);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, pairs, items]);

    return (<div className="table-container">
        <div className="binance-div">
            <h3>Data from</h3>
            <img src={binanceLogo} alt="binance" />
        </div>
        <TableHeader />
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
    </div>)
}

export default ExchangeData;