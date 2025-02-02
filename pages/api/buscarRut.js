import { google } from "googleapis";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido. Usa POST." });
  }

  const { rut } = req.body;

  if (!rut) {
    return res.status(400).json({ message: "El RUT es obligatorio." });
  }

  try {
    // Configuración del cliente de Google
    const auth = new google.auth.JWT(
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/spreadsheets.readonly"]
    );

    const sheets = google.sheets({ version: "v4", auth });

    // Leer datos desde Google Sheets
    const { data } = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "A1:F1000", // Rango que incluye todas las columnas necesarias
    });

    const rows = data.values;

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "No se encontraron datos en la hoja." });
    }

    // Filtrar todas las filas que coincidan con el RUT
    const resultados = rows.filter((row) => row[1]?.trim().toLowerCase() === rut.trim().toLowerCase());

    if (resultados.length === 0) {
      return res.status(404).json({ message: "No se encontraron datos para este RUT." });
    }

    return res.status(200).json({ datos: resultados });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al buscar en Google Sheets." });
  }
}
