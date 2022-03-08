import "./Table.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortByName, sortByPrice, sortBy24hrPriceChangePercent, sortByVolume } from '../../features/exchange/exchangeSlice';

const TableHeader = () => {
    const sortType = useSelector(state => state.exchange.value.sortType);
    const dispatch = useDispatch();

    const [priceSort, setPriceSort] = useState(null);
    const [hrChangeSort, setHrChangeSort] = useState(null);
    const [volumeSort, setVolumeSort] = useState(null);

    const fontIcon = (sortType) => {
        if (sortType == 'asc') {
            return <FontAwesomeIcon icon={faSortDown} />
        } else if (sortType == 'desc') {
            return <FontAwesomeIcon icon={faSortUp} />
        } else {
            return <FontAwesomeIcon icon={faSort} />
        }
    }

    const onClick = (e) => {
        const element = e.target;
        if (element.className == 'name' && (sortType.name == 'asc' || sortType.name == '')) {
            dispatch(sortByName('asc'));
        } else if (element.className == 'name' && sortType.name == 'desc') {
            dispatch(sortByName('desc'));
        } else if (element.className == 'price' && (sortType.price == 'asc' || sortType.price == '')) {
            dispatch(sortByPrice('asc'));
        } else if (element.className == 'price' && sortType.price == 'desc') {
            dispatch(sortByPrice('desc'));
        } else if (element.className == 'change' && (sortType['24hrPriceChangePercent'] == 'asc' || sortType['24hrPriceChangePercent'] == '')) {
            dispatch(sortBy24hrPriceChangePercent('asc'));
        } else if (element.className == 'change' && sortType['24hrPriceChangePercent'] == 'desc') {
            dispatch(sortBy24hrPriceChangePercent('desc'));
        } else if (element.className == 'volume' && (sortType.volume == 'asc' || sortType.volume == '')) {
            dispatch(sortByVolume('asc'));
        } else if (element.className == 'volume' && sortType.volume == 'desc') {
            dispatch(sortByVolume('desc'));
        }
    }

    return (
        <div className="symbol-container small" onClick={onClick}>
            <p className="name">Name {fontIcon(sortType.name)}</p>
            <p className="price">Price {fontIcon(sortType.price)}</p>
            <p className="change">24h Change {fontIcon(sortType['24hr'])}</p>
            <p className="volume">24h Volume {fontIcon(sortType.volume)}</p>
        </div>);
}

export default TableHeader;