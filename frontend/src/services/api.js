import axios from "axios";

// Configuration de base de l'API
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:1985/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token aux requêtes
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Gérer les erreurs HTTP
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Token expiré ou invalide
          localStorage.removeItem("token");
          window.location.href = "/login";
          break;
        case 403:
          // Accès refusé
          console.error("Accès refusé:", data.message);
          break;
        case 404:
          // Ressource non trouvée
          console.error("Ressource non trouvée:", data.message);
          break;
        case 500:
          // Erreur serveur
          console.error("Erreur serveur:", data.message);
          break;
        default:
          console.error("Erreur API:", data.message);
      }
    } else if (error.request) {
      // Pas de réponse du serveur
      console.error("Pas de réponse du serveur. Vérifiez votre connexion.");
    } else {
      // Erreur de configuration
      console.error("Erreur de configuration:", error.message);
    }

    return Promise.reject(error);
  }
);

// Services d'authentification
export const authAPI = {
  login: (credentials) => API.post("/auth/login", credentials),
  register: (userData) => API.post("/auth/register", userData),
  getProfile: () => API.get("/auth/me"),
};

// Services utilisateur
export const userAPI = {
  getProfile: () => API.get("/users/profile"),
  updateProfile: (data) => API.patch("/users/profile", data),
  updateForfait: (data) => API.patch("/users/forfait", data),
};

// Services forfaits
export const forfaitAPI = {
  getForfaits: () => API.get("/forfaits"),
  updateConsommation: (data) => API.patch("/forfaits/consommation", data),
};

// Services boutique
export const productAPI = {
  getProducts: () => API.get("/products"),
  getProduct: (id) => API.get(`/products/${id}`),
  createOrder: (data) => API.post("/orders", data),
};

// Services challenges
export const challengeAPI = {
  getChallenges: () => API.get("/challenges"),
  participate: (challengeId) =>
    API.post(`/challenges/${challengeId}/participate`),
  getLeaderboard: () => API.get("/challenges/leaderboard"),
};

export default API;
