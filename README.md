# Night Watch - Landing Page PWA

Bienvenue sur le repo de la landing page officielle de **Night Watch** - L'app qui rend vos soirées plus sûres et amusantes! 🌙

## 📱 À propos de Night Watch

Night Watch est une Progressive Web App (PWA) conçue pour rendre vos soirées entre amis plus sûres et amusantes avec:

- ✅ **Éthylomètre Partagé** - Suivi du niveau d'alcool du groupe
- 🚨 **Boutons d'Urgence** - Alertez vos amis en un clic
- 📸 **Partage de Stories** - Capturez les bons moments
- 📍 **Localisation en Temps Réel** - Retrouvez vos amis facilement
- 🏆 **Classement par Soirée** - Gamification amusante
- 🤖 **Caméra IA** - Détection automatique des boissons
- 💬 **Chat de Groupe** - Communication instantanée
- 📊 **Historique des Soirées** - Statistiques et souvenirs

## 🚀 Démarrage Rapide

### Installation locale

1. **Clonez le repo:**
```bash
git clone https://github.com/yourusername/nightwatch-landing.git
cd nightwatch-landing
```

2. **Lancez un serveur local:**
```bash
# Avec Python 3
python3 -m http.server 8000

# Ou avec Python 2
python -m SimpleHTTPServer 8000

# Ou avec Node.js (http-server)
npx http-server
```

3. **Ouvrez dans votre navigateur:**
```
http://localhost:8000
```

### Déploiement sur GitHub Pages

1. **Créez un repo GitHub** nommé `nightwatch-landing` (ou votre préférence)

2. **Poussez les fichiers:**
```bash
git add .
git commit -m "Initial landing page commit"
git push origin main
```

3. **Activez GitHub Pages:**
   - Allez dans Settings > Pages
   - Sélectionnez `main` branch comme source
   - GitHub Pages déploiera automatiquement votre site à `https://yourusername.github.io/nightwatch-landing/`

4. **Mettez à jour les URLs:**
   - Changez `og:image` et autres URLs si nécessaire
   - Mettez à jour `start_url` dans `manifest.json`

## 📁 Structure des Fichiers

```
nightwatch-landing/
├── index.html          # Structure HTML (toutes sections)
├── styles.css          # Styling CSS3 responsive
├── script.js           # Logique JS (PWA install, FAQ, animations)
├── manifest.json       # Web App Manifest (PWA metadata)
├── IMG_0831.PNG        # Screenshot de l'app (pour le hero)
├── .gitignore          # Fichiers ignorés par Git
└── README.md           # Cette documentation
```

## 🎨 Design & UX

### Couleurs
- **Primaire**: `#1e3a8a` (Bleu foncé Night Watch)
- **Accent**: `#06b6d4` (Cyan/Turquoise)
- **Danger**: `#ef4444` (Rouge pour alertes)
- **Succès**: `#10b981` (Vert pour confirmations)

### Responsive Design
- **Mobile** (< 640px): Colonne unique, typographie réduite
- **Tablet** (640px - 1024px): 2 colonnes sur certaines sections
- **Desktop** (> 1024px): Layout optimal multi-colonnes, mockup iPhone visible

### Animations
- Fade-in au scroll pour features/témoignages
- Entrée progressive du hero section
- Accordéon interactif pour la FAQ
- Hover effects subtils sur les cards

## 🔧 Installation PWA

### Comment ça fonctionne?

1. **L'utilisateur clique le bouton "Installer Night Watch"**
2. **Le navigateur affiche le prompt native d'installation PWA**
3. **En cas de succès**: L'app `https://social-glow-meter.lovable.app/` s'installe
4. **En cas d'absence de PWA**: Redirige vers l'URL directe

### Navigateurs supportés

| Navigateur | PWA | Appel Direct | Statut |
|-----------|-----|--------------|--------|
| Chrome (Desktop) | ✅ | ✅ | Supporté |
| Edge (Desktop) | ✅ | ✅ | Supporté |
| Firefox (Desktop) | ⚠️ | ✅ | Supporté partiellement |
| Safari (Desktop) | ❌ | ✅ | Appel direct uniquement |
| Chrome (Mobile) | ✅ | ✅ | Supporté |
| Samsung Internet | ✅ | ✅ | Supporté |
| Safari (iOS) | ⚠️ | ✅ | Appel direct recommandé |
| Firefox (iOS) | ❌ | ✅ | Appel direct uniquement |

## 📊 Performance

### Lighthouse Targets
- **Performance**: > 90
- **Accessibility**: > 90
- **Best Practices**: > 90
- **SEO**: > 90

### Optimisations implémentées
- ✅ CSS/JS minifiés inline où approprié
- ✅ Images optimisées (SVG pour icons, PNG compressé)
- ✅ Lazy loading (Intersection Observer)
- ✅ Service Worker support (optionnel)
- ✅ Mobile-first responsive design
- ✅ Semantic HTML5

## 🔒 Sécurité & Confidentialité

Cette landing page respecte:
- ✅ RGPD - Pas de tracking sans consentement
- ✅ WCAG 2.1 AA - Accessibilité
- ✅ Content Security Policy prête
- ✅ HTTPS sur GitHub Pages

## 🎯 Sections

### 1. Navigation (Sticky)
- Logo Night Watch
- Liens rapides (Features, FAQ, Avis, Installer)
- Responsive sur mobile

### 2. Hero Section
- Titre principal accrocheur
- Tagline "Stay Sharp. Stay Safe. 🌙"
- Description concise
- **Bouton d'installation principal** (redirect vers app réelle)
- Mockup iPhone avec screenshot de l'app (IMG_0831.PNG)

### 3. Features (8 cartes)
- Éthylomètre Partagé 🍷
- Boutons d'Urgence 🚨
- Partage de Stories 📸
- Localisation 📍
- Classement 🏆
- Caméra IA 🤖
- Chat 💬
- Historique 📊

### 4. FAQ (Accordéon interactif)
- 🔒 Comment mes données sont-elles protégées?
- 🍺 Qu'est-ce qu'un éthylomètre partagé?
- 🆘 Comment fonctionne le système d'urgence?
- 📱 Comment installer Night Watch?
- 🎉 Quel est le but du classement?

### 5. Testimonials (3 cartes)
- Profils fictifs réalistes
- Étoiles de notation
- Citations pertinentes
- Localisation (Paris, Lyon, Marseille)

### 6. CTA Section
- Appel à l'action central
- Bouton d'installation secondaire

### 7. Footer
- Liens (À propos, FAQ, Contact)
- Liens légaux (Conditions, Confidentialité)
- Réseaux sociaux (Instagram, Twitter, LinkedIn, Email)
- Copyright

## 🔄 Mise à Jour & Maintenance

### Modifications courantes

**Changer les couleurs:**
Modifiez les variables CSS au début de `styles.css`:
```css
:root {
    --primary: #1e3a8a;
    --accent: #06b6d4;
    /* ... */
}
```

**Ajouter une section:**
1. Ajoutez le HTML dans `index.html`
2. Ajoutez le CSS dans `styles.css`
3. Ajoutez les scripts dans `script.js` si nécessaire

**Mettre à jour l'image du hero:**
Remplacez `IMG_0831.PNG` par une nouvelle image et mettez à jour le `<img src>` dans `index.html`

## 📞 Support & Contact

### Pour les utilisateurs
- 📧 Email: contact@nightwatch.app
- 📸 Instagram: [@nightwatchapp](#)
- 𝕏 Twitter: [@nightwatchapp](#)

### Liens importants
- 🔗 [App Night Watch](https://social-glow-meter.lovable.app/)
- 📱 [Installer PWA](https://social-glow-meter.lovable.app/)
- 🐛 Issues: [GitHub Issues](#)

## 📜 Licence

Cette landing page est sous licence MIT. Voir [LICENSE](LICENSE) pour les détails.

Vous êtes libre de:
- ✅ Modifier le design
- ✅ Utiliser pour promotionner Night Watch
- ✅ Déployer sur votre propre domaine
- ⚠️ Respecter la marque Night Watch

## 🎉 Merci!

Merci de soutenir Night Watch - L'app qui rend les soirées plus sûres et amusantes! 🌙

---

**Stay Sharp. Stay Safe.** 🌙
