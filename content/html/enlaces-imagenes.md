# Enlaces e Imágenes en HTML

Los enlaces e imágenes son elementos esenciales para crear páginas web interactivas y visualmente atractivas.

## Enlaces

### Enlaces Básicos
```html
<a href="https://www.ejemplo.com">Enlace externo</a>
<a href="/pagina.html">Enlace interno</a>
<a href="#seccion">Enlace a sección</a>
<a href="mailto:correo@ejemplo.com">Enlace a email</a>
<a href="tel:+123456789">Enlace a teléfono</a>
```

### Atributos de Enlaces
- `href`: URL del destino
- `target`: Dónde abrir el enlace
- `rel`: Relación con la página actual
- `download`: Para descargar el recurso
- `title`: Texto descriptivo

```html
<a href="https://www.ejemplo.com" 
   target="_blank" 
   rel="noopener noreferrer"
   title="Visitar sitio de ejemplo">
    Abrir en nueva pestaña
</a>
```

### Tipos de Enlaces

#### Enlaces Relativos
```html
<!-- Mismo directorio -->
<a href="pagina.html">Página</a>

<!-- Subdirectorio -->
<a href="blog/post.html">Post</a>

<!-- Directorio padre -->
<a href="../index.html">Inicio</a>
```

#### Enlaces a Secciones
```html
<!-- Ancla en la página -->
<h2 id="seccion">Sección</h2>
<a href="#seccion">Ir a sección</a>
```

## Imágenes

### Imagen Básica
```html
<img src="imagen.jpg" alt="Descripción de la imagen">
```

### Atributos de Imágenes
- `src`: Ruta de la imagen
- `alt`: Texto alternativo
- `width`: Ancho
- `height`: Alto
- `loading`: Carga diferida
- `srcset`: Imágenes responsivas

```html
<img 
    src="imagen.jpg" 
    alt="Descripción" 
    width="300" 
    height="200"
    loading="lazy"
>
```

### Imágenes Responsivas

#### Usando srcset
```html
<img 
    src="small.jpg"
    srcset="small.jpg 300w,
            medium.jpg 600w,
            large.jpg 900w"
    sizes="(max-width: 500px) 300px,
           (max-width: 900px) 600px,
           900px"
    alt="Imagen responsiva"
>
```

#### Usando picture
```html
<picture>
    <source media="(min-width: 900px)" srcset="large.jpg">
    <source media="(min-width: 600px)" srcset="medium.jpg">
    <img src="small.jpg" alt="Imagen adaptativa">
</picture>
```

### Figuras y Leyendas
```html
<figure>
    <img src="imagen.jpg" alt="Descripción">
    <figcaption>Leyenda de la imagen</figcaption>
</figure>
```

## Buenas Prácticas

### Para Enlaces
1. Usar texto descriptivo
2. Evitar "click aquí" o "leer más"
3. Indicar enlaces externos
4. Usar `rel="noopener"` para enlaces externos
5. Mantener URLs relativas cuando sea posible

### Para Imágenes
1. Siempre incluir alt text
2. Optimizar imágenes para web
3. Usar dimensiones apropiadas
4. Implementar carga diferida
5. Proporcionar alternativas responsivas 