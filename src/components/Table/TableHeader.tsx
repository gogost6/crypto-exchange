import "./Table.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
    faSort,
    faSortUp,
    faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    sortByName,
    sortByPrice,
    sortBy24hrPriceChangePercent,
    sortByVolume,
} from "../../features/exchange/exchangeSlice";

const TableHeader = () => {
    const sortType = useAppSelector((state) => state.exchange.value.sortType);
    const dispatch = useAppDispatch();

    const fontIcon = (sortType: string) => {
        if (sortType === "asc") {
            return <FontAwesomeIcon icon={faSortDown as IconProp} />;
        } else if (sortType === "desc") {
            return <FontAwesomeIcon icon={faSortUp as IconProp} />;
        } else {
            return <FontAwesomeIcon icon={faSort as IconProp} />;
        }
    };

    const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const element = e.target as HTMLButtonElement;
        if (
            element.className === "name" &&
            (sortType.name === "asc" || sortType.name === "")
        ) {
            dispatch(sortByName("asc"));
        } else if (element.className === "name" && sortType.name === "desc") {
            dispatch(sortByName("desc"));
        } else if (
            element.className === "price" &&
            (sortType.price === "asc" || sortType.price === "")
        ) {
            dispatch(sortByPrice("asc"));
        } else if (element.className === "price" && sortType.price === "desc") {
            dispatch(sortByPrice("desc"));
        } else if (
            element.className === "change" &&
            (sortType["24hrPriceChangePercent"] === "asc" ||
                sortType["24hrPriceChangePercent"] === "")
        ) {
            dispatch(sortBy24hrPriceChangePercent("asc"));
        } else if (
            element.className === "change" &&
            sortType["24hrPriceChangePercent"] === "desc"
        ) {
            dispatch(sortBy24hrPriceChangePercent("desc"));
        } else if (
            element.className === "volume" &&
            (sortType.volume === "asc" || sortType.volume === "")
        ) {
            dispatch(sortByVolume("asc"));
        } else if (
            element.className === "volume" &&
            sortType.volume === "desc"
        ) {
            dispatch(sortByVolume("desc"));
        }
    };

    return (
        <div className="symbol-container small" onClick={onClick}>
            <p className="name">Name {fontIcon(sortType.name)}</p>
            <p className="price">Price {fontIcon(sortType.price)}</p>
            <p className="change">
                24h Change {fontIcon(sortType["24hrPriceChangePercent"])}
            </p>
            <p className="volume">24h Volume {fontIcon(sortType.volume)}</p>
        </div>
    );
};

export default TableHeader;
