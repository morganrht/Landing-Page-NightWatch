# Guide de Déploiement: GitHub Pages

## ✨ Avantages GitHub Pages
- ✅ Hébergement gratuit
- ✅ HTTPS automatique
- ✅ Support PWA complet
- ✅ Déploiement automatique via Git
- ✅ Domaine personnalisé optionnel

## 🚀 Étapes de Déploiement

### 1️⃣ Créer un Repo GitHub

**Option A: Repo utilisateur (pour votre site personnel)**
```bash
# Créez un repo nommé: username.github.io
# URL finale: https://username.github.io
```

**Option B: Repo de projet (Night Watch Landing)**
```bash
# Créez un repo nommé: nightwatch-landing
# URL finale: https://username.github.io/nightwatch-landing
```

### 2️⃣ Initialiser Git Localement

```bash
cd /Users/morganreichert/Desktop/landing\ page\ nightwatch

# Initialiser le repo
git init

# Ajouter les fichiers
git add .

# Faire le premier commit
git commit -m "Initial commit: Night Watch landing page PWA"

# Ajouter la remote GitHub (remplacez username par votre username)
git remote add origin https://github.com/username/nightwatch-landing.git

# Renommer la branche en 'main' si nécessaire
git branch -M main

# Pousser vers GitHub
git push -u origin main
```

### 3️⃣ Activer GitHub Pages

1. Allez sur: `https://github.com/username/nightwatch-landing`
2. Cliquez sur **Settings**
3. Allez dans **Pages** (menu gauche)
4. Sous "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main** (et `/root`)
5. Cliquez **Save**
6. Attendez quelques minutes pour le déploiement

### 4️⃣ Vérifier le Déploiement

L'URL sera: `https://username.github.io/nightwatch-landing/`

Un badge "GitHub Pages" apparaîtra en haut du repo une fois le déploiement terminé.

## 🎯 Configuration pour Sous-Dossier

Si vous utilisez `https://username.github.io/nightwatch-landing/`, mettez à jour:

**Dans `index.html`:**
```html
<link rel="manifest" href="./manifest.json">
<!-- Chemins relatifs sont OK -->
```

**Dans `manifest.json`:**
```json
{
  "start_url": "https://social-glow-meter.lovable.app/",
  "scope": "https://social-glow-meter.lovable.app/"
}
```

## 🔧 Configuration pour Racine (username.github.io)

Si vous utilisez `https://username.github.io/` directement:

**Créez le repo** avec exactement ce nom:
```
username.github.io
```

**URL finale:** `https://username.github.io/`

## 📊 Vérifier la Configuration

Après déploiement, testez:

1. **Ouvrir la page:**
   ```
   https://username.github.io/nightwatch-landing/
   ```

2. **Vérifier HTTPS:**
   - L'URL doit commencer par `https://` ✅
   - Pas de warnings de sécurité

3. **Tester PWA:**
   - Ouvrir DevTools (F12)
   - Aller dans **Application > Manifest**
   - Voir le manifest.json chargé

4. **Vérifier les fichiers:**
   - Ouvrir DevTools
   - Aller dans **Network**
   - Recharger la page (Ctrl+Shift+R pour clear cache)
   - Vérifier que tous les fichiers se chargent (200 status)

## 🔐 Domaine Personnalisé (Optionnel)

### Ajouter un domaine custom

1. Allez dans **Settings > Pages**
2. Sous "Custom domain":
   - Entrez votre domaine (ex: `nightwatch.fr`)
   - Cliquez **Save**

3. **Configurez le DNS** de votre registraire:
   ```
   Créez 4 A records pointant vers:
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   
   Ou un CNAME record pointant vers:
   username.github.io
   ```

4. GitHub activera automatiquement le certificat SSL

## 🚨 Dépannage

### "404 Page not found"
- ✅ Vérifiez que le repo est public (pas private)
- ✅ Vérifiez que Pages est activé
- ✅ Attendez quelques minutes (le déploiement peut être lent)

### "HTTPS not available"
- ✅ Attendez quelques minutes pour le certificat SSL
- ✅ Cliquez "Enforce HTTPS" dans Settings > Pages

### PWA ne s'installe pas
- ✅ Vérifiez que manifest.json est accessible
- ✅ Vérifiez que le site est en HTTPS
- ✅ Vérifiez la console pour les erreurs (DevTools)

### Images ne se chargent pas
- ✅ Vérifiez que IMG_0831.PNG existe dans le repo
- ✅ Utilisez des chemins relatifs (./IMG_0831.PNG)
- ✅Vérifiez les chemins sont sensibles à la casse

## 📝 Fichiers à Versionner

```
.gitignore          # À inclure ✅
.github/            # À créer pour CI/CD (optionnel)
index.html
styles.css
script.js
manifest.json
service-worker.js
IMG_0831.PNG
README.md
LICENSE             # À créer (MIT recommandé)
```

À NE PAS versionner:
```
.DS_Store
node_modules/
dist/
.vscode/
```

## 🔄 Mise à Jour du Site

Après chaque modification:

```bash
# Vérifier les changements
git status

# Ajouter les fichiers modifiés
git add .

# Faire un commit
git commit -m "Update: description des changements"

# Pousser vers GitHub
git push origin main
```

GitHub Pages redéploiera automatiquement en quelques secondes.

## 📈 Monitoring & Analytics (Optionnel)

### Google Analytics
1. Créez un compte Google Analytics
2. Ajoutez ce code avant `</body>` dans `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Lighthouse CI (Optionnel)
Automatisez les tests de performance avec GitHub Actions.

## ✅ Checklist Finale

Avant le déploiement:
- [ ] Repo créé sur GitHub
- [ ] HTTPS fonctionne
- [ ] Tous les fichiers sont dans le repo
- [ ] `index.html` charge correctement
- [ ] Images s'affichent
- [ ] Responsivité sur mobile OK
- [ ] PWA install button fonctionne
- [ ] Liens de navigation fonctionnent
- [ ] FAQ accordéon fonctionne
- [ ] Pas d'erreurs console (F12)

Après le déploiement:
- [ ] Site accessible sur l'URL GitHub Pages
- [ ] Lighthouse score > 90
- [ ] PWA install prompt s'affiche
- [ ] Service worker enregistré
- [ ] Offline detection fonctionne

## 🎉 Succès!

Votre landing page Night Watch est maintenant live! 🚀

Partagez l'URL:
```
https://username.github.io/nightwatch-landing/
```

---

**Store Sharp. Stay Safe.** 🌙
