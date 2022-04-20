import "./SearchBar.scss";
import Table from "../Table/Table";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    addPairs,
    addSearchedPair,
    add24Hr,
    clearSearched,
    addHuobiPair,
} from "../../features/exchange/exchangeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faBomb,
    faHouse,
} from "@fortawesome/free-solid-svg-icons";
import {
    getLiveTickerPriceBinance,
    get24HrPriceChange,
    getAll24HrPriceChange,
} from "../../services/binance";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLiveTickerPriceHuobi } from "../../services/huobi";
import ExchangeData from "../ExchangeData/ExchangeData";

const SearchBar = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [notFoundPairBinance, setNotFoundPairBinance] = useState(false);
    const [notFoundPairHuobi, setNotFoundPairHuobi] = useState(false);
    const [emptySubmit, setEmptySubmit] = useState(false);
    const searchedPairBinance = useAppSelector(
        (state) => state.exchange.value.searchedPair
    );
    const huobiPair = useAppSelector((state) => state.exchange.value.huobiPair);
    const inputLocation = location.pathname.slice(1, location.pathname.length);
    const [inputLocationState, setInputLocationState] = useState(inputLocation);

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputLocationState(e.target.value);
    };

    const ErrorComponent = () => {
        if (!notFoundPairHuobi || !notFoundPairBinance) {
            return (
                <>
                    {searchedPairBinance.price || huobiPair.close ? (
                        <Table />
                    ) : (
                        <ExchangeData />
                    )}
                </>
            );
        } else {
            return null;
        }
    };

    const getData = useCallback((pair: string) => {
        console.log("not here");

        if (pair.includes("/")) {
            pair = pair.replace("/", "");
        }

        getLiveTickerPriceBinance(pair.toUpperCase())
            .then((res) => {
                setNotFoundPairBinance(false);
                dispatch(addSearchedPair(res));
            })
            .catch((err) => {
                setNotFoundPairBinance(true);
            });

        get24HrPriceChange(pair.toUpperCase())
            .then((res) => {
                setNotFoundPairBinance(false);
                dispatch(add24Hr(res));
            })
            .catch((err) => {
                setNotFoundPairBinance(true);
            });

        getLiveTickerPriceHuobi(pair.toLowerCase())
            .then((res) => {
                if (res.status === "error") {
                    setNotFoundPairHuobi(true);
                } else {
                    setNotFoundPairHuobi(false);
                    dispatch(addHuobiPair({ res, symbol: pair.toUpperCase() }));
                }
            })
            .catch((err) => {
                setNotFoundPairHuobi(true);
            });
    }, []);

    useEffect(() => {
        let newLocation = location.pathname;
        if (newLocation != "/") {
            return getData(newLocation);
        }

        getAll24HrPriceChange()
            .then((res) => dispatch(addPairs(res)))
            .catch((err) => setNotFoundPairBinance(true));

        setInterval(() => {
            getAll24HrPriceChange()
                .then((res) => dispatch(addPairs(res)))
                .catch((err) => setNotFoundPairBinance(true));
        }, 30000);
        //if the time is 3s, they ban my IP adress after a while
        return () => clearInterval();
    }, [emptySubmit, location]);

    const onClickHouse = () => {
        navigate("/");
        setInputLocationState("");
        dispatch(clearSearched());

        getAll24HrPriceChange()
            .then((res) => dispatch(addPairs(res)))
            .catch((err) => setNotFoundPairBinance(true));

        setNotFoundPairBinance(false);
        setNotFoundPairHuobi(false);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNotFoundPairBinance(false);
        setNotFoundPairHuobi(false);
        dispatch(clearSearched());

        let formData = new FormData(e.currentTarget);
        let data = Object.fromEntries(formData);
        let pair = data.pair.toString();

        if (pair === "") {
            setEmptySubmit(true);
            setNotFoundPairBinance(false);
            setNotFoundPairHuobi(false);
            dispatch(clearSearched());
            return;
        } else {
            setEmptySubmit(false);
        }
        getData(pair);
    };

    return (
        <div className="container">
            <h2>Search for crypto pairs</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    id="header-search"
                    placeholder="BTC/USDT"
                    name="pair"
                    value={inputLocationState}
                    onChange={onChangeInput}
                />
                <button type="submit">
                    <FontAwesomeIcon icon={faMagnifyingGlass as IconProp} />
                </button>
                <FontAwesomeIcon
                    className="house"
                    icon={faHouse as IconProp}
                    onClick={onClickHouse}
                />
            </form>
            {notFoundPairBinance && notFoundPairHuobi ? (
                <>
                    <h2 className="hide">
                        Pair not found! Please try with another like BTC/USDT.
                    </h2>
                    <FontAwesomeIcon
                        className="hide"
                        icon={faBomb as IconProp}
                        style={{ fontSize: "100px", marginBottom: "50px" }}
                    />
                </>
            ) : (
                ""
            )}
            <ErrorComponent />
        </div>
    );
};

export default SearchBar;
