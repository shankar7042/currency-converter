import CurrencyConverter from "./components/CurrencyConverter";

function App() {
  return (
    // CARD
    <div className="max-w-[500px] mx-auto flex justify-center items-center h-screen">
      <div className="w-full bg-white rounded-lg shadow-lg p-8 space-y-5">
        <h1 className="font-bold text-2xl text-slate-700">
          Currency Converter
        </h1>
        <div>
          <CurrencyConverter />
        </div>
      </div>
    </div>
  );
}

export default App;
