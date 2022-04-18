const baseHuobiUrl = 'https://api.huobi.pro';

export const getLiveTickerPriceHuobi = async (pair) => {
    const response = await fetch(`${baseHuobiUrl}/market/detail?symbol=${pair}`, {
        method: 'GET'
    });

    const result = await response.json();

    if (!response.ok) {
        throw result;
    } else {
        return result;
    }
}