import { BinancePair } from "../../interfaces";

interface Props {
    currentItems: BinancePair[]
}

const Items = ({ ...props }: Props) => {
    const currentItems = props.currentItems;

    return currentItems ? (
        <>
            {currentItems.map((x: BinancePair) => (
                <div className="symbol-container" key={x.symbol}>
                    <h4>{x.symbol}</h4>
                    <p>{Number(x.lastPrice).toFixed(2)}</p>
                    <p
                        style={
                            +x.priceChangePercent > 0
                                ? { color: "green" }
                                : { color: "red" }
                        }
                    >
                        {+x.priceChangePercent > 0
                            ? `+${x.priceChangePercent}`
                            : `${x.priceChangePercent}`}
                        %
                    </p>
                    <p>{Number(x.volume).toFixed(2)}M</p>
                </div>
            ))}
        </>
    ) : null;
};

export default Items;
