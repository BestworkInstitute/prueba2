import { useState } from "react";

export default function Home() {
  const [rut, setRut] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  const buscarRut = async () => {
    setError(null);
    setResultado(null);

    try {
      const response = await fetch("/api/buscarRut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rut }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setResultado(data.datos);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Buscar RUT en Google Sheets</h1>
      <input
        type="text"
        placeholder="Ingresa el RUT"
        value={rut}
        onChange={(e) => setRut(e.target.value)}
        style={{ marginRight: "1rem", padding: "0.5rem" }}
      />
      <button onClick={buscarRut} style={{ padding: "0.5rem" }}>
        Buscar
      </button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {resultado && (
        <div>
          <h3>Resultado:</h3>
          <ul>
            {resultado.map((dato, index) => (
              <li key={index}>{dato}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
