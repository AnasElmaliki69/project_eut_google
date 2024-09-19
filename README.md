### Documentation Pratique pour le Projet de Chatbot avec l'API Gemini

#### 1. Configuration du Projet

1. **Structure de Projet**

```plaintext
C:\Users\anas0\project_eut_google
├── .env
├── .git
├── .gitignore
├── chatHistory.json
├── node_modules
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
├── README.md
├── server.js
├── src
└── tailwind.config.js
```

You can wrap this code in triple backticks (```) to maintain formatting in Markdown. Just paste it into your README file where you'd like to show the project structure! 2. **Installation de Node.js et Express**

- Assurez-vous d'avoir Node.js installé sur votre machine. Vous pouvez le télécharger depuis [le site officiel de Node.js](https://nodejs.org/).
- Créez un nouveau projet Node.js en exécutant `npm init` dans le répertoire de votre projet.
- Installez Express et les autres dépendances nécessaires avec la commande suivante :
  ```bash
  npm install express cors dotenv fs
  ```

3. **Configuration du Serveur**

   - Créez un fichier `server.js` pour configurer votre serveur Express.
   - Assurez-vous d'inclure les modules nécessaires et configurez les points de terminaison pour gérer les anciennes conversations, la sauvegarde et la suppression des chats.

4. **Création du Frontend avec React**
   - Créez un nouveau projet React avec la commande :
     ```bash
     npx create-react-app nom-du-projet
     ```
   - Installez les dépendances supplémentaires pour le projet :
     ```bash
     npm install @google/generative-ai react-icons react-markdown tailwindcss
     ```

#### 2. Utilisation de l'API Gemini

1. **Configuration de l'API**

   - Importez et configurez l'API Gemini dans votre projet. Vous devez définir la clé API dans un fichier `.env` :
     ```env
     REACT_APP_API_KEY=Votre_Clé_API
     ```
   - Créez un fichier pour le service API (`anirService.js`) et utilisez le code suivant pour configurer l'API Gemini :

     ```javascript
     const { GoogleGenerativeAI } = require("@google/generative-ai");
     const apiKey = process.env.REACT_APP_API_KEY;
     const genAI = new GoogleGenerativeAI(apiKey);

     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
     const generationConfig = {
       temperature: 1,
       topP: 0.95,
       topK: 64,
       maxOutputTokens: 8192,
       responseMimeType: "text/plain",
     };

     let conversationHistory = [
       /* Historique de la conversation */
     ];

     const anirService = {
       sendMessage: async (inputText) => {
         // Ajoutez le texte de l'utilisateur à l'historique de la conversation
         // Envoyez le message et obtenez la réponse du modèle
         // Retournez le texte de la réponse pour l'afficher dans le composant de chat
       },
     };

     export { anirService };
     ```

2. **Utilisation dans les Composants React**
   - Intégrez le service dans vos composants React (`AnirChat` et `OldChats`) pour envoyer des messages, afficher les réponses, et gérer les anciennes conversations.

#### 3. Dépendances Importantes

- **Pour le Backend :**

  - `express` : Serveur HTTP pour gérer les requêtes.
  - `cors` : Pour permettre les requêtes cross-origin.
  - `dotenv` : Pour charger les variables d'environnement.

- **Pour le Frontend :**
  - `@google/generative-ai` : Pour l'intégration de l'API Gemini.
  - `react-icons` : Pour les icônes dans les composants React.
  - `react-markdown` : Pour le rendu du Markdown dans les messages.

#### 4. Structure du Projet

- **Backend :** Contient le code pour le serveur Express, les points de terminaison pour la gestion des chats, et la configuration de l'API.
- **Frontend :** Contient les composants React pour l'interface utilisateur, l'intégration de l'API, et la gestion de l'état des chats.

#### 5. Scripts Utilisés

- `start` : Démarre le serveur de développement React.
- `build` : Crée une version optimisée pour la production de votre application React.
- `test` : Exécute les tests de votre application.
- `eject` : Extrait les configurations de Create React App pour une personnalisation plus poussée.

Cette documentation vous aidera à mettre en place votre projet de chatbot avec l'API Gemini, en vous guidant à travers les étapes clés et en mettant en évidence les composants essentiels.
