const allowedOrigins = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", " POST");
  res.header(
    "Access-Control-Allow-Headers",
    req.header("access-control-request-headers")
  );
};

export default allowedOrigins;
