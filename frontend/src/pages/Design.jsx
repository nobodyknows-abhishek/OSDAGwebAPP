// src/pages/DesignPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const DesignPage = () => {
  const [beams, setBeams] = useState([]);
  const [columns, setColumns] = useState([]);
  const [beamId, setBeamId] = useState("");
  const [columnId, setColumnId] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchBeams();
    fetchColumns();
  }, []);

  const fetchBeams = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/beams/");
    setBeams(res.data);
  };

  const fetchColumns = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/columns/");
    setColumns(res.data);
  };

  const calculateConnection = async () => {
    try {
      // Example: /api/calculate/?beam_id=...&column_id=...
      const res = await axios.get(
        `http://127.0.0.1:8000/api/calculate/?beam_id=${beamId}&column_id=${columnId}`
      );
      setResult(res.data);
    } catch (err) {
      console.error("Error calculating connection:", err);
    }
  };

  return (
    <div >
      <h2>Design Calculation</h2>
      <div style={styles.form}>
        <label style={styles.input }>Select Beam:</label>
        <select style={styles.input } value={beamId} onChange={(e) => setBeamId(e.target.value)}>
          <option value="">--Select--</option>
          {beams.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        <label style={styles.input }>Select Column:</label>
        <select style={styles.input }value={columnId} onChange={(e) => setColumnId(e.target.value)}>
          <option value="">--Select--</option>
          {columns.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <button style={styles.button }onClick={calculateConnection}>Calculate</button>
      </div>

      {result && (
        <div style={styles.result}>
          <h3>Calculation Result</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    width: "578px",
    height: "auto",
   
  },
  input: {
    marginBottom: "22px",
    padding: "2px",
    fontSize: "19px",
  },
  button: {
    marginTop: "20px",
    padding: "8px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
  },
  result: {
    marginTop: "20px",
    backgroundColor: "#f9f9f9",
    color: "#000",
    padding: "10px",
  },
};

export default DesignPage;
