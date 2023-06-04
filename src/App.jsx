import Header from "./components/Header.jsx";
import Button from "./components/Button.jsx";
import React, { useRef } from "react";
import { calcularTotalPagar } from "./helpers";
import { useEffect, useState } from "react";

function App() {
    //const [count, setCount] = useState(0);
    const cantidad = useRef(10000);
    const meses = useRef(6);
    const total = useRef(calcularTotalPagar(cantidad.value, meses.value));
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
        total.current = calcularTotalPagar(cantidad.current, meses.current);
    }, [cantidad.current, meses.current]);

    const pagoMensual = () => {
        return total.value / meses.value;
    };

    const handleChangeDecremento = () => {
        const valor = cantidad.value - STEP;
        if (valor < MIN) {
            alert("Cantidad no valida");
            return;
        }
        cantidad.value = valor;
    };
    const handleChangeIncremento = () => {
        const valor = cantidad.value + STEP;
        if (valor > MAX) {
            alert("Cantidad no valida");
            return;
        }
        cantidad.value = valor;
    };

    return (
        <>
            <div class="my-20 max-w-lg mx-auto bg-white shadow p-10">
                <Header></Header>
            </div>
        </>
    );
}

export default App;
