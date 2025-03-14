// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import StartPage from "./pages/StartPage";
import BeamPage from "./pages/BeamPage";
import ColumnPage from "./pages/ColumnPage";
import LoadPage from "./pages/LoadPage";
import DesignPage from "./pages/Design";

function App() {
  return (
    <Router>
      <div style={styles.container}>
        <Sidebar />
        <div style={styles.content}>
          <Routes>
            <Route path="/start" element={<StartPage />} />
            <Route path="/beam" element={<BeamPage />} />
            <Route path="/column" element={<ColumnPage />} />
            <Route path="/loads" element={<LoadPage />} />
            <Route path="/design" element={<DesignPage />} />
            {/* Default route -> StartPage */}
            <Route path="/" element={<StartPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    
    backgroundColor: "#1a1a1a",
    color: "#fff",
  },
  content: {
    flex: 1,
    padding: "79px",
    width: "100%",
    overflowY: "auto",

  },
};

export default App;
