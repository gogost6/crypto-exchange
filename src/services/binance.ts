const baseBinanceUrl = "https://api.binance.us";

export const getLiveTickerPriceBinance = async (pair: string) => {
    const response = await fetch(
        `${baseBinanceUrl}/api/v3/ticker/price?symbol=${pair}`,
        {
            method: "GET",
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw result;
    } else {
        return result;
    }
};

export const get24HrPriceChange = async (pair: string) => {
    const response = await fetch(
        `${baseBinanceUrl}/api/v3/ticker/24hr?symbol=${pair}`,
        {
            method: "GET",
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw result;
    } else {
        return result;
    }
};

export const getAll24HrPriceChange = async () => {
    const response = await fetch(`${baseBinanceUrl}/api/v3/ticker/24hr`, {
        method: "GET",
    });

    const result = await response.json();

    if (!response.ok) {
        throw result;
    } else {
        return result;
    }
};
