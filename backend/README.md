# Edukini Backend

## Démarrage rapide (MySQL inclus)

### 1) Lancer MySQL

Dans `backend/` :

```bash
docker compose up -d
```

Ça crée automatiquement :
- base: `edukini_db`
- user: `edukini`
- password: `edukini123`

### 2) Lancer le backend

Dans `backend/` :

```bash
mvn spring-boot:run
```

Le backend écoute par défaut sur `http://localhost:8083`.

## Si tu utilises un autre MySQL

Tu peux override la configuration sans modifier le code :

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `SERVER_PORT`

Exemple (PowerShell) :

```powershell
$env:DB_URL="jdbc:mysql://127.0.0.1:3306/edukini_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC"
$env:DB_USERNAME="root"
$env:DB_PASSWORD="ton_mot_de_passe"
$env:SERVER_PORT="8083"
mvn spring-boot:run
```
