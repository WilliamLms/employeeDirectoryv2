const express = require("express");
const app = express();
const employeeRouter = require("./routes/employees");
const {
  checkAuthorization,
  errorHandler,
} = require("./middleware/errorhandler");

const PORT = 3000;

app.use(express.json());
app.use(checkAuthorization);
app.use("/employees", employeeRouter);
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});
app.use(errorHandler);

app.get("/", (req, res, next) => {
  res.send("Hello employees!");
});

const employees = require("./employees");

app.get("/employees", (req, res, next) => {
  res.json(employees);
});

app.get("/employees/random", (req, res, next) => {
  const i = Math.floor(Math.random() * employees.length);
  res.json(employees[i]);
});

app.get("/employees/:id", (req, res, next) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send(`There is no employee with id ${id}.`);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

