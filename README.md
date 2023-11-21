# Dépôt pour la version publique de l'application web

Pour cet ECF Studi, j'ai créé un dépôt séparé qui contient le code de la partie publique de l'application web. Vous trouverez ci-dessous les instructions pour la lancer.

## Application web publique

### En local

Pour lancer l'app en local, il faut tout d'abord clôner ce dépôt.

Il faut vous assurer d'avoir installé `node` et `npm`.

L'application publique, comme le backoffice, est paramétrée par défaut pour faire leurs appels API au serveur en ligne. Si vous souhaitez la faire communiquer avec le serveur local, il vous faudra modifier le proxy dans [package.json](package.json#l5) et utiliser `http://localhost:3003` au lieu de `https://64.226.72.248` (64.226.72.248 étant l'adresse IP du droplet Digital Ocean).

Il suffira ensuite, dans votre terminal, de lancer la commande `npm start`, ce qui lancera le server Webpack de l'app et ouvrira cette dernière dans votre navigateur.
