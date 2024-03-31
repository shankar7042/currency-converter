import { Star } from "lucide-react";

/* eslint-disable react/prop-types */
const CurrencySelect = ({
  currencies,
  label,
  currency,
  setCurrency,
  favourites,
  handleFavourites,
}) => {
  const isFavorite = (currency) => favourites.includes(currency);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm text-slate-400">{label}</span>
      <div className="mt-1 relative w-full">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {favourites.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
          <hr />
          {currencies
            .filter((c) => !isFavorite(c))
            .map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
        </select>
        <button
          onClick={() => handleFavourites(currency)}
          className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5"
        >
          {isFavorite(currency) ? (
            <Star className="fill-yellow-400 h-4 w-4" />
          ) : (
            <Star className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CurrencySelect;
