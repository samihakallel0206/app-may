const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuth = async (req, res, next) => {
  try {
    // Vérifier si le token existe
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Token non fourni",
      });
    }

    // Extraire le token (format: "Bearer <token>")
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token non fourni",
      });
    }

    // Vérifier et décoder le token
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Configuration serveur invalide",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Rechercher l'utilisateur dans la base de données
    const foundUser = await User.findById(decoded.id);

    if (!foundUser) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    // Ajouter l'utilisateur à la requête
    req.user = foundUser;
    req.userId = foundUser._id;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Token invalide",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expiré",
      });
    }

    console.error("Erreur authentification:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la vérification du token",
    });
  }
};

module.exports = isAuth;

