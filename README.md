# 🌍✈️ Flightly


![Tests](https://img.shields.io/badge/tests-passing-brightgreen?style=for-the-badge)
![Coverage](https://img.shields.io/badge/coverage-90%25-yellowgreen?style=for-the-badge)
![GitHub Actions](https://img.shields.io/github/actions/workflow/status/Sara-Mediouni/AstroBite/tests.yml?style=for-the-badge)

![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

---

## 📚 Table des matières

- [✨ Présentation](#-présentation)
- [🛠️ Stack Technique](#️-stack-technique)
- [📸 Aperçu](#-aperçu)
- [🧱 Architecture & Services](#-architecture--services)
- [🧪 Tests](#-tests)
- [🚀 Lancer localement](#-lancer-localement)
- [📂 Organisation du projet](#-organisation-du-projet)
- [📋 Fonctionnalités principales](#-fonctionnalités-principales)
- [⚠️ Remarques](#️-remarques)

---

## ✨ Présentation

**Flightly** est une plateforme moderne de réservation de **vols**, **hébergements** et **resorts**. Elle propose une expérience rapide, fluide et agréable pour l’utilisateur comme pour l’administrateur.

---

## 🛠️ Stack Technique

## 🛠️ Stack Technique

| Domaine         | Outils & Technologies                          |
|-----------------|------------------------------------------------|
| Frontend        | React, TailwindCSS, Vite, Framer Motion        |
| Backend         | Node.js, Express.js                            |
| Authentification| JWT                                            |
| Base de données | MongoDB                                        |
| CI/CD           | GitHub Actions                                 |
| Tests           | Mocha, Chai, Sinon                             |
| Architecture    | Microservices + API Gateway                    |

---

## 📸 Aperçu

> 🔗 [Démo en ligne](https://flightly-21xm.vercel.app)

---

## 🧱 Architecture & Services

Flightly est conçu en architecture **microservices**, avec 5 services principaux :

| Service             | Description                        | Port par défaut |
|---------------------|------------------------------------|------------------|
| ✈️ Flight Service    | Gestion des vols                   | 4001             |
| 👤 User Service      | Gestion des utilisateurs           | 4003             |
| 🏨 Accommodation     | Gestion des hébergements/resorts   | 4002             |
| 🧾 Reservation Vols  | Gestion des réservations de vols   | 4004             |
| 🧾 Reservation Acc   | Gestion des réservations logement  | 4005             |

---

## 🧪 Tests

Des **tests unitaires Node.js** ont été intégrés pour valider la logique métier des services principaux :

- ✅ Couverture sur les services de réservation

- 🧪 Librairies : Mocha, Chai, Sinon

---

## 🚀 Lancer localement

```bash
# 1. Cloner le dépôt
git clone https://github.com/Sara-Mediouni/Flightly.git

# 2. Accéder au projet
cd Flightly

# 3. Installer les dépendances
cd frontend && npm install
cd ../backend && npm install
cd ../admin && npm install

# 4. Configurer les .env dans chaque service
# Exemple (backend/.env)
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_API_KEY=your_stripe_secret
PORT=4000

# 5. Lancer les microservices dans des terminaux séparés
cd backend/User-service && nodemon server
cd backend/Flight-service && nodemon server
cd backend/aAcc-service && nodemon server
cd backend/reserveflight-service && nodemon server
cd backend/reserve-service && nodemon server
cd backend/api-gateway && nodemon server
# 6. Lancer le frontend
cd frontend && npm run dev

# 7. Lancer l’admin dashboard
cd admin && npm run dev

```

## 📂 Organisation du projet

```bash
/Flightly
│
├── flightly               # Interface utilisateur principale
├── admin                  # Dashboard d'administration
└── backend
    ├── Acc-service        
    ├── api-gateway      
    ├── Flight-service       
    ├── reserve-service           
    ├── reserveflight-service 
    └── User-service 
```





 ## 📋 Fonctionnalités principales
 ##  Utilisateur
-🔎 Recherche de vols et hébergements.

-📅 Réservation rapide et simplifiée.

-👤 Gestion du compte utilisateur.

-🧾 Historique et suivi des réservations.

##  Admin Dashboard
-📦 Gestion des vols et hébergements.

-👤 Gestion des utilisateurs

-🧾 Suivi et mise à jour des reservations

---

## ⚠️ Remarque
⚙️ Les réservations nécessitent MongoDB et Stripe.

🛡️ Sécurité basée sur JWT & rôles.

## 🙌 Crédits

Développé avec ❤️ par @Sara-Mediouni