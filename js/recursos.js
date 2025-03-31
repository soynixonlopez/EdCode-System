document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS
    AOS.init({
        duration: 800,
        once: true
    });

    // Configurar marked.js
    marked.setOptions({
        highlight: function(code, lang) {
            if (lang && hljs.getLanguage(lang)) {
                return hljs.highlight(code, { language: lang }).value;
            }
            return hljs.highlightAuto(code).value;
        },
        breaks: true,
        gfm: true
    });

    // Referencias a elementos del DOM
    const languageTags = document.querySelectorAll('.cq-tag');
    const topicLists = document.querySelectorAll('.cq-topic-list');
    const contentBody = document.getElementById('contentBody');
    const currentTopicTitle = document.getElementById('currentTopic');

    // Estado actual
    let currentLanguage = 'html';
    let currentTopic = 'estructura-basica';

    // Función para inicializar los botones de copiar código y etiquetas
    function initializeCodeCopyButtons() {
        // Inicializar botones de copiar para bloques de código
        const codeBlocks = document.querySelectorAll('pre');
        
        codeBlocks.forEach(block => {
            // Crear el wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'code-block-wrapper';
            
            // Crear el botón de copiar
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.innerHTML = '<i class="fas fa-copy"></i> Copiar';
            
            // Envolver el bloque de código
            block.parentNode.insertBefore(wrapper, block);
            wrapper.appendChild(block);
            wrapper.appendChild(copyButton);
            
            // Agregar funcionalidad de copiado
            copyButton.addEventListener('click', async () => {
                const code = block.textContent;
                await copyToClipboard(code, copyButton);
            });
        });

        // Inicializar copiado para etiquetas inline
        const inlineCodes = document.querySelectorAll('code:not(pre code)');
        
        inlineCodes.forEach(code => {
            code.addEventListener('click', async () => {
                const text = code.textContent;
                await copyToClipboard(text, code);
            });
        });
    }

    // Función para copiar al portapapeles
    async function copyToClipboard(text, element) {
        try {
            await navigator.clipboard.writeText(text);
            
            // Manejar feedback visual
            if (element.classList.contains('copy-button')) {
                element.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
                setTimeout(() => {
                    element.innerHTML = '<i class="fas fa-copy"></i> Copiar';
                }, 2000);
            } else {
                element.classList.add('copied');
                setTimeout(() => {
                    element.classList.remove('copied');
                }, 2000);
            }
        } catch (err) {
            console.error('Error al copiar:', err);
            if (element.classList.contains('copy-button')) {
                element.innerHTML = '<i class="fas fa-times"></i> Error';
                setTimeout(() => {
                    element.innerHTML = '<i class="fas fa-copy"></i> Copiar';
                }, 2000);
            }
        }
    }

    // Función para cargar contenido
    async function loadContent(language, topic) {
        try {
            console.log('Cargando contenido:', { language, topic });
            const response = await fetch(`/get-topic-content?language=${language}&topic=${topic}`);
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            const markdown = await response.text();
            console.log('Contenido markdown cargado');
            
            // Convertir markdown a HTML usando marked
            const html = marked.parse(markdown);
            contentBody.innerHTML = html;

            // Resaltar bloques de código
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightBlock(block);
            });

            // Actualizar estado
            currentLanguage = language;
            currentTopic = topic;

            // Inicializar los botones de copiar después de cargar el contenido
            initializeCodeCopyButtons();

            // Actualizar título del contenido
            const titleMatch = markdown.match(/^#\s+(.+)$/m);
            if (titleMatch) {
                currentTopicTitle.textContent = titleMatch[1];
            }
        } catch (error) {
            console.error('Error al cargar el contenido:', error);
            contentBody.innerHTML = `
                <div class="cq-content-empty">
                    <i class="fas fa-file-alt"></i>
                    <p>No hay contenido disponible para este tema.</p>
                    <small class="text-muted">Error: ${error.message}</small>
                </div>
            `;
        }
    }

    // Función para actualizar la interfaz
    function updateUI(language, topic) {
        // Actualizar etiquetas de lenguaje
        languageTags.forEach(tag => {
            tag.classList.toggle('active', tag.dataset.language === language);
        });

        // Actualizar listas de temas
        topicLists.forEach(list => {
            list.classList.toggle('active', list.id === `${language}-topics`);
        });

        // Actualizar temas
        document.querySelectorAll('.cq-topic').forEach(t => {
            t.classList.toggle('active', t.dataset.topic === topic);
        });

        // Actualizar título
        const topicElement = document.querySelector(`.cq-topic[data-topic="${topic}"]`);
        if (topicElement) {
            currentTopicTitle.textContent = topicElement.textContent.trim();
        }
    }

    // Función para cargar lista de temas
    async function loadTopicsList(language) {
        try {
            const response = await fetch(`/list-topics?language=${language}`);
            if (!response.ok) {
                throw new Error('Error al cargar los temas');
            }
            
            const topics = await response.json();
            console.log('Temas cargados:', topics);
            
            // Obtener la lista de temas correspondiente
            const topicList = document.querySelector(`#${language}-topics`);
            if (!topicList) return;
            
            // Limpiar lista actual
            topicList.innerHTML = '';
            
            // Agregar temas en orden
            topics.forEach((topic, index) => {
                const topicDiv = document.createElement('div');
                topicDiv.className = 'cq-topic';
                if (index === 0 && !currentTopic) {
                    topicDiv.classList.add('active');
                }
                topicDiv.dataset.topic = topic.filename;
                
                // Seleccionar el icono apropiado según el tipo de tema
                let icon = 'fa-file-code';
                if (topic.filename.includes('texto')) icon = 'fa-font';
                else if (topic.filename.includes('imagen')) icon = 'fa-images';
                else if (topic.filename.includes('video')) icon = 'fa-video';
                
                topicDiv.innerHTML = `
                    <i class="fas ${icon}"></i>
                    ${topic.title}
                `;
                
                topicDiv.addEventListener('click', () => {
                    updateUI(language, topic.filename);
                    loadContent(language, topic.filename);
                });
                
                topicList.appendChild(topicDiv);
            });
        } catch (error) {
            console.error('Error al cargar lista de temas:', error);
        }
    }

    // Manejar selección de lenguaje
    languageTags.forEach(tag => {
        tag.addEventListener('click', async function() {
            const language = this.dataset.language;
            console.log('Lenguaje seleccionado:', language);
            
            // Cargar lista de temas
            await loadTopicsList(language);
            
            // Encontrar el primer tema
            const firstTopic = document.querySelector(`#${language}-topics .cq-topic`);
            if (firstTopic) {
                const topic = firstTopic.dataset.topic;
                updateUI(language, topic);
                loadContent(language, topic);
            }
        });
    });

    // Cargar contenido inicial
    loadTopicsList(currentLanguage);
    updateUI(currentLanguage, currentTopic);
    loadContent(currentLanguage, currentTopic);
}); 