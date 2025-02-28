const express = require("express");
const router = express.Router();
const employees = require("../employees"); 

router.get("/", (req, res) => {
  res.json(employees);
});

router.get("/random", (req, res) => {
  if (employees.length === 0) {
    return res.status(404).json({ error: "No employees available" });
  }

  const randomIndex = Math.floor(Math.random() * employees.length);
  res.json(employees[randomIndex]);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === Number(id));

  if (!employee) {
    return res.status(404).json({ error: `No employee found with ID ${id}` });
  }

  res.json(employee);
});


// Add a new employee
router.post("/", (req, res) => {
  const { name } = req.body;

  if (!name?.trim()) {
    return res.status(400).json({ error: "Name is required and must be valid" });
  }

  // Ensure Unique ID
  const maxId = employees.reduce((max, emp) => Math.max(max, emp.id), 0);
  const newEmployee = {
    id: maxId + 1,
    name: name.trim(),
  };

  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

module.exports = router;
