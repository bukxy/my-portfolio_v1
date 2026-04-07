# 🧑‍💻 Portfolio Personnel

Un portfolio développeur full-stack présentant mon parcours, mes compétences, mes expériences et une page de contact.

## 🛠️ Stack technique

| Couche | Techno |
|--------|-------------|
| Frontend | ![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white) 21|
| Backend | ![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white) ![Spring](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white) 4.0.3|
| Base de données | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) |
| Conteneurisation | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) |

## 📋 Fonctionnalités

- 🗂️ Projets realisés
- 🧭 Parcours & expériences
- 💡 Compétences techniques
- 📬 Page de contact
  
## 🚀 Lancer le projet
---

### 🧪 Environnement de développement

**Démarrer :**
```bash
docker compose -f docker-compose.dev.yaml up --build
```

**Arrêter :**
```bash
docker compose -f docker-compose.dev.yaml down
```

---

### 🏭 Environnement de production

**Démarrer :**
```bash
docker compose -f docker-compose.yaml up --build
```

**Arrêter :**
```bash
docker compose -f docker-compose.yaml down
```

## 📁 Structure du projet

```
portfolio/
├── front/          # Application Angular
├── back/           # API Java Spring Boot
├── docker/
├──── docker-compose.yaml          # Config production
├──── docker-compose.dev.yaml      # Config développement
└──── .env                         # Config database/JWT SECRET
```
