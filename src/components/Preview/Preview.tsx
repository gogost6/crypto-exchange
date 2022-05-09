import { Suspense, lazy } from "react";
import { useAppSelector } from "../../app/hooks";
import Table from "../Table/Table";
const ExchangeData = lazy(() => import("../ExchangeData/ExchangeData"));


const Preview = ({
    notFoundPairBinance,
    notFoundPairHuobi,
}: {
    notFoundPairBinance: boolean;
    notFoundPairHuobi: boolean;
}) => {
    const searchedPairBinance = useAppSelector(
        (state) => state.exchange.value.searchedPair
    );
    const huobiPair = useAppSelector((state) => state.exchange.value.huobiPair);

    if (!notFoundPairHuobi || !notFoundPairBinance) {
        return (
            <>
                {searchedPairBinance.price || huobiPair.close ? (
                    <Table />
                ) : (
                    <Suspense fallback={<span className="loader"></span>}>
                        <ExchangeData />
                    </Suspense>
                )}
            </>
        );
    } else {
        return null;
    }
};

export default Preview;
