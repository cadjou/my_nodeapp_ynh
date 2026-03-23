<h1>
  <img src="https://nodejs.org/static/logos/nodejsLight.svg" width="32px" alt="Logo Node.js">
  My Node App, packaged for YunoHost
</h1>

[![Version: 1.0~ynh1](https://img.shields.io/badge/Version-1.0~ynh1-rgb(18,138,11)?style=for-the-badge)](#)
[![YunoHost](https://img.shields.io/badge/YunoHost-%3E%3D%2012.0-blue?style=for-the-badge&logo=yunohost)](https://yunohost.org)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-yellow?style=for-the-badge)](LICENSE)

> **Espace mutualisé sécurisé pour héberger une application Node.js sur YunoHost.**

*Custom Node.js web application with optional SFTP access, configurable database, and full YunoHost integration.*

---

## 🇫🇷 Présentation

**My Node App** est un package YunoHost qui fournit un environnement prêt à l'emploi pour faire tourner une application Node.js sur un serveur YunoHost. Il s'inspire de [my_webapp_ynh](https://github.com/YunoHost-Apps/my_webapp_ynh) mais remplace PHP par Node.js.

### Ce que fait ce package

- Installe et configure **Node.js** avec la version de votre choix
- Met en place un **reverse proxy Nginx** avec support **WebSocket**
- Crée un **service systemd** sécurisé (sandboxing) pour votre application
- Gère les **droits d'accès** via le système de permissions YunoHost
- Supporte la **sauvegarde et restauration** complètes
- Permet le **changement de domaine/chemin** sans réinstallation

### Ce que vous configurez à l'installation

| Option | Choix disponibles |
|---|---|
| Version Node.js | 18, 20, 22 |
| Gestionnaire de paquets | npm, pnpm, yarn |
| Base de données | Aucune, MySQL, PostgreSQL |
| Accès SFTP | Oui / Non |
| Permissions d'accès | Gérées par YunoHost |

Toutes ces options sont **modifiables après installation** depuis le panneau d'administration YunoHost.

---

## 🇬🇧 Overview

**My Node App** is a YunoHost package that provides a ready-to-use environment to run a Node.js application on a YunoHost server. Inspired by [my_webapp_ynh](https://github.com/YunoHost-Apps/my_webapp_ynh), it replaces PHP with Node.js.

### What this package does

- Installs and configures **Node.js** with your chosen version
- Sets up an **Nginx reverse proxy** with **WebSocket** support
- Creates a **hardened systemd service** (sandboxing) for your application
- Manages **access control** through YunoHost's permission system
- Supports full **backup and restore**
- Allows **domain/path changes** without reinstallation

### Installation options

| Option | Available choices |
|---|---|
| Node.js version | 18, 20, 22 |
| Package manager | npm, pnpm, yarn |
| Database | None, MySQL, PostgreSQL |
| SFTP access | Yes / No |
| Access permissions | Managed by YunoHost |

All options are **editable after installation** from the YunoHost admin panel.

---

## 📸 Screenshot

After installation, a default welcome page is displayed:

```
┌──────────────────────────────────────┐
│         My Node App                  │
│                                      │
│  Your Node.js application is         │
│  running on YunoHost.                │
│                                      │
│  Node.js v20.x — Port 3000          │
└──────────────────────────────────────┘
```

Replace the default files with your own Node.js project.

---

## 📦 Installation

### Depuis l'interface admin / From admin panel

Recherchez **My Node App** dans le catalogue d'applications YunoHost, ou installez depuis une URL GitHub.

### En ligne de commande / Command line

```bash
# Installation
sudo yunohost app install https://github.com/<your-username>/my_nodeapp_ynh

# Mise à jour / Upgrade
sudo yunohost app upgrade my_nodeapp -u https://github.com/<your-username>/my_nodeapp_ynh
```

---

## 🚀 Utilisation / Usage

### Déployer votre application / Deploy your application

Une fois installé, déposez vos fichiers dans le répertoire d'installation :

```bash
# Via SFTP (si activé)
sftp <app-user>@<your-domain>

# Ou directement sur le serveur
cd /var/www/<app-name>/
```

Votre application doit :
1. Avoir un fichier **`index.js`** comme point d'entrée
2. Écouter sur le port défini dans la variable d'environnement **`PORT`**
3. Écouter sur **`127.0.0.1`** (localhost uniquement, Nginx gère le reste)

### Variables d'environnement disponibles / Available environment variables

Votre application reçoit automatiquement ces variables via le fichier `.env` :

| Variable | Description |
|---|---|
| `NODE_ENV` | Toujours `production` |
| `PORT` | Port attribué par YunoHost |
| `DOMAIN` | Domaine de l'application |
| `PATH_PREFIX` | Chemin URL de l'application |
| `DB_TYPE` | `mysql` ou `postgresql` (si configuré) |
| `DB_NAME` | Nom de la base de données |
| `DB_USER` | Utilisateur de la base de données |
| `DB_PWD` | Mot de passe de la base de données |
| `DB_HOST` | `localhost` |

### Exemple d'application / Example application

```javascript
const http = require("http");
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Hello from YunoHost!</h1>");
});

server.listen(port, "127.0.0.1", () => {
    console.log(`Server running on port ${port}`);
});
```

### Redémarrer le service / Restart the service

```bash
sudo systemctl restart <app-name>

# Voir les logs / View logs
sudo journalctl -u <app-name> -f
```

---

## ⚙️ Configuration

### Depuis l'admin YunoHost / From YunoHost admin

Accédez à **Applications > My Node App > Configuration** pour modifier :

- **SFTP** : activer/désactiver l'accès et changer le mot de passe
- **Node.js** : changer la version (18, 20, 22)
- **Package manager** : changer entre npm, pnpm, yarn

### Structure des fichiers / File structure

```
/var/www/<app-name>/
├── index.js           # Point d'entrée (modifiable)
├── package.json       # Dépendances Node.js
├── node_modules/      # Dépendances installées
└── .env               # Variables d'environnement (auto-généré)
```

---

## 🔒 Sécurité / Security

- Le service Node.js tourne dans un **sandbox systemd** avec des restrictions strictes
- L'application écoute uniquement sur **127.0.0.1** (pas d'accès direct)
- Nginx gère le **SSL/TLS** et le **reverse proxy**
- Les **droits d'accès** sont gérés par le SSO YunoHost
- Les **capabilities Linux** non nécessaires sont supprimées

---

## 🏗️ Architecture

```
                    ┌─────────────┐
                    │   Internet  │
                    └──────┬──────┘
                           │ HTTPS
                    ┌──────┴──────┐
                    │    Nginx    │
                    │ (reverse    │
                    │  proxy +    │
                    │  WebSocket) │
                    └──────┬──────┘
                           │ HTTP localhost:PORT
                    ┌──────┴──────┐
                    │   Node.js   │
                    │  (systemd   │
                    │   service)  │
                    └──────┬──────┘
                           │ (optionnel)
                    ┌──────┴──────┐
                    │  Database   │
                    │ MySQL / PG  │
                    └─────────────┘
```

---

## 📚 Documentation

| Ressource | Lien |
|---|---|
| Documentation packaging YunoHost | https://doc.yunohost.org/en/dev/packaging/ |
| Helpers v2.1 | https://doc.yunohost.org/en/packaging/scripts/helpers_v2.1/ |
| Config panels | https://doc.yunohost.org/en/dev/packaging/advanced/config_panels/ |
| SFTP sur les apps | https://doc.yunohost.org/en/admin/tutorials/sftp_on_apps/ |
| my_webapp_ynh (inspiration) | https://github.com/YunoHost-Apps/my_webapp_ynh |
| nodered_ynh (référence Node.js) | https://github.com/YunoHost-Apps/nodered_ynh |

---

## 📦 Developer info

Pull requests are welcome and should target the [`testing` branch](../../tree/testing).

The `testing` branch can be tested using:

```bash
# Fresh install
sudo yunohost app install https://github.com/<your-username>/my_nodeapp_ynh/tree/testing

# Upgrade
sudo yunohost app upgrade my_nodeapp -u https://github.com/<your-username>/my_nodeapp_ynh/tree/testing
```

### Testing with package_check

```bash
package_check ./my_nodeapp_ynh
```

### 📚 App packaging documentation

Please see <https://doc.yunohost.org/packaging_apps> for more information.

---

## 📄 License

GPL-3.0-only — See [LICENSE](LICENSE) for details.
