# DZ-RentIt - React Application

Application de location d'objets entre particuliers construite avec React, Vite et Tailwind CSS.

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Compiler pour la production
npm run build

# Prévisualiser la version de production
npm run preview
```

## 📁 Structure du projet

```
dz-rentit-react/
├── src/
│   ├── components/      # Composants réutilisables
│   ├── pages/          # Pages de l'application
│   ├── App.jsx         # Composant principal avec le routing
│   ├── main.jsx        # Point d'entrée
│   └── index.css       # Styles globaux
├── public/             # Fichiers statiques
└── index.html          # Template HTML
```

## 🛠️ Technologies utilisées

- **React 18** - Bibliothèque UI
- **Vite** - Build tool et dev server
- **React Router** - Navigation
- **Tailwind CSS** - Framework CSS
- **Material Symbols** - Icônes

## 📄 Pages disponibles

- `/` - Page d'accueil
- `/catalog` - Catalogue et recherche
- `/item/:id` - Détails d'un article
- `/login` - Connexion / Inscription
- `/publish` - Publier un article
- `/dashboard` - Tableau de bord utilisateur

## 🎨 Thème

L'application supporte le mode sombre/clair avec les couleurs :
- Primary: #007AFF (Bleu Azure)
- Background Light: #FFFFFF
- Background Dark: #1D1D1F
