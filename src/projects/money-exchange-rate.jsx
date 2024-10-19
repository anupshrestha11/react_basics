import { useCallback, useEffect, useMemo, useState } from "react";

function MoneyExchageRate() {
  const [currencies, setCurrencies] = useState({});
  const [nprCurrencyRate, setNPRCurrencyRate] = useState({});
  const [fromAmount, setFromAmount] = useState(1000);
  const [toAmount, setToAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("npr");
  const [toCurrency, setToCurrency] = useState("usd");

  const handleSwap = () => {
    const tempCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
  };

  const fetchCurrencies = useCallback(() => {
    fetch(
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.min.json"
    )
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => data);
        }
      })
      .then((data) => {
        setCurrencies(() => data);
      });
  }, []);

  const fetchCurrecyRates = useCallback(() => {
    fetch(
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/npr.json"
    )
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => data);
        }
      })
      .then((data) => {
        setNPRCurrencyRate(() => data.npr);
      });
  }, []);

  const calculateCurrencies = useCallback(() => {
    const isFromCurrencyNpr = fromCurrency == "npr";
    const isToCurrencyNpr = toCurrency == "npr";
    let rate = 1;
    let amount = fromAmount;

    if (!isToCurrencyNpr) {
      rate = nprCurrencyRate[toCurrency];
    }

    if (!isFromCurrencyNpr) {
      amount = fromAmount / nprCurrencyRate[fromCurrency];
    }

    const totalAmount = Math.floor(rate * amount * 100) / 100;

    if (isNaN(totalAmount)) {
      return;
    }

    setToAmount(() => totalAmount);
  }, [fromAmount, fromCurrency, nprCurrencyRate, toCurrency]);

  useEffect(calculateCurrencies, [calculateCurrencies]);

  const fetchData = useCallback(() => {
    fetchCurrencies();
    fetchCurrecyRates();
  }, [fetchCurrencies, fetchCurrecyRates]);

  useMemo(fetchData, [fetchData]);

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-blue-900">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h1 className="text-2xl text-center pb-2 mb-2 border-b-2 border-blue-500">
            Money Exchage Rates
          </h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              From
            </label>
            <input
              type="number"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(() => e.target.value)}
              className="w-full px-3 py-2 border mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(currencies)
                .sort((a, b) => a - b)
                .map(([key, value]) => (
                  <option key={key} value={key}>
                    {key.toUpperCase()} - {value}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex justify-center mb-4">
            <button
              onClick={handleSwap}
              className="bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Swap
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              To
            </label>
            <input
              type="number"
              value={toAmount}
              readOnly
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(() => e.target.value)}
              className="w-full px-3 py-2 border mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(currencies)
                .sort((a, b) => a - b)
                .map(([key, value]) => (
                  <option key={key} value={key}>
                    {key.toUpperCase()} - {value}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex justify-center">
            <button className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700">
              Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoneyExchageRate;
