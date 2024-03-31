import { useEffect } from "react";
import { ArrowLeftRight, RefreshCcw } from "lucide-react";
import CurrencySelect from "./CurrencySelect";
import { useState } from "react";

// Currencies -> https://api.frankfurter.app/currencies
// Conversion -> https://api.frankfurter.app/latest?amount=1&from=USD&to=INR

function currencyFormatter(amount, toCurrency) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: toCurrency,
  }).format(amount);
}

const FAVOURITE_KEY = "favouritesCurr";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [favourites, setFavourites] = useState(() =>
    JSON.parse(localStorage.getItem(FAVOURITE_KEY) || "[]")
  );
  const [fromCurrency, setFromCurrency] = useState(() =>
    favourites.length > 0 ? favourites[0] : ""
  );
  const [toCurrency, setToCurrency] = useState(() =>
    favourites.length > 0 ? favourites[0] : ""
  );
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [convertingLoading, setConvertingLoading] = useState(false);

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const res = await fetch("https://api.frankfurter.app/currencies");
        const data = await res.json();
        const currencies = Object.keys(data);
        setCurrencies(currencies);
      } catch (error) {
        console.log(error);
      }
    }

    fetchCurrencies();
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVOURITE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  const handleConvert = async () => {
    if (fromCurrency === toCurrency) {
      alert("From Currency can't be same as To Currency");
      return;
    }
    try {
      setConvertingLoading(true);
      setConvertedAmount(null);
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency]);
    } catch (error) {
      console.log(error);
    } finally {
      setConvertingLoading(false);
    }
  };

  const handleFavourites = (curr) => {
    if (favourites.includes(curr)) {
      setFavourites((favourites) => favourites.filter((c) => c !== curr));
    } else {
      setFavourites([...favourites, curr]);
    }
  };

  const handleFlip = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount(null);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <CurrencySelect
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          currencies={currencies}
          label="From"
          favourites={favourites}
          handleFavourites={handleFavourites}
        />
        <div className="flex justify-center items-center">
          <button
            onClick={handleFlip}
            className="p-2  bg-zinc-300 rounded-full hover:bg-zinc-400 transition duration-300"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>
        <CurrencySelect
          currency={toCurrency}
          setCurrency={setToCurrency}
          currencies={currencies}
          label="To"
          favourites={favourites}
          handleFavourites={handleFavourites}
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <span className="text-sm text-slate-800">Amount:</span>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
          className="border w-full outline-none p-2 rounded-lg"
        />
      </div>
      <button
        onClick={handleConvert}
        className="px-4 py-2 hover:bg-purple-800 transition text-white rounded-lg bg-purple-600 focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 flex gap-2 justify-center items-center"
      >
        {convertingLoading && <RefreshCcw className="w-4 h-4 animate-spin" />}
        {convertingLoading ? "Converting..." : "Convert"}
      </button>
      {convertedAmount && (
        <p className="text-green-600 text-lg font-semibold">
          Converted Amount: {currencyFormatter(convertedAmount, toCurrency)}
        </p>
      )}
    </div>
  );
};

export default CurrencyConverter;
