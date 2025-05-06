import React, { useState } from "react";
import "./AdminDashboard.css";
import AddSheepForm from "../Admin/AddSheepForm";

const AdminDashboard = () => {
  const [selectedAnimal, setSelectedAnimal] = useState("sheep");
  const [selectedAction, setSelectedAction] = useState("view");

  const animalTypes = ["sheep", "cow", "goat", "horse"];
  const actions = ["add", "view", "update", "delete"];

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Dashboard</h2>

        {/* Animal Types */}
        <div className="sidebar-section">
          <h3>Animal Types</h3>
          <ul>
            {animalTypes.map((animal) => (
              <li
                key={animal}
                onClick={() => setSelectedAnimal(animal)}
                className={selectedAnimal === animal ? "selected" : ""}
              >
                {animal.charAt(0).toUpperCase() + animal.slice(1)}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="sidebar-section">
          <h3>Actions</h3>
          <ul>
            {actions.map((action) => (
              <li
                key={action}
                onClick={() => setSelectedAction(action)}
                className={selectedAction === action ? "selected" : ""}
              >
                {action.charAt(0).toUpperCase() + action.slice(1)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Panel */}
      <div className="main-panel">
        <h2>
          {selectedAction.charAt(0).toUpperCase() + selectedAction.slice(1)}{" "}
          {selectedAnimal.charAt(0).toUpperCase() + selectedAnimal.slice(1)}
        </h2>

        {/* Conditional rendering of forms */}
        {selectedAnimal === "sheep" && selectedAction === "add" ? (
          <AddSheepForm />
        ) : (
          <p>This is where the {selectedAction} form for {selectedAnimal}s will go.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
