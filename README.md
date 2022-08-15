# Système de design transactionnel

Ce dépôt contient le prototype d'un site Web allégé du Système de design transactionnel utilisé dans CASA.

## Personnes ressources

- Clara Plebani <clara.plebani@saaq.gouv.qc.ca>
- Gabriel Caron <gabriel.caron@saaq.gouv.qc.ca>

## Configuration requise

Aucune configuration requise. N'importe quel éditeur de code récent peut être utilisé, comme Visual Studio Code.

## Dépendances

Aucune dépendance requise.

## CSS

* SASS
* Méthodologie BEM

## Intégrer le HTML, les CSS et les JavaScript

Le dossier `components` contient les mêmes composantes que l'on retrouvait dans l'ancienne version du site Web du système de design. Chaque composante possède son fichier HTML, sa feuille de styles SASS et son JavaScript.

Le dossier liaisons contient la feuille de styles CSS compilée (liaisons/css/styles.css).

Dans les pages Web de chaque portail, intégrer la feuille de styles CSS. Voici l'exemple d'un page qui utiliserait la composante _Accordion_:
```
<link href="../../liaisons/css/styles.css" rel="stylesheet">
<script src="accordion.js" type="text/javascript" defer></script>
```

Si la composante possède un JavaScript, l'ajouter via une balise script tel que montré plus haut.

Dans ce prototype, les composantes _Accordion_ et _Back to top_ possèdent un JavaScript fonctionnel.

Il n'est pas nécessaire de mettre la balise script d'une composante tout en bas de la page Web. En ajoutant l'attribut defer, le JavaScript va s'exécuter seulement lorsque la page Web sera entièrement chargé.

## Historique des modifications récentes

- Le préfixe `bx` des classes CSS a été remplacé par `sdt`. Mis à part le préfixe, les noms des classes CSS sont identiques. Par exemple, la classe `bx--accordion__item` est devenue `sdt-accordion__item`. Il est donc possible de faire un rechercher/remplacer dans le code: rechercher `bx--` et remplacer par `sdt-`.
