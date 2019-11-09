# polynomes

Outil de calcul polynomial - juste pour le plaisir!

#### Exemple d'entrée
```bash
# nombre rationnel
in: 2/1 2 -1/5 1 4/3 0
in: 3/9 1 -2 0

out (site): 
P: (2)x^2 + (-1/5)x + (4/3)
Q: (1/3)x + (-2)
P+Q: (2)x^2 + (2/15)x + (-2/3)
P-Q: (2)x^2 + (-8/15)x + (10/3)
PQ: (2/3)x^3 + (-61/15)x^2 + (38/45)x + (-8/3)
P/Q: (6)x + (177/5)
P%Q: (1082/15)
```

```bash
# nombre réel
in: 4.33 9 -5 7
in: -4.33 9

out (site):
P: (4.33)x^9 + (-5)x^7
Q: (-4.33)x9
...
PQ: (-18.749)x^18 + (21.65)x^16
P/Q: (-1)
P%Q: (-5)x^7
```

```bash
# nombre complexe
in: 2+5j 899 -2.3-6.7j 543
in: 7 766 -5.4j 763
...
PQ: (14+35j)x^1665 + (27-10.8j)x^1662 + (-16.1+46.9j)x^1309 + (36.18+12.42j)x^1306
```

```bash
# classe de congruence modulo 24
in: 25 0 -324 1
in: 44 0 95 1
...
PQ: [12]_24x^2 + [23]_24x + [20]24
```

#### fonctionner
cette page Web fonctionne sur Typescript et Less.js. Après avoir touché des fichiers, faire
```bash
> cd js/ && browserify index.js -o bundle.js
> cd css/ && lessc style.less style.css
```


