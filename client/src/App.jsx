import React, { useState } from 'react';
import DatosBasicos from './Components/DatosBasicos';
import DatosAdicionales from './Components/DatosAdicionales';
import './Components/FormStyles.css'; // Asegúrate que los estilos estén aquí

function App() {
  const [pantalla, setPantalla] = useState('basicos');
  const [datosBasicos, setDatosBasicos] = useState({});
  const [resultado, setResultado] = useState('');

  const handleNext = (datos) => {
    setDatosBasicos(datos);
    setPantalla('adicionales');
  };

  const handlePrediccion = async (datosAdicionales) => {
    const datosCombinados = { ...datosBasicos, ...datosAdicionales };

    const datosFinales = {
      Edad: parseInt(datosCombinados.edad),
      Peso: parseFloat(datosCombinados.peso),
      Estatura: parseFloat(datosCombinados.estatura),
      Sexo: datosCombinados.sexo,
      Presion_arterial_sistolica: parseInt(datosCombinados.sistolica),
      Presion_arterial_diastolica: parseInt(datosCombinados.diastolica),
      Frecuencia_cardiaca: parseInt(datosCombinados.frecuencia),
      IMC: parseFloat((datosCombinados.peso / Math.pow(datosCombinados.estatura, 2)).toFixed(2)),
      Diabetes: datosCombinados.diabetes,
      Colesterol_alto: datosCombinados.colesterol,
      Fumador: datosCombinados.fumador,
      Sedentarismo: datosCombinados.sedentarismo,
      Antecedentes_familiares_hipertension: datosCombinados.antecedentes,
      Consumo_sal: datosCombinados.sal,
      Consumo_alcohol: datosCombinados.alcohol,
      Nivel_estres: datosCombinados.estres,
    };

    try {
      const response = await fetch('https://backhyperclass-production.up.railway.app/predecir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosFinales),
      });

      const data = await response.json();
      console.log('Respuesta del backend:', data);

      setResultado({
        prediccion: data.prediccion,
        control: data.control, 
      });

    } catch (error) {
      console.error('Error al conectar con el backend:', error);
      setResultado('Hubo un error en la predicción');
    }
  };

  return (
    <>
      {pantalla === 'basicos' ? (
        <DatosBasicos onNext={handleNext} />
      ) : (
        <DatosAdicionales onPredict={handlePrediccion} />
      )}

      {/* Aquí va el modal de alerta */}
      {resultado && (
        <AlertaResultado
          mensaje={`${resultado.prediccion}. ${resultado.control}`}
          onClose={() => window.location.reload()}
        />
      )}


    </>
  );
}

// Modal de resultado
const AlertaResultado = ({ mensaje, onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Resultado de Predicción</h2>
      <p>{mensaje}</p>
      <button className="primary"
        onClick={onClose}>Cerrar</button>
    </div>
  </div>
);

export default App;
