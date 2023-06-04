import Header from "./components/Header.jsx";
import Button from "./components/Button.jsx";
import React, { useRef } from "react";
import { calcularTotalPagar } from "./helpers";
import { useEffect, useState } from "react";

function App() {
    //const [count, setCount] = useState(0);
    const [cantidad, setCantidad] = useState(10000);
    //const cantidad = useRef(10000);
    const [meses, setMeses] = useState(6);
    const [total,setTotal] = useState(calcularTotalPagar(cantidad, meses));
    const MIN = 0;
    const MAX = 20000;
    const STEP = 100;

    const formatearDinero = (valor) => {
        const formatter = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        });
        return formatter.format(valor);
    };

    useEffect(() => {
        setTotal(calcularTotalPagar(cantidad, meses));
    }, [cantidad, meses]);

    const handleChangeDecremento = () => {
        const valor = cantidad - STEP;
        if (valor < MIN) {
            alert("Cantidad no valida");
            return;
        }
        setCantidad(valor);
    };
    const handleChangeIncremento = () => {
        const valor = cantidad + STEP;
        if (valor > MAX) {
            alert("Cantidad no valida");
            return;
        }
        setCantidad(valor);
    };

    return (
        <>
            <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
                <Header></Header>
                <div className="flex justify-between mt-10">
                    <Button operador="-" fn={handleChangeDecremento}></Button>
                    <Button operador="+" fn={handleChangeIncremento}></Button>
                </div>
                <div className="my-5">
                    <input
                        type="range"
                        className="w-full bg-gray-200 accent-lime-500 hover:accent-lime-600"
                        min={MIN}
                        max={MAX}
                        step={STEP}
                        value={cantidad}
                        onChange={(e) => setCantidad(parseInt(e.target.value))}
                    />
                    <p className="text-center my-10 text-5xl font-extrabold text-indigo-600">
                        {formatearDinero(cantidad)}
                    </p>
                    <select
                        className="w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500 mt-3"
                        value={meses}
                        onChange={(e) => setMeses(parseInt(e.target.value))}
                    >
                        <option value={6}>6 Meses</option>
                        <option value={12}>12 Meses</option>
                        <option value={24}>24 Meses</option>
                    </select>
                </div>
                <div className="my-5 space-y-3 bg-gray-50-p-5">
                    <h2 className="text-2x1 font-extrabold text-gray-500 text-center">
                        Resumen{" "}
                        <span className="text-indigo-600">de pagos</span>
                    </h2>
                    <p className="text-xl text-gray-500 text-center font-bold">
                        {meses}
                    </p>
                    <p className="text-xl text-gray-500 text-center font-bold">
                        Total a pagar: {formatearDinero(total)}
                    </p>
                    <p className="text-x1 text-gray-500 text-center font-bold">
                        Mensualidad: {formatearDinero(total/meses)}
                    </p>
                </div>
            </div>
        </>
    );
}

export default App;
