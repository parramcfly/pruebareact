import { useState } from "react";

function App() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [edad, setEdad] = useState("");
  const [factorActividad, setFactorActividad] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");

  const calcularCalorias = (e) => {
    e.preventDefault();

    setError("");
    setResultado(null);

    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);
    const edadNum = parseInt(edad);
    const factorNum = parseFloat(factorActividad);

    if (
      !peso ||
      !altura ||
      !edad ||
      !factorActividad
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (pesoNum <= 0) {
      setError("El peso debe ser mayor que 0.");
      return;
    }

    if (alturaNum <= 0) {
      setError("La altura debe ser mayor que 0.");
      return;
    }

    if (edadNum <= 0) {
      setError("La edad debe ser mayor que 0.");
      return;
    }

    if (factorNum < 1.2 || factorNum > 1.9) {
      setError(
        "El factor de actividad debe estar entre 1.2 y 1.9."
      );
      return;
    }

    const calorias =
      (10 * pesoNum) +
      (6.25 * alturaNum) -
      (5 * edadNum) +
      (500 * factorNum);

    let categoria = "";
    let clase = "";

    if (calorias > 2500) {
      categoria = "Superávit / Muy Alto";
      clase = "danger";
    } else if (calorias >= 2000 && calorias <= 2500) {
      categoria = "Mantenimiento Estándar";
      clase = "warning";
    } else {
      categoria = "Déficit / Bajo";
      clase = "secondary";
    }

    setResultado({
      calorias: calorias.toFixed(2),
      categoria,
      clase,
    });
  };

  const estilosResultado = {
    danger: {
      backgroundColor: "#dc3545",
      color: "white",
    },
    warning: {
      backgroundColor: "#ffc107",
      color: "black",
    },
    secondary: {
      backgroundColor: "#6c757d",
      color: "white",
    },
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        fontFamily: "Arial",
      }}
    >
      <h1>Calculadora de Calorías Diarias</h1>

      <form onSubmit={calcularCalorias}>
        <div style={{ marginBottom: "10px" }}>
          <label>Peso (kg):</label>
          <input
            type="number"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            className="form-control"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Altura (cm):</label>
          <input
            type="number"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            className="form-control"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Edad (años):</label>
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            className="form-control"
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Factor de Actividad (1.2 - 1.9):</label>
          <input
            type="number"
            step="0.1"
            value={factorActividad}
            onChange={(e) => setFactorActividad(e.target.value)}
            className="form-control"
          />
        </div>

        <button type="submit">
          Calcular
        </button>
      </form>

      {error && (
        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            backgroundColor: "#f8d7da",
            color: "#842029",
            borderRadius: "5px",
          }}
        >
          {error}
        </div>
      )}

      {resultado && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            borderRadius: "8px",
            ...estilosResultado[resultado.clase],
          }}
        >
          <h2>Resultado</h2>
          <p>
            <strong>Calorías:</strong>{" "}
            {resultado.calorias} kcal
          </p>
          <p>
            <strong>Estado:</strong>{" "}
            {resultado.categoria}
          </p>
          <p>
            <strong>Alerta:</strong>{" "}
            {resultado.clase.toUpperCase()}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;