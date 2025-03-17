const jwt = require("jsonwebtoken");

const secret = "your-secret-key";
const payload = { 
    username: "secret",
    sub: "d258d-6b2a-49f8-8fe9-0ea4878e0483", 
};

const token = jwt.sign(payload, secret, { expiresIn: "1h" });

console.log("Generated JWT:", token);
