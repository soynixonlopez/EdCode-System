# Box Model en CSS

El Box Model es un concepto fundamental en CSS que define cómo se calculan las dimensiones de los elementos HTML.

## Componentes del Box Model

### 1. Content (Contenido)
- El área donde se muestra el contenido
- Dimensiones controladas por `width` y `height`

### 2. Padding (Relleno)
- Espacio entre el contenido y el borde
- Transparente
- Aumenta el tamaño del elemento

### 3. Border (Borde)
- Línea que rodea el padding
- Puede tener diferentes estilos y colores
- Aumenta el tamaño del elemento

### 4. Margin (Margen)
- Espacio exterior al borde
- Transparente
- Crea espacio entre elementos

## Ejemplo Visual

```css
.box {
    /* Contenido */
    width: 300px;
    height: 200px;
    
    /* Padding */
    padding: 20px;
    
    /* Border */
    border: 2px solid black;
    
    /* Margin */
    margin: 10px;
}
```

## Box Sizing

### Content-Box (Por defecto)
```css
.elemento {
    box-sizing: content-box;
    width: 300px; /* Ancho del contenido solamente */
    padding: 20px;
    border: 2px solid black;
    /* Ancho total = 300 + 40 + 4 = 344px */
}
```

### Border-Box
```css
.elemento {
    box-sizing: border-box;
    width: 300px; /* Ancho total incluyendo padding y border */
    padding: 20px;
    border: 2px solid black;
    /* Ancho total = 300px */
}
```

## Propiedades Individuales

### Margin
```css
.elemento {
    /* Todos los lados */
    margin: 10px;
    
    /* Vertical | Horizontal */
    margin: 10px 20px;
    
    /* Top | Right | Bottom | Left */
    margin: 10px 20px 15px 25px;
    
    /* Lados individuales */
    margin-top: 10px;
    margin-right: 20px;
    margin-bottom: 15px;
    margin-left: 25px;
}
```

### Padding
```css
.elemento {
    /* Todos los lados */
    padding: 10px;
    
    /* Vertical | Horizontal */
    padding: 10px 20px;
    
    /* Top | Right | Bottom | Left */
    padding: 10px 20px 15px 25px;
    
    /* Lados individuales */
    padding-top: 10px;
    padding-right: 20px;
    padding-bottom: 15px;
    padding-left: 25px;
}
```

### Border
```css
.elemento {
    /* Shorthand */
    border: 2px solid black;
    
    /* Propiedades individuales */
    border-width: 2px;
    border-style: solid;
    border-color: black;
    
    /* Lados específicos */
    border-top: 2px solid black;
    border-right: 3px dashed red;
    border-bottom: 4px dotted blue;
    border-left: 1px solid green;
}
```

## Colapso de Márgenes

Los márgenes verticales entre elementos adyacentes colapsan:

```css
.elemento1 {
    margin-bottom: 20px;
}

.elemento2 {
    margin-top: 30px;
}
/* El espacio entre elementos será 30px, no 50px */
```

## Buenas Prácticas

1. Usar `box-sizing: border-box` globalmente
```css
* {
    box-sizing: border-box;
}
```

2. Ser consistente con las unidades
3. Usar márgenes en una sola dirección
4. Evitar márgenes negativos cuando sea posible
5. Considerar el colapso de márgenes en el diseño

## Ejemplo Completo

```css
/* Reset global */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

/* Contenedor */
.container {
    width: 80%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* Tarjeta */
.card {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-bottom: 20px;
}

/* Contenido de la tarjeta */
.card__content {
    padding: 15px;
    border: 1px solid #eee;
}
``` 