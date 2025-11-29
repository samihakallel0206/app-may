const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.DB_URL) {
      console.error('❌ DB_URL n\'est pas défini dans le fichier .env');
      console.error('💡 Créez un fichier .env avec DB_URL (voir ENV_SETUP.md)');
      process.exit(1);
    }

    await mongoose.connect(process.env.DB_URL);
    console.log('✅ DB connected successfully');
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error.message);
    console.error('💡 Vérifiez que:');
    console.error('   1. MongoDB est démarré');
    console.error('   2. DB_URL dans .env est correct');
    console.error('   3. Vous avez accès à la base de données');
    // Ne pas arrêter le processus, mais afficher un avertissement
    // Le serveur peut démarrer mais les routes nécessitant la DB échoueront
  }
};

module.exports = connectDB;

