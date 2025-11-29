# Traduction Amazigh (Berbère) - DZ-RentIt

## Vue d'ensemble

L'application DZ-RentIt supporte maintenant **4 langues** :
- 🇬🇧 **Anglais** (EN) - `en`
- 🇩🇿 **Arabe** (ع) - `ar`
- 🇩🇿 **Amazigh Latin** (Kab) - `kab` - Écriture latine (Kabyle)
- 🇩🇿 **Amazigh Tifinagh** (ⵜⴼⵏ) - `kab_tfng` - Écriture tifinagh

## Système de traduction

### Changement de langue

Les utilisateurs peuvent changer de langue en cliquant sur le bouton de langue dans le header. Le système fait une rotation cyclique à travers les 4 langues :

```
EN → ع → Kab → ⵜⴼⵏ → EN ...
```

### Stockage

La langue sélectionnée est sauvegardée dans `localStorage` sous la clé `language`, ce qui permet de conserver la préférence de l'utilisateur entre les sessions.

## Écritures Amazigh

### 1. Latin (Kabyle) - `kab`

L'écriture latine utilise l'alphabet latin étendu avec des caractères spéciaux berbères :

- **Caractères spéciaux** : ɣ, ḍ, ḥ, ṛ, ṣ, ṭ, ẓ, ɛ, č
- **Exemples** :
  - Bienvenue : `Ansuf yis-k i tuɣalin`
  - Rechercher : `Nadi`
  - Catégories : `Taggayin`

### 2. Tifinagh - `kab_tfng`

L'écriture tifinagh utilise l'alphabet berbère traditionnel (Neo-Tifinagh) :

- **Police recommandée** : Le navigateur doit supporter les caractères Unicode Tifinagh (U+2D30–U+2D7F)
- **Exemples** :
  - Bienvenue : `ⴰⵏⵙⵓⴼ ⵢⵉⵙ-ⴽ ⵉ ⵜⵓⵖⴰⵍⵉⵏ`
  - Rechercher : `ⵏⴰⴷⵉ`
  - Catégories : `ⵜⴰⴳⴳⴰⵢⵉⵏ`

## Structure du code

### LanguageContext.jsx

```javascript
const translations = {
  en: { ... },
  ar: { ... },
  kab: { ... },        // Amazigh Latin
  kab_tfng: { ... }   // Amazigh Tifinagh
};
```

### Fonction toggleLanguage()

```javascript
const toggleLanguage = () => {
  const languages = ['en', 'ar', 'kab', 'kab_tfng'];
  const currentIndex = languages.indexOf(language);
  const nextIndex = (currentIndex + 1) % languages.length;
  const newLanguage = languages[nextIndex];
  // ...
};
```

## Support des polices

### Tifinagh

Pour garantir un affichage correct du Tifinagh, les polices système suivantes sont supportées :
- Windows 10+ : Police Tifinagh intégrée
- macOS : Police Tifinagh intégrée
- Linux : Installer `fonts-noto-tifinagh` ou équivalent

Si la police n'est pas disponible, les caractères Tifinagh s'afficheront en utilisant une police de secours Unicode.

## Exemples de traductions

### Tableau comparatif

| Clé | English | العربية | Tamaziɣt (Latin) | ⵜⴰⵎⴰⵣⵉⵖⵜ (Tifinagh) |
|-----|---------|---------|------------------|----------------------|
| `home` | Home | الرئيسية | Agejdan | ⴰⴳⴻⵊⴷⴰⵏ |
| `categories` | Categories | الفئات | Taggayin | ⵜⴰⴳⴳⴰⵢⵉⵏ |
| `login` | Log In | تسجيل الدخول | Kcem | ⴽⵛⴻⵎ |
| `signup` | Sign Up | إنشاء حساب | Jerred | ⵊⴻⵔⵔⴻⴷ |
| `search` | Search | بحث | Nadi | ⵏⴰⴷⵉ |

### Villes algériennes

| Ville | English | العربية | Tamaziɣt (Latin) | ⵜⴰⵎⴰⵣⵉⵖⵜ (Tifinagh) |
|-------|---------|---------|------------------|----------------------|
| Algiers | Algiers | الجزائر | Lezzayer | ⵍⴻⵣⵣⴰⵢⴻⵔ |
| Oran | Oran | وهران | Wehran | ⵡⴻⵀⵔⴰⵏ |
| Constantine | Constantine | قسنطينة | Qsentina | ⵇⵙⴻⵏⵜⵉⵏⴰ |
| Béjaïa | Béjaïa | بجاية | Bgayet | ⴱⴳⴰⵢⴻⵜ |
| Tlemcen | Tlemcen | تلمسان | Tlemsen | ⵜⵍⴻⵎⵙⴻⵏ |

## RTL vs LTR

### Direction du texte

- **English (EN)** : LTR (Left-to-Right)
- **Arabic (ع)** : RTL (Right-to-Left)
- **Amazigh Latin (Kab)** : LTR (Left-to-Right)
- **Amazigh Tifinagh (ⵜⴼⵏ)** : LTR (Left-to-Right)

Le système détecte automatiquement si la langue est RTL et ajuste la disposition en conséquence via `document.documentElement.dir`.

## Ajouter de nouvelles traductions

Pour ajouter une nouvelle clé de traduction :

1. Ouvrir `src/context/LanguageContext.jsx`
2. Ajouter la clé dans les 4 objets de traduction :

```javascript
const translations = {
  en: {
    newKey: 'English text',
    // ...
  },
  ar: {
    newKey: 'النص العربي',
    // ...
  },
  kab: {
    newKey: 'Aḍris s teqbaylit',
    // ...
  },
  kab_tfng: {
    newKey: 'ⴰⴹⵔⵉⵙ ⵙ ⵜⴻⵇⴱⴰⵢⵍⵉⵜ',
    // ...
  }
};
```

3. Utiliser la clé dans le composant avec `t('newKey')`

## Notes culturelles

### Variantes dialectales

La traduction amazigh fournie est basée sur le **Kabyle** (Taqbaylit), qui est l'une des principales variantes du berbère en Algérie, avec plus de 5 millions de locuteurs natifs.

D'autres variantes amazighes parlées en Algérie incluent :
- **Chaoui** (Tacawit) - Est algérien
- **Mozabite** (Tumzabt) - Vallée du M'zab
- **Touareg** (Tamahaq/Tamacheq) - Sahara

### Standardisation

Les traductions utilisent :
- **Orthographe latine** : Standard de l'INALCO (Institut National des Langues et Civilisations Orientales)
- **Tifinagh** : Neo-Tifinagh standardisé par l'Académie Berbère et l'IRCAM

## Ressources

### Documentation Unicode Tifinagh
- Range : U+2D30 à U+2D7F
- Blocs : Tifinagh, Tifinagh Extended

### Polices recommandées
- **Noto Sans Tifinagh** (Google Fonts)
- **Hapax Berbère**
- **Akatab**

### Liens utiles
- [Unicode Tifinagh](https://unicode.org/charts/PDF/U2D30.pdf)
- [Clavier Tifinagh en ligne](https://www.lexilogos.com/clavier/tamazight.htm)
- [Académie Berbère](https://www.academie-berbere.com/)

## Contribution

Pour améliorer les traductions ou ajouter de nouvelles variantes dialectales, veuillez :

1. Vérifier l'exactitude linguistique avec des locuteurs natifs
2. Maintenir la cohérence terminologique
3. Respecter les standards orthographiques
4. Tester l'affichage sur différents navigateurs

---

**Note** : Les traductions sont fournies pour représenter la diversité linguistique de l'Algérie. Elles peuvent nécessiter des ajustements pour différentes régions ou variantes dialectales.
