// src/pages/BeamPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const BeamPage = () => {
  const [beams, setBeams] = useState([]);
  const [name, setName] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  // Fetch existing beams on component load
  useEffect(() => {
    fetchBeams();
  }, []);

  const fetchBeams = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/beams/");
      setBeams(res.data);
    } catch (err) {
      console.error("Error fetching beams:", err);
    }
  };

  const createBeam = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/beams/", {
        name,
        length,
        width,
        height,
      });
      // Refresh the beam list
      fetchBeams();
      // Reset form
      setName("");
      setLength("");
      setWidth("");
      setHeight("");
    } catch (err) {
      console.error("Error creating beam:", err);
    }
  };

  return (
    <div style={{ padding: "0px" }}>
      <h2>Beam Member</h2>
      <form onSubmit={createBeam} style={styles.form}>
        <label>Name:</label>
        <input style={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Length:</label>
        <input  style={styles.input}
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />

        <label>Width:</label>
        <input style={styles.input}
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />

        <label>Height:</label>
        <input style={styles.input}
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />

        <button style={styles.button} type="submit">Create Beam</button>
      </form>

      <h3>Existing Beams</h3>
      <ul>
        {beams.map((beam) => (
          <li key={beam.id}>
            {beam.name} (L={beam.length}, W={beam.width}, H={beam.height})
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
    height: "auto",
   
  },
  input: {
    marginBottom: "22px",
    padding: "2px",
    fontSize: "19px",
  },
  button: {
    padding: "8px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
  },
};

export default BeamPage;
