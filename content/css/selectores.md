# Selectores CSS

Los selectores CSS son patrones que se utilizan para seleccionar y dar estilo a elementos HTML específicos en una página web.

## Tipos de Selectores

### 1. Selectores Básicos

```css
/* Selector de elemento */
p {
    color: blue;
}

/* Selector de clase */
.mi-clase {
    font-size: 16px;
}

/* Selector de ID */
#mi-id {
    background-color: yellow;
}

/* Selector universal */
* {
    margin: 0;
    padding: 0;
}
```

### 2. Selectores Combinadores

```css
/* Descendiente (espacio) */
div p {
    color: red;
}

/* Hijo directo (>) */
div > p {
    font-weight: bold;
}

/* Hermano adyacente (+) */
h2 + p {
    margin-top: 10px;
}

/* Hermanos generales (~) */
h2 ~ p {
    color: gray;
}
```

### 3. Selectores de Atributo

```css
/* Elemento con atributo */
[type] {
    border: 1px solid black;
}

/* Atributo específico */
[type="text"] {
    padding: 5px;
}

/* Atributo que contiene palabra */
[class*="btn"] {
    cursor: pointer;
}

/* Atributo que comienza con */
[href^="https"] {
    color: green;
}

/* Atributo que termina con */
[src$=".jpg"] {
    border: 2px solid gray;
}
```

### 4. Pseudo-clases

```css
/* Estados de enlaces */
a:hover {
    text-decoration: underline;
}

a:visited {
    color: purple;
}

/* Estados de elementos */
input:focus {
    outline: 2px solid blue;
}

/* Posición de elementos */
li:first-child {
    font-weight: bold;
}

li:last-child {
    margin-bottom: 0;
}

li:nth-child(2n) {
    background-color: #f0f0f0;
}
```

### 5. Pseudo-elementos

```css
/* Primera letra */
p::first-letter {
    font-size: 2em;
}

/* Primera línea */
p::first-line {
    font-weight: bold;
}

/* Contenido antes/después */
.nota::before {
    content: "* ";
    color: red;
}

.enlace::after {
    content: " →";
}
```

## Especificidad

La especificidad determina qué estilos se aplican cuando hay conflictos:

1. Estilos en línea (1000)
2. IDs (100)
3. Clases, atributos y pseudo-clases (10)
4. Elementos y pseudo-elementos (1)

### Ejemplos de Especificidad

```css
/* Especificidad: 1 */
p {
    color: blue;
}

/* Especificidad: 10 */
.texto {
    color: red;
}

/* Especificidad: 100 */
#titulo {
    color: green;
}

/* Especificidad: 11 */
.contenedor p {
    color: purple;
}
```

## Buenas Prácticas

1. Usar nombres de clases descriptivos
2. Evitar selectores demasiado específicos
3. Preferir clases sobre IDs para reutilización
4. Mantener la especificidad lo más baja posible
5. Usar comentarios para organizar el código
6. Seguir una convención de nomenclatura (ej: BEM)

### Ejemplo de BEM

```css
/* Bloque */
.card {
    padding: 20px;
}

/* Elemento */
.card__title {
    font-size: 24px;
}

/* Modificador */
.card--featured {
    background: gold;
}
``` 