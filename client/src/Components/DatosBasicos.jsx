import React, { useState } from 'react';
import './FormStyles.css';

export default function DatosBasicos({ onNext }) {
  const [datos, setDatos] = useState({
    edad: '',
    peso: '',
    estatura: '',
    sistolica: '',
    diastolica: '',
    frecuencia: '',
  });

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onNext(datos);
  };

  return (
    <div className="form-container">
      <div className="left-panel">
        <h1>HyperClass</h1>
        <p>Hypertension Classifier</p>
        <div className="logo">🤖</div>
      </div>
      <div className="right-panel">
        <p>Este asistente usa inteligencia artificial para predecir tu posible tipo de hipertensión a partir de tus datos. <br /><strong>Es una guía orientativa, no un diagnóstico médico.</strong></p>
        <hr style={{ margin: '20px 0' }} />
        <h3>Por favor ingresa los siguientes datos</h3>

        {['edad', 'peso', 'estatura', 'sistolica', 'diastolica', 'frecuencia'].map((campo) => (
          <div key={campo} className="input-group">
            <label htmlFor={campo}>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</label>
            <input
              type="number"
              id={campo}
              name={campo}
              value={datos[campo]}
              onChange={handleChange}
            />
          </div>
        ))}

        <div className="button-container">
          <button className="primary" onClick={handleSubmit}>Siguiente</button>
        </div>
      </div>
    </div>
  );
}
