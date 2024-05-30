# RocketTeam-Frontend

## Description
Ce projet est la partie frontend de l'application Web développée en Vue.js pour gérer les ventes aux enchères.

L'application inclut les fonctionnalités suivantes :

 - Affichage des lots.
 - Gestion des catégories.
 - Gestion des enchères.
 - Gestion des utilisateurs.

## Structure des Fichiers

### Configuration
 
 - **vue.config.js** : Configuration pour Vue.js.
 - **babel.config.js** : Configuration pour Babel.
 - **eslint.js** : Configuration pour ESLint.

### Composants

 - **ActionButtons.vue** : Composant pour les boutons d'action.
 - **CategorySelector.vue** : Composant pour la sélection des catégories.
 - **LotItem.vue** : Composant pour afficher un lot.
 - **LotManagement.vue** : Composant pour gérer les lots.
 - **LotsList.vue** : Composant pour afficher la liste des lots.

### Vues

 - **ListLotsView.vue** : Vue pour afficher la liste des lots.
 - **ManageLotView.vue** : Vue pour gérer un lot.
 - **AboutView.vue** : Vue pour afficher la page à propos.
 - **EnchereView.vue** : Vue pour afficher les enchères.
 - **HomeView.vue** : Vue pour afficher la page d'accueil.
 - **App.vue** : Vue principale de l'application.

### Routes

 - **router/index.js** : Définition des routes de l'application.

### Services
 - **CategoryServices.js** : Contient les services pour interagir avec l'API backend.
 - **EnchereService.js** : Contient les services pour interagir avec l'API backend.
 - **LotsServices.js** : Contient les services pour interagir avec l'API backend.
 - **UserService.js** : Contient les services pour interagir avec l'API backend.


### Fichiers de configuration
 - **package.json** : Liste des dépendances et scripts du projet.
 - **package-lock.json** : Verrouillage des versions des dépendances.
 - **.eslintrc.js** : Configuration ESLint pour le linting du code.
 - **.browserslistrc** : Configuration des navigateurs cibles.

### Fichiers de ressources
 - **public** : Contient les fichiers statiques.
 - **assets** : Contient les fichiers d'assets comme les images et les styles.

### Comment Exécuter
 1. Clonez le dépôt.
    ```sh git clone [URL du dépôt]

 2. Assurez-vous d'avoir Node.js et npm installés.
    Téléchargez Node.js à partir de ce lien :
    ```sh https://nodejs.org/en/download/

 3. Naviguez jusqu'au répertoire du projet
    ```sh cd [nom_du_répertoire]

 4. Installez les dépendances du projet :
    ```sh npm install

 5. Lancez l'application Vue.js avec la commande suivante :
    ```sh npm run serve

## Contact
Ce readme présente les informations nécessaires pour comprendre, configurer et exécuter le projet frontend RocketTeam-Frontend. Pour toute question ou assistance, n'hésitez pas à nous contacter via cette adresse mail : evan.pineau@etml-es.ch ou nicolas.lema@etml-es.ch.
