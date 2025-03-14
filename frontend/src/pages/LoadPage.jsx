// src/pages/EndPlatePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const LoadPage = () => {
  const [connections, setConnections] = useState([]);
  const [plateThickness, setPlateThickness] = useState("");
  const [boltDiameter, setBoltDiameter] = useState("");
  const [boltGrade, setBoltGrade] = useState("");
  const [beamId, setBeamId] = useState("");
  const [columnId, setColumnId] = useState("");
  const [beams, setBeams] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetchConnections();
    fetchBeams();
    fetchColumns();
    
  }, []);

  const fetchConnections = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/loads/");
      setConnections(res.data);
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  const fetchBeams = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/beams/");
      setBeams(res.data);
    } catch (err) {
      console.error("Error fetching beams:", err);
    }
  };

  const fetchColumns = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/columns/");
      setColumns(res.data);
    } catch (err) {
      console.error("Error fetching columns:", err);
    }
  };

  const createConnection = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/loads/", {
        plate_thickness: plateThickness,
        bolt_diameter: boltDiameter,
        bolt_grade: boltGrade,
        beam: beamId,     // foreign key
        column: columnId, // foreign key
      });
      fetchConnections();
      setPlateThickness("");
      setBoltDiameter("");
      setBoltGrade("");
      setBeamId("");
      setColumnId("");
    } catch (err) {
      console.error("Error creating connection:", err);
    }
  };

  return (
    <div >
      <h2>End Plate Connections</h2>
      <form onSubmit={createConnection} style={styles.form}>
        <label>Beam:</label>
        <select value={beamId} onChange={(e) => setBeamId(e.target.value)}>
          <option value="">--Select Beam--</option>
          {beams.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        <label>Column:</label>
        <select value={columnId} onChange={(e) => setColumnId(e.target.value)}>
          <option value="">--Select Column--</option>
          {columns.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <label>Plate Thickness:</label>
        <input  style={styles.input}
          type="number"
          value={plateThickness}
          onChange={(e) => setPlateThickness(e.target.value)}
        />

        <label>Bolt Diameter:</label>
        <input  style={styles.input}
          type="number"
          value={boltDiameter}
          onChange={(e) => setBoltDiameter(e.target.value)}
        />

        <label>Bolt Grade:</label>
        <input  style={styles.input}
          type="text"
          value={boltGrade}
          onChange={(e) => setBoltGrade(e.target.value)}
        />

        <button style={styles.button} type="submit">Create Connection</button>
      </form>

      <h3>Existing End Plate Connections</h3>
      <ul>
        {connections.map((conn) => (
          <li key={conn.id}>
            Beam ID: {conn.beam} | Column ID: {conn.column} | Plate Thk: {conn.plate_thickness} | Bolt: {conn.bolt_diameter}, {conn.bolt_grade}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    width: "578px",
    

   
  },
  input: {
    marginBottom: "20px",
    padding: "4px",
    fontSize: "10px",
    
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
  },
};

export default LoadPage;
