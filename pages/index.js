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
        }

        .logo {
          max-width: 200px;
          margin-bottom: 1rem;
        }

        .title {
          color: var(--primary-color);
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }

        .subtitle {
          color: var(--secondary-color);
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }

        .form {
          margin-bottom: 2rem;
        }

        .input {
          padding: 0.5rem;
          width: 300px;
          border: 1px solid var(--border-color);
          border-radius: 5px;
          margin-right: 1rem;
        }

        .button {
          padding: 0.5rem 1rem;
          background-color: var(--button-bg);
          color: var(--button-text);
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .error {
          color: red;
          margin-top: 1rem;
        }

        .table {
          width: 80%;
          margin: 0 auto;
          border-collapse: collapse;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        }

        .table th {
          background-color: var(--table-header-bg);
          color: var(--table-header-text);
          padding: 0.5rem;
        }

        .table td {
          padding: 0.5rem;
          text-align: center;
          border-bottom: 1px solid var(--table-border-color);
        }

        a {
          color: var(--link-color);
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        /* Variables para temas */
        :root {
          --primary-color: #ff9900;
          --secondary-color: #666;
          --border-color: #ccc;
          --button-bg: #007bff;
          --button-text: #fff;
          --table-header-bg: #007bff;
          --table-header-text: #fff;
          --table-border-color: #ddd;
          --link-color: #007bff;
        }

        /* Tema oscuro */
        @media (prefers-color-scheme: dark) {
          :root {
            --primary-color: #ffcc00;
            --secondary-color: #bbb;
            --border-color: #444;
            --button-bg: #0056b3;
            --button-text: #fff;
            --table-header-bg: #0056b3;
            --table-header-text: #fff;
            --table-border-color: #555;
            --link-color: #4da3ff;
          }

          body {
            background-color: #121212;
            color: #e0e0e0;
          }
        }
      `}</style>
    </div>
  );
}
