// src/pages/ColumnPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ColumnPage = () => {
  const [columns, setColumns] = useState([]);
  const [name, setName] = useState("");
   const [width, setWidth] = useState("");
   const [height, setHeight] = useState("");
  const [basePlateThickness, setBasePlateThickness] = useState("");
  const [flangeThickness, setFlangeThickness] = useState("");
  const [webThickness, setWebThickness] = useState("");

  useEffect(() => {
    fetchColumns();
  }, []);

  const fetchColumns = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/columns/");
      setColumns(res.data);
    } catch (err) {
      console.error("Error fetching columns:", err);
    }
  };

  const createColumn = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/columns/", {
        name,
        width,
        height,
        base_plate_thickness: basePlateThickness,
        flange_thickness: flangeThickness,
        web_thickness: webThickness,
      });
      fetchColumns();
      // Reset form
      setName("");
        setWidth("");
        setHeight("");
      setBasePlateThickness("");
      setFlangeThickness("");
      setWebThickness("");
    } catch (err) {
      console.error("Error creating column:", err);
    }
  };

return (
    <div >
        <h2>Column Member</h2>
        <form onSubmit={createColumn} style={styles.form}>
            <label>Name:</label>
            <input style={styles.input}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label>Width:</label>
            <input style={styles.input} 
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
            />

            <label>Height:</label>
            <input  style={styles.input}
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
            />

            <label>Base Plate Thickness:</label>
            <input  style={styles.input}
                type="number"
                value={basePlateThickness}
                onChange={(e) => setBasePlateThickness(e.target.value)}
            />

            <label>Flange Thickness:</label>
            <input style={styles.input}
                type="number"
                value={flangeThickness}
                onChange={(e) => setFlangeThickness(e.target.value)}
            />

            <label>Web Thickness:</label>
            <input  style={styles.input}
                type="number"
                value={webThickness}
                onChange={(e) => setWebThickness(e.target.value)}
            />

            <button style={styles.button} type="submit">Create Column</button>
        </form>

        <h3>Existing Columns</h3>
        <ul>
            {columns.map((col) => (
                <li key={col.id}>
                    {col.name} (Width={col.width}, Height={col.height}, Base={col.base_plate_thickness}, Flange={col.flange_thickness}, Web={col.web_thickness})
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
    marginBottom: "5px",
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


export default ColumnPage;
