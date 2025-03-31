# Elementos de Texto en HTML

Los elementos de texto son fundamentales para estructurar y presentar contenido en una página web.

## Encabezados

Los encabezados van desde `<h1>` hasta `<h6>`:

```html
<h1>Título Principal</h1>
<h2>Subtítulo</h2>
<h3>Encabezado nivel 3</h3>
<h4>Encabezado nivel 4</h4>
<h5>Encabezado nivel 5</h5>
<h6>Encabezado nivel 6</h6>
```

## Párrafos y Formato

### Párrafos Básicos
```html
<p>Este es un párrafo normal de texto.</p>

<p>Los párrafos pueden contener
    saltos de línea en el código,
    pero se mostrarán como un solo párrafo.</p>
```

### Formato de Texto
```html
<p>Texto con <strong>negrita</strong> y <em>énfasis</em>.</p>

<p>Texto con <mark>resaltado</mark> y <code>código</code>.</p>

<p>Texto con <sub>subíndice</sub> y <sup>superíndice</sup>.</p>

<p>Texto <small>pequeño</small> y texto <del>tachado</del>.</p>
```

## Listas

### Lista Ordenada
```html
<ol>
    <li>Primer elemento</li>
    <li>Segundo elemento</li>
    <li>Tercer elemento</li>
</ol>
```

### Lista No Ordenada
```html
<ul>
    <li>Elemento</li>
    <li>Otro elemento</li>
    <li>Un elemento más</li>
</ul>
```

### Lista de Definición
```html
<dl>
    <dt>HTML</dt>
    <dd>Lenguaje de marcado para crear páginas web</dd>
    
    <dt>CSS</dt>
    <dd>Lenguaje para estilizar páginas web</dd>
</dl>
```

## Citas y Referencias

### Citas en Bloque
```html
<blockquote>
    <p>Esta es una cita larga que ocupa varios renglones y se muestra como un bloque separado del texto principal.</p>
    <cite>- Autor de la cita</cite>
</blockquote>
```

### Citas en Línea
```html
<p>Como dijo alguien famoso: <q>Esta es una cita corta en línea</q>.</p>
```

## Elementos Semánticos

```html
<article>
    <header>
        <h1>Título del Artículo</h1>
        <p>Autor: Juan Pérez</p>
    </header>
    
    <section>
        <h2>Primera Sección</h2>
        <p>Contenido de la sección...</p>
    </section>
    
    <footer>
        <p>Publicado el: 1 de enero de 2024</p>
    </footer>
</article>
```

## Buenas Prácticas

1. Usar un solo `<h1>` por página
2. Mantener una jerarquía lógica de encabezados
3. Usar elementos semánticos apropiados
4. No usar elementos de formato solo por estilo
5. Mantener el contenido legible y bien estructurado 