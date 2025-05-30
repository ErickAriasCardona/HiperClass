import React, { useState } from 'react';
import './FormStyles.css';
import LogoHC from '../assets/logo/logo.png';

const opciones = {
    sexo: ['F', 'M'],
    diabetes: ['SI', 'NO'],
    colesterol: ['SI', 'NO'],
    fumador: ['SI', 'NO'],
    sedentarismo: ['SI', 'NO'],
    antecedentes: ['SI', 'NO'],
    sal: ['Alto', 'Medio', 'Bajo'],
    alcohol: ['Frecuente', 'Nunca', 'Ocasional'],
    estres: ['Alto', 'Medio', 'Bajo'],
};

export default function DatosAdicionales({ onPredict }) {
    const [seleccion, setSeleccion] = useState({});

    const handleSelect = (campo, valor) => {
        setSeleccion({ ...seleccion, [campo]: valor });
    };

    const handlePrediccion = () => {
        if (onPredict) {
            onPredict(seleccion);
        }
    };


    return (
        <div className="form-container">
            <div className="left-panel">
                <h1>HyperClass</h1>
                <p>Hypertension Classifier</p>
                <img className='logo' src={LogoHC} alt="" />
            </div>
            <div className="right-panel">
                <h3>Selecciona la respuesta</h3>
                <hr style={{ marginBottom: '20px' }} />
                {Object.entries(opciones).map(([campo, valores]) => (
                    <div key={campo} className="radio-group">
                        <label>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</label>
                        <div className="radio-options">
                            {valores.map((valor) => (
                                <button
                                    key={valor}
                                    onClick={() => handleSelect(campo, valor)}
                                    className={seleccion[campo] === valor ? 'active' : ''}
                                >
                                    {valor}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="button-container">
                    <button className="primary" onClick={handlePrediccion}>Predecir</button>
                </div>
            </div>
        </div>
    );
}
