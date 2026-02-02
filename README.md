README du TP
- guide d'installation 
- quelques explications rapides

---
# 🛠️ Environnement de développement

Ce projet est composé de trois parties principales :

- Front-end : **Vue 3 + Vite + TypeScript**
- Back-end : **Node.js + Express + Sequelize**
- Base de données : **MySQL, orchestrée avec Docker**

Le fichier .env est fourni pour le développement/test, il n’y a donc rien à configurer de ce côté-là.

---
# 📦 Outils requis (à installer sur la machine)
## 1. Node.js

Version recommandée : >= 18 (compatible avec Vite 7 et Node latest en Docker)

Vérification :
```bash
node -v
npm -v
```

👉 Installation : https://nodejs.org/

## 2. Docker & Docker Compose

Utilisés pour :

- MySQL
- phpMyAdmin
- API backend node

Vérification :

```bash
docker --version
docker compose version
```

👉 Installation :

Docker Desktop (Windows / macOS) : https://www.docker.com/products/docker-desktop/

---
# 📁 Structure du projet
```ruby
.
├── front-end/          # Vue 3 + Vite
├── back-end/           # API Node.js / Express
├── docker-compose.yml
├── Dockerfile
├── .env                # fourni pour le dev

```

---
# ⚙️ Installation des dépendances

## Front-end
```
cd front-end
npm install
```

### Principales dépendances :

- vue 3
- vue-router
- pinia
- axios
- vite
- typescript
- vue-tsc

## Back-end (hors Docker) => non necessaire
```bash
cd back-end
npm install
```

### Principales dépendances :

- express (v5)
- sequelize
- mysql2
- jsonwebtoken
- bcryptjs
- dotenv
- moment
- nodemon (dev)


---
# 🐳 Lancement avec Docker (recommandé)

Depuis la racine du projet :

```bash
docker compose up --build
```

Services exposés :

| Service     | URL / Port                     |
| ----------- | ------------------------------ |
| API Node.js | `http://localhost:${APP_PORT}` |
| MySQL       | `localhost:${DB_PORT}`         |
| phpMyAdmin  | `http://localhost:8081`        |

👉 phpMyAdmin :
- Host : db
- User / Password : depuis .env

---
# ▶️ Lancement en mode développement (hors Docker)

## Front-end
```bash
cd front-end
npm run dev
```

Accès par défaut :

http://localhost:5173

## Back-end
```bash
cd back-end
npm run dev
```

L’API démarre sur le port défini dans le .env (ex : 3000).

⚠️ Dans ce cas, MySQL doit être lancé séparément (Docker ou local).

---

# ✅ Résumé rapide
Obligatoire

Node.js ≥ 18

Docker + Docker Compose

npm

Optionnel

Git

Lancer le back-end hors Docker

Si tu veux, je peux aussi te faire :

une version ultra-courte “TL;DR”

un README plus pro (open-source / recruteur)

ou un schéma d’architecture du projet 🚀