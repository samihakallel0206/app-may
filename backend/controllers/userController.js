const User = require("../models/User");

const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

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
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { firstName, lastName, email } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    res.json({
      success: true,
      message: "Profil mis à jour avec succès",
      data: { user },
    });
  } catch (error) {
    console.error("Erreur mise à jour profil:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Cet email est déjà utilisé",
      });
    }

    res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour du profil",
    });
  }
};

const updateForfait = async (req, res) => {
  try {
    const userId = req.userId;
    const { data, minutes, sms } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    if (data !== undefined) user.forfait.data = data;
    if (minutes !== undefined) user.forfait.minutes = minutes;
    if (sms !== undefined) user.forfait.sms = sms;

    await user.save();

    res.json({
      success: true,
      message: "Forfait mis à jour avec succès",
      data: { user },
    });
  } catch (error) {
    console.error("Erreur mise à jour forfait:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour du forfait",
    });
  }
};

const getConsommation = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    const consommation = {
      data: {
        used: Math.floor(Math.random() * user.forfait.data * 0.8),
        total: user.forfait.data,
      },
      minutes: {
        used: Math.floor(Math.random() * user.forfait.minutes * 0.7),
        total: user.forfait.minutes,
      },
      sms: {
        used: Math.floor(Math.random() * user.forfait.sms * 0.6),
        total: user.forfait.sms,
      },
      solde: user.solde,
    };

    res.json({
      success: true,
      data: { consommation },
    });
  } catch (error) {
    console.error("Erreur récupération consommation:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updateForfait,
  getConsommation,
};
