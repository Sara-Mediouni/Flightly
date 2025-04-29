# 🌍✈️ **Flightly**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
---

## 📚 **Table des matières**

- [✨ Présentation](#-présentation)
- [🛠️ Stack Technique](#️-stack-technique)
- [📸 Aperçu](#-aperçu)
- [🚀 Lancer localement](#-lancer-localement)
- [📋 Fonctionnalités principales](#-fonctionnalités-principales)
- [⚠️ Remarque](#️-remarque)


---

## ✨ **Présentation**

Une plateforme moderne de réservation de **vols** ✈️, **hôtels** 🏨 et **resorts** 🏖️, conçue pour offrir une expérience fluide, rapide et agréable aux utilisateurs.

---

## 🛠️ **Stack Technique**

- **Frontend** : React.js
- **Backend** : Node.js + Express.js
- **Base de données** : MongoDB
- **Paiement** : Stripe API (ou autre service)



---

## 📸 **Aperçu**


> ![Preview](https://flightly-21xm.vercel.app)

---

## 🚀 **Lancer localement**

```bash
# 1. Cloner le dépôt
git clone https://github.com/Sara-Mediouni/Flightly.git

# 2. Accéder au projet
cd flightly

# 3. Installer les dépendances
cd flightly && npm install
cd backend && npm install
cd admin && npm install

# 4. Configurer le backend
Créer un fichier `.env` dans `/backend` avec :
- MONGO_URI = votre URI MongoDB
- PORT = 4000 (ou autre)

# 5. Lancer l'application
# Démarrer backend
nodemon server

# Démarrer frontend (dans un autre terminal)
npm run dev
---
```
 ## 📋 Fonctionnalités principales
-🔎 Recherche de vols et hébergements.

-📅 Réservation rapide et simplifiée.

-👤 Gestion du compte utilisateur.

-🧾 Historique et suivi des réservations.

---

## ⚠️ Remarque
Nécessite MongoDB et Stripe pour finaliser les commandes.