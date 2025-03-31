# Flexbox CSS

Flexbox es un modelo de diseño que permite crear layouts flexibles y responsivos de manera eficiente.

## Contenedor Flex (Flex Container)

Para crear un contenedor flex:
```css
.contenedor {
    display: flex;
}
```

### Propiedades del Contenedor

#### 1. flex-direction
Define la dirección del eje principal:
```css
.contenedor {
    flex-direction: row; /* Por defecto */
    /* Otros valores */
    flex-direction: row-reverse;
    flex-direction: column;
    flex-direction: column-reverse;
}
```

#### 2. justify-content
Alineación en el eje principal:
```css
.contenedor {
    justify-content: flex-start; /* Por defecto */
    /* Otros valores */
    justify-content: flex-end;
    justify-content: center;
    justify-content: space-between;
    justify-content: space-around;
    justify-content: space-evenly;
}
```

#### 3. align-items
Alineación en el eje cruzado:
```css
.contenedor {
    align-items: stretch; /* Por defecto */
    /* Otros valores */
    align-items: flex-start;
    align-items: flex-end;
    align-items: center;
    align-items: baseline;
}
```

#### 4. flex-wrap
Control del desbordamiento:
```css
.contenedor {
    flex-wrap: nowrap; /* Por defecto */
    /* Otros valores */
    flex-wrap: wrap;
    flex-wrap: wrap-reverse;
}
```

#### 5. gap
Espacio entre elementos:
```css
.contenedor {
    gap: 20px; /* Espacio igual */
    /* O específico */
    gap: 20px 10px; /* fila columna */
}
```

## Elementos Flex (Flex Items)

### Propiedades de los Items

#### 1. flex-grow
Factor de crecimiento:
```css
.item {
    flex-grow: 0; /* Por defecto */
    flex-grow: 1; /* Crece */
    flex-grow: 2; /* Crece el doble */
}
```

#### 2. flex-shrink
Factor de reducción:
```css
.item {
    flex-shrink: 1; /* Por defecto */
    flex-shrink: 0; /* No se reduce */
    flex-shrink: 2; /* Se reduce el doble */
}
```

#### 3. flex-basis
Tamaño base:
```css
.item {
    flex-basis: auto; /* Por defecto */
    flex-basis: 200px;
    flex-basis: 50%;
}
```

#### 4. flex (shorthand)
Combina grow, shrink y basis:
```css
.item {
    flex: 0 1 auto; /* Por defecto */
    flex: 1; /* flex: 1 1 0% */
    flex: auto; /* flex: 1 1 auto */
    flex: none; /* flex: 0 0 auto */
}
```

#### 5. align-self
Alineación individual:
```css
.item {
    align-self: auto; /* Por defecto */
    align-self: flex-start;
    align-self: flex-end;
    align-self: center;
    align-self: stretch;
}
```

## Ejemplos Prácticos

### 1. Navegación Responsive
```css
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}

.nav-links {
    display: flex;
    gap: 1rem;
}

@media (max-width: 768px) {
    .nav {
        flex-direction: column;
    }
    
    .nav-links {
        flex-direction: column;
        align-items: center;
    }
}
```

### 2. Grid de Tarjetas
```css
.card-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.card {
    flex: 1 1 300px;
    padding: 20px;
    border: 1px solid #ccc;
}
```

### 3. Layout de Página
```css
.page {
    display: flex;
    min-height: 100vh;
}

.sidebar {
    flex: 0 0 250px;
}

.main-content {
    flex: 1;
    padding: 20px;
}
```

## Buenas Prácticas

1. Usar flex para layouts unidimensionales
2. Considerar la dirección del eje principal
3. Usar gap en lugar de márgenes
4. Planificar el comportamiento responsive
5. Combinar con media queries cuando sea necesario

## Ejemplo Completo

```css
/* Contenedor principal */
.container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
}

/* Barra lateral */
.sidebar {
    flex: 0 0 250px;
}

/* Contenido principal */
.main {
    flex: 1;
    min-width: 300px;
}

/* Grid de elementos */
.grid {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.grid-item {
    flex: 1 1 200px;
    padding: 15px;
    border: 1px solid #ccc;
}

/* Media query para responsive */
@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }
    
    .sidebar {
        flex: none;
        width: 100%;
    }
}
``` 