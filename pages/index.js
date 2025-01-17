import { useState } from "react";

export default function Home() {
  const [rut, setRut] = useState("");
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const buscarDatos = async (e) => {
    e.preventDefault();
    setError("");
    setResultados([]);
    setLoading(true);

    try {
      const response = await fetch("/api/buscarRut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rut }),
      });

      if (!response.ok) {
        throw new Error(await response.json().then((res) => res.message));
      }

      const data = await response.json();
      setResultados(data.datos); // Todas las coincidencias se guardan en `resultados`
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Logo */}
      <div>
        <img
          src="https://bestwork.cl/wp-content/uploads/2023/05/Logo.png"
          alt="BestWork Logo"
          className="logo"
        />
      </div>

      {/* Título */}
      <h1 className="title">Revisa aquí el link del día</h1>
      <p className="subtitle">Si no encuentras tu link, ¡contáctanos!</p>

      {/* Formulario */}
      <form onSubmit={buscarDatos} className="form">
        <input
          type="text"
          placeholder="Ingresa tu RUT (Ej: 12345678-9)"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {/* Mensaje de error */}
      {error && <p className="error">{error}</p>}

      {/* Tabla de Resultados */}
      {resultados.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>RUT</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Link Taller</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((fila, index) => (
              <tr key={index}>
                <td>{fila[0]}</td>
                <td>{fila[1]}</td>
                <td>{fila[2]}</td>
                <td>{fila[3]}</td>
                <td>
                  <a href={fila[4]} target="_blank" rel="noopener noreferrer">
                    Ver Taller
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Estilos CSS dinámicos */}
      <style jsx>{`
        .container {
          padding: 2rem;
          font-family: Arial, sans-serif;
          text-align: center;
          background-color: #f7f8fa;
        }

        .logo {
          max-width: 200px;
          margin-bottom: 1rem;
        }

        .title {
          color: #ff6600;
          font-size: 2rem;
          margin-bottom: 1rem;
          font-weight: bold;
        }

        .subtitle {
          color: #444;
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }

        .form {
          margin-bottom: 2rem;
        }

        .input {
          padding: 0.7rem;
          width: 300px;
          border: 1px solid #ddd;
          border-radius: 5px;
          margin-right: 1rem;
          font-size: 1rem;
        }

        .button {
          padding: 0.7rem 1.5rem;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: bold;
          box-shadow: 0px 4px 6px rgba(0, 123, 255, 0.3);
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .button:hover {
          background-color: #0056b3;
          transform: translateY(-2px);
        }

        .button:active {
          background-color: #004080;
          transform: translateY(0);
        }

        .error {
          color: #ff0000;
          font-size: 1rem;
          margin-top: 1rem;
        }

        .table {
          width: 80%;
          margin: 0 auto;
          border-collapse: collapse;
          background-color: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }

        .table th {
          background-color: #007bff;
          color: #fff;
          padding: 1rem;
          font-size: 1rem;
          text-align: center;
        }

        .table td {
          padding: 0.8rem;
          text-align: center;
          border-bottom: 1px solid #ddd;
        }

        a {
          color: #007bff;
          font-weight: bold;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        /* Modo oscuro */
        @media (prefers-color-scheme: dark) {
          .container {
            background-color: #121212;
            color: #e0e0e0;
          }

          .input {
            border: 1px solid #555;
            background-color: #222;
            color: #e0e0e0;
          }

          .table {
            background-color: #222;
            color: #e0e0e0;
          }

          .table th {
            background-color: #333;
          }

          .table td {
            border-bottom: 1px solid #444;
          }

          a {
            color: #4da3ff;
          }

          .button {
            background-color: #0056b3;
          }

          .button:hover {
            background-color: #004080;
          }
        }
      `}</style>
    </div>
  );
}
