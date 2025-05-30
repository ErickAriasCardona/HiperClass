from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import pickle
from fastapi.middleware.cors import CORSMiddleware

# Cargar modelo y columnas
with open("modelo_entrenado.pkl", "rb") as f:
    model = pickle.load(f)

with open("columnas_modelo.pkl", "rb") as f:
    columnas_modelo = pickle.load(f)

# Crear app
app = FastAPI()

# Configurar CORS para permitir peticiones desde frontend
origins = [
    "https://hiper-class-2mhq.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Esquema de entrada ajustado con todos los campos que el modelo requiere
class DatosPaciente(BaseModel):
    Edad: int
    Peso: float
    Estatura: float
    Presion_arterial_sistolica: int
    Presion_arterial_diastolica: int
    Frecuencia_cardiaca: int
    IMC: float
    Sexo: str
    Diabetes: str
    Colesterol_alto: str
    Fumador: str
    Sedentarismo: str
    Antecedentes_familiares_hipertension: str
    Consumo_sal: str
    Consumo_alcohol: str
    Nivel_estres: str

@app.post("/predecir")
def predecir(data: DatosPaciente):
    df = pd.DataFrame([data.dict()])

    df.rename(columns={
    'Presion_arterial_sistolica': 'Presión arterial sistólica',
    'Presion_arterial_diastolica': 'Presión arterial diastólica',
    'Colesterol_alto': 'Colesterol alto',
    'Antecedentes_familiares_hipertension': 'Antecedentes familiares de hipertensión',
    'Consumo_sal': 'Consumo de sal',
    'Consumo_alcohol': 'Consumo de alcohol',
    'Nivel_estres': 'Nivel de estrés'
}, inplace=True)


    df_dummies = pd.get_dummies(df, drop_first=True)

    df_dummies = df_dummies.reindex(columns=columnas_modelo, fill_value=0)


    pred = model.predict(df_dummies)[0]
    print("Predicción realizada:", pred)
    # -------------------

    control_msg = "No necesariamente controlada" if pred == 'Normotensión' else "Debe ser controlada"

    return {
        "prediccion": pred,
        "control": control_msg
    }


@app.get("/")
def root():
    return {"mensaje": "API en Railway funcionando ✅"}