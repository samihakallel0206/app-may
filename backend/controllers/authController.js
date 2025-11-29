const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    const missingFields = [];
    if (!firstName || firstName.trim() === "") missingFields.push("firstName");
    if (!lastName || lastName.trim() === "") missingFields.push("lastName");
    if (!email || email.trim() === "") missingFields.push("email");
    if (!phone || phone.trim() === "") missingFields.push("phone");
    if (!password || password.trim() === "") missingFields.push("password");

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Champs manquants: ${missingFields.join(", ")}`,
        missingFields,
      });
    }

    const phoneRegex = /^[0-9]{8}$/;
    if (!phoneRegex.test(phone.trim())) {
      return res.status(400).json({
        success: false,
        message: "Le numéro de téléphone doit contenir exactement 8 chiffres",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Format d'email invalide",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Le mot de passe doit contenir au moins 6 caractères",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phone.trim();

    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { phone: normalizedPhone }],
    });

    if (existingUser) {
      const duplicateField =
        existingUser.email === normalizedEmail ? "email" : "phone";
      return res.status(400).json({
        success: false,
        message: `Un utilisateur avec ce ${
          duplicateField === "email" ? "email" : "numéro de téléphone"
        } existe déjà`,
      });
    }

    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      phone: normalizedPhone,
      password: password,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      success: true,
      message: "Compte créé avec succès",
      token,
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          forfait: user.forfait,
          solde: user.solde,
        },
      },
    });
  } catch (error) {
    console.error("Erreur inscription:", error);
    console.error("Détails de l'erreur:", {
      name: error.name,
      message: error.message,
      code: error.code,
      errors: error.errors,
    });

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
        errors: error.errors,
      });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `Un utilisateur avec ce ${
          field === "email" ? "email" : "numéro de téléphone"
        } existe déjà`,
      });
    }

    if (error.name === "MongoServerError" || error.name === "MongooseError") {
      return res.status(500).json({
        success: false,
        message: "Erreur de connexion à la base de données",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }

    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la création du compte",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Numéro de téléphone et mot de passe requis",
      });
    }

    const user = await User.findOne({ phone }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Numéro de téléphone ou mot de passe incorrect",
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Numéro de téléphone ou mot de passe incorrect",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Configuration serveur invalide",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({
      success: true,
      message: "Connexion réussie",
      token,
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          forfait: user.forfait,
          solde: user.solde,
        },
      },
    });
  } catch (error) {
    console.error("Erreur connexion:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la connexion",
    });
  }
};

const getMe = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token non fourni",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Configuration serveur invalide",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    res.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    console.error("Erreur récupération profil:", error);
    res.status(401).json({
      success: false,
      message: "Token invalide",
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
};
