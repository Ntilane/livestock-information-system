import React, { useState } from "react";
import "./SheepForms.css";

const AddSheepForm = () => {
  const [formData, setFormData] = useState({
    species: "",
    heard_id: "",
    heard_count: "",
    national_id: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/animals/addsheeps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.message || "Sheep record added");
    } catch (error) {
      console.error("Error adding sheep:", error);
    }
  };

  return (
    <form className="sheep-form" onSubmit={handleSubmit}>
      <h3>Ngolisa Linku</h3>
      <label>Mofuta:</label>
      <input type="text" name="species" value={formData.species} onChange={handleChange} required />
      <label>Letsoao:</label>
      <input type="text" name="heard_id" value={formData.heard_id} onChange={handleChange} required />
      <label>Palo:</label>
      <input type="number" name="heard_count" value={formData.heard_count} onChange={handleChange} required />
      <label>National ID:</label>
      <input type="text" name="national_id" value={formData.national_id} onChange={handleChange} required />
      <button type="submit">Add Sheep</button>
    </form>
  );
};

export default AddSheepForm;
