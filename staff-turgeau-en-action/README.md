# Staff Turgeau en Action

Site institutionnel officiel, principalement en français, préparé pour **staffturgeau.org**.

## Contenu

- mission, valeurs et méthode d’intervention;
- dix axes de programme;
- capacité, gouvernance, autorité et limites institutionnelles;
- présentation des responsables avec leurs portraits;
- explication prudente de l’article 71 de la Charte des Nations Unies;
- coordonnées et appels à l’engagement;
- référencement, accessibilité, sécurité et affichage mobile.

## Utilisation locale

Prérequis: Node.js 20 ou plus récent.

~~~bash
npm install
npm run build
npm run preview
~~~

Le dossier publié est `dist/`.

## Publication avec GitHub et Cloudflare Pages

1. Créer un dépôt GitHub, par exemple `staff-turgeau-en-action`.
2. Envoyer tous les fichiers de ce dossier sur la branche `main`.
3. Dans Cloudflare, créer un projet **Pages** nommé `staffturgeau` et le connecter au dépôt GitHub.
4. Utiliser:
   - commande de construction: `npm run build`
   - dossier de sortie: `dist`
5. Dans le projet Cloudflare Pages, ajouter le domaine personnalisé `staffturgeau.org`.

Le workflow GitHub Actions fourni peut aussi déployer automatiquement. Pour l’utiliser, ajouter dans les secrets du dépôt:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Mise à jour des contenus

- La page principale se trouve dans `public/index.html`.
- Les styles se trouvent dans `public/assets/css/styles.css`.
- Les portraits se trouvent dans `public/assets/images/membres/`.
- Les images et contenus institutionnels restent la propriété de Staff Turgeau en Action.

## Vérifications avant mise en ligne

- confirmer l’orthographe officielle des noms et fonctions;
- confirmer l’adresse publique et le numéro institutionnel;
- obtenir le consentement final des membres pour la publication de leurs portraits;
- relire les statuts et documents de reconnaissance avant toute affirmation juridique supplémentaire;
- configurer le DNS du domaine dans Cloudflare.

