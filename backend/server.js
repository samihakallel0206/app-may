require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Validation des variables d'environnement requises
const requiredEnvVars = ["DB_URL", "JWT_SECRET"];
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(
    "❌ Variables d'environnement manquantes:",
    missingVars.join(", ")
  );
  console.error(
    "💡 Créez un fichier .env avec les variables requises (voir ENV_SETUP.md)"
  );
  process.exit(1);
}

const connectDB = require("./config/connectDB");
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth_route"));
app.use("/api/users", require("./routes/users"));
app.use("/api/forfaits", require("./routes/forfaits"));
app.use("/api/products", require("./routes/products"));
app.use("/api/challenges", require("./routes/challenges"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  err
    ? console.log(err)
    : console.log(
        `Server running on port ${PORT}  on http://localhost:${PORT} `
      );
});
