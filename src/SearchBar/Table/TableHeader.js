import "./Table.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortByName } from '../../features/exchange/exchangeSlice';

const TableHeader = () => {
    const sortType = useSelector(state => state.exchange.value.sortType);
    const dispatch = useDispatch();

    const [priceSort, setPriceSort] = useState(null);
    const [hrChangeSort, setHrChangeSort] = useState(null);
    const [volumeSort, setVolumeSort] = useState(null);

    const nameIcon = (sortType) => {
        if (sortType == 'asc') {
            return <FontAwesomeIcon icon={faSortUp} />
        } else if (sortType == 'desc') {
            return <FontAwesomeIcon icon={faSortDown} />
        }
    }

    const onClick = (e) => {
        const element = e.target;
        
        if (element.className == 'name' && sortType == 'asc') {
            dispatch(sortByName('asc'));
        } else if (element.className == 'name' && sortType == 'desc') {
            dispatch(sortByName('desc'));
        }
    }

    return (
        <div className="symbol-container small" onClick={onClick}>
            <p className="name">Name {nameIcon(sortType)}</p>
            <p className="price">Price <FontAwesomeIcon icon={faSort} /></p>
            <p className="change">24h Change <FontAwesomeIcon icon={faSort} /></p>
            <p className="volume">24h Volume <FontAwesomeIcon icon={faSort} /></p>
        </div>);
}

export default TableHeader;