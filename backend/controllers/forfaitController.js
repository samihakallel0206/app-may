const User = require("../models/User");

const forfaitList = [
  {
    id: 1,
    name: "Forfait Start",
    price: 15,
    data: 5,
    minutes: 60,
    sms: 30,
    description: "Parfait pour les petits utilisateurs",
    popular: false,
  },
  {
    id: 2,
    name: "Forfait Pro",
    price: 25,
    data: 10,
    minutes: 100,
    sms: 50,
    description: "Idéal pour un usage professionnel",
    popular: true,
  },
  {
    id: 3,
    name: "Forfait Premium",
    price: 40,
    data: 20,
    minutes: 200,
    sms: 100,
    description: "Pour les gros consommateurs",
    popular: false,
  },
  {
    id: 4,
    name: "Forfait Illimité",
    price: 60,
    data: 50,
    minutes: 300,
    sms: 200,
    description: "Pour les vrais passionnés",
    popular: false,
  },
];

const getForfaits = async (req, res) => {
  try {
    res.json({
      success: true,
      data: { forfaits: forfaitList },
    });
  } catch (error) {
    console.error("Erreur récupération forfaits:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
    });
  }
};

const purchaseForfait = async (req, res) => {
  try {
    const userId = req.userId;
    const { forfaitId } = req.body;
    const selectedForfaitId = Number(forfaitId);

    const forfait = forfaitList.find((item) => item.id === selectedForfaitId);

    if (!forfait) {
      return res.status(400).json({
        success: false,
        message: "Forfait non trouvé",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    }

    if (user.solde < forfait.price) {
      return res.status(400).json({
        success: false,
        message: "Solde insuffisant",
      });
    }

    user.solde -= forfait.price;
    user.forfait.data += forfait.data;
    user.forfait.minutes += forfait.minutes;
    user.forfait.sms += forfait.sms;

    await user.save();

    res.json({
      success: true,
      message: "Forfait acheté avec succès",
      data: {
        user,
        forfait: forfait.name,
      },
    });
  } catch (error) {
    console.error("Erreur achat forfait:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'achat du forfait",
    });
  }
};

const updateConsommation = async (req, res) => {
  try {
    const { dataUsed, minutesUsed, smsUsed } = req.body;

    res.json({
      success: true,
      message: "Consommation mise à jour",
      data: {
        consommation: {
          dataUsed: dataUsed || 0,
          minutesUsed: minutesUsed || 0,
          smsUsed: smsUsed || 0,
        },
      },
    });
  } catch (error) {
    console.error("Erreur mise à jour consommation:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
    });
  }
};

module.exports = {
  getForfaits,
  purchaseForfait,
  updateConsommation,
};
