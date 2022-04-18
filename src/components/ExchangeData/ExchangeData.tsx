import "../Table/Table.scss";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import {useAppSelector} from '../../app/hooks'
import Items from "./Items";
import binanceLogo from '../../assets/binance-logo.jpg';
import TableHeader from "../Table/TableHeader";
import { BinancePair } from "../../interfaces";

const ExchangeData = () => {
    const pairs = useAppSelector((state) => state.exchange.value.binanceAll);
    const [items, setItems] = useState<BinancePair[]>([] as BinancePair[]);
    const [currentItems, setCurrentItems] = useState<BinancePair[]>([] as BinancePair[]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;
    const props = {
        currentItems
    }

    const handlePageClick = (event: any): void => {
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
        <Items {...props} />
        <ReactPaginate
            className="pagination"
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={() => null}
        />
    </div>)
}

export default ExchangeData;