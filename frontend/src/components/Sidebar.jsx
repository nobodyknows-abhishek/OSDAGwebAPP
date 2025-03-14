// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const menuItems = [
  { name: "StartPage", path: "/start" },
  { name: "Beam Member", path: "/beam" },
  { name: "Column Member", path: "/column" },
  { name: "Load Calculation", path: "/loads" }, // Example for EndPlate
  { name: "Design", path: "/design" },
];

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Connection Module</h2>
      <ul style={styles.menuList}>
        {menuItems.map((item) => (
          <li key={item.name} style={styles.menuItem}>
            <Link to={item.path} style={styles.link}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "250px",
    backgroundColor: "#3a3a3a",
    color: "#fff",
    padding: "20px",
  },
  title: {
    marginBottom: "15px",
    fontSize: "24px",
  },
  menuList: {
    listStyleType: "none",
    padding: 10 
  },
  menuItem: {
    margin: "8px 8px 8px 0",
    padding: "10px",
    cursor: "pointer",
  },
  link: {
    color:"white",
    textDecoration: "none",
  },
};

export default Sidebar;
