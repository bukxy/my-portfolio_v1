# Angular Portfolio

Conversion du template React Portfolio en **Angular 19**.

## Structure du projet

```
src/
├── app/
│   ├── components/
│   │   ├── animated-cursor/   # Curseur animé (signals)
│   │   ├── header/            # Navigation (signal isMenuOpen)
│   │   ├── social-icons/      # Icônes réseaux (@for)
│   │   └── theme-toggle/      # Dark/light mode (computed signal)
│   ├── pages/
│   │   ├── home/              # Typewriter avec signal()
│   │   ├── about/             # @for pour skills, timeline, services
│   │   ├── portfolio/         # Grille de projets (@for)
│   │   └── contact/           # Formulaire (signal FormState)
│   ├── services/
│   │   └── theme.service.ts   # signal() + computed()
│   ├── app.component.ts
│   ├── app.config.ts
│   ├── app.routes.ts
│   └── content_option.ts      # ⭐ DONNÉES À MODIFIER
└── styles.css
```

## Installation

```bash
npm install
ng serve
```

## Nouvelles APIs Angular 19 utilisées

| Feature | Utilisation |
|---------|------------|
| `signal()` | État réactif dans tous les composants |
| `computed()` | `isDark` dans ThemeService |
| `inject()` | Remplacement des constructeurs |
| `@for` | Remplacement de `*ngFor` |
| `@if` | Remplacement de `*ngIf` |
| Standalone components | Tous les composants |

## Personnalisation

Modifiez **`src/app/content_option.ts`** pour changer vos données personnelles.

## EmailJS (Contact)

```bash
npm install @emailjs/browser
```

Puis dans `contact.component.ts` :
```typescript
import emailjs from '@emailjs/browser';
emailjs.send(serviceId, templateId, params, userId);
```
