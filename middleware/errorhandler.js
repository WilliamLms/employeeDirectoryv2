function checkAuthorization(req, res, next) {
  const token = req.header("authorization");
  if (token) {
    next(); 
  } else {
    res.status(403).send("Please log in"); 
  }
}

function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.status === 404) {
    return res.status(404).send("Not Found");
  }
res.status(500).json({ error: "Internal Server Error" });
}

module.exports = { checkAuthorization, errorHandler };
