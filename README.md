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
- `/booking-request` - Compléter une réservation
- `/favorites` - Articles favoris

## ✨ Fonctionnalités récentes

### 🔐 Flux d'authentification amélioré
- **Redirection intelligente** : Après connexion, l'utilisateur revient automatiquement à la page d'origine
- **Préservation des données** : Les dates de location sélectionnées avant connexion sont sauvegardées et restaurées
- **Réservation automatique** : Si l'utilisateur cliquait sur "Request to Rent" sans être connecté, après connexion il est redirigé directement vers la page de réservation avec toutes ses informations

### ✅ Validation robuste
- **Validation côté client** : Email, téléphone (format algérien), dates
- **Messages d'erreur clairs** : Bordures rouges et messages explicites sous chaque champ
- **Validation des dates** : Impossible de sélectionner des dates passées ou incohérentes
- **Auto-scroll** : Focus automatique sur la première erreur lors de la soumission

### 🛡️ Gestion d'erreurs
- **ID invalide** : Message d'erreur si l'ID d'item n'est pas numérique ou ≤ 0
- **Item introuvable** : Page d'erreur dédiée avec retour au catalogue
- **États de chargement** : Skeleton screens pendant le chargement des détails d'item

### ♿ Accessibilité
- **Labels ARIA** : `aria-label`, `aria-required`, `aria-invalid` sur tous les champs
- **Modals accessibles** : `role="dialog"`, `aria-modal="true"`
- **Focus management** : Ring visible sur focus (`:focus:ring-2`)
- **Navigation clavier** : Tous les éléments interactifs accessibles au clavier

### 🎨 UX améliorée
- **Squelettes de chargement** : Composant `<Skeleton>` réutilisable avec variantes
- **Feedback visuel** : États hover, focus, loading sur tous les boutons
- **Erreurs contextuelles** : Messages d'erreur spécifiques par champ avec icônes

## 🔄 Flux de réservation

1. **Utilisateur non connecté** visite `/item/:id`
2. Sélectionne dates de début et fin
3. Clique sur "Request to Rent"
4. → Dates sauvegardées dans `sessionStorage`
5. → Redirection vers `/login` avec `returnUrl`
6. Après connexion → Retour automatique à `/item/:id`
7. → Dates restaurées depuis `sessionStorage`
8. → Redirection automatique vers `/booking-request`
9. Formulaire pré-rempli avec toutes les informations

## 🎨 Thème

L'application supporte le mode sombre/clair avec les couleurs :
- Primary: #007AFF (Bleu Azure)
- Background Light: #FFFFFF
- Background Dark: #1D1D1F
