document.addEventListener('DOMContentLoaded', function() {
    // Inicializar SimpleMDE
    const editor = new SimpleMDE({
        element: document.getElementById('editor'),
        spellChecker: false,
        autosave: {
            enabled: true,
            uniqueId: 'codequest-editor',
            delay: 1000,
        },
        toolbar: [
            'bold', 'italic', 'heading', '|',
            'code', 'quote', 'unordered-list', 'ordered-list', '|',
            'link', 'image', '|',
            'preview', 'side-by-side', 'fullscreen', '|',
            'guide'
        ]
    });

    // Referencias a elementos del DOM
    const languageButtons = document.querySelectorAll('.cq-language-btn');
    const topicsList = document.getElementById('topicsList');
    const addTopicBtn = document.querySelector('.cq-add-topic-btn');
    const saveBtn = document.querySelector('.cq-save-btn');
    const previewBtn = document.querySelector('.cq-preview-btn');
    const topicTitleInput = document.getElementById('topicTitle');

    // Estado actual
    let currentLanguage = 'html';
    let currentTopic = null;

    // Función para cargar temas
    async function loadTopics(language) {
        try {
            console.log('Cargando temas para:', language);
            
            // Obtener temas del servidor
            const response = await fetch(`http://localhost:3000/list-topics?language=${language}`);
            if (!response.ok) {
                throw new Error('Error al cargar los temas');
            }
            
            const topics = await response.json();
            console.log('Temas encontrados:', topics);
            
            // Limpiar lista actual
            topicsList.innerHTML = '';
            
            // Agregar temas existentes
            topics.forEach(topic => {
                const topicDiv = document.createElement('div');
                topicDiv.className = 'cq-topic';
                topicDiv.dataset.topic = topic.filename;
                topicDiv.innerHTML = `
                    <i class="fas fa-file-code"></i>
                    ${topic.title}
                `;
                topicDiv.addEventListener('click', () => {
                    console.log('Cargando tema:', topic.filename);
                    loadTopicContent(language, topic.filename);
                });
                topicsList.appendChild(topicDiv);
            });
        } catch (error) {
            console.error('Error al cargar temas:', error);
            topicsList.innerHTML = '<div class="cq-error">Error al cargar los temas</div>';
        }
    }

    // Función para cargar contenido de un tema
    async function loadTopicContent(language, topicId) {
        try {
            console.log('Cargando contenido para:', topicId);
            currentTopic = topicId;
            
            // Obtener contenido del servidor
            const response = await fetch(`http://localhost:3000/get-topic-content?language=${language}&topic=${topicId}`);
            if (!response.ok) {
                throw new Error('Error al cargar el contenido');
            }
            
            const content = await response.text();
            editor.value(content);
            topicTitleInput.value = topicId.split('-').join(' '); // Convertir filename a título
            
            // Actualizar estado activo
            document.querySelectorAll('.cq-topic').forEach(t => t.classList.remove('active'));
            const topicElement = document.querySelector(`[data-topic="${topicId}"]`);
            if (topicElement) {
                topicElement.classList.add('active');
            }
        } catch (error) {
            console.error('Error al cargar contenido:', error);
            editor.value('# Error\n\nNo se pudo cargar el contenido del tema.');
        }
    }

    // Función para convertir título a nombre de archivo
    function slugify(text) {
        return text.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }

    // Función para guardar contenido
    async function saveContentToFile(language, filename, content) {
        try {
            console.log('Guardando contenido para:', filename);
            
            // Guardar contenido en el servidor
            const response = await fetch('http://localhost:3000/save-content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    language,
                    filename,
                    content,
                    title: topicTitleInput.value
                })
            });

            if (!response.ok) {
                throw new Error('Error al guardar el contenido');
            }

            // Recargar la lista de temas
            await loadTopics(language);
            return true;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    // Event Listeners
    languageButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const language = btn.dataset.language;
            currentLanguage = language;
            
            languageButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            loadTopics(language);
        });
    });

    // Evento para el botón de nuevo tema
    addTopicBtn.addEventListener('click', () => {
        console.log('Creando nuevo tema...');
        if (!currentLanguage) {
            alert('Por favor, selecciona un lenguaje primero');
            return;
        }

        const id = 'nuevo-tema-' + Date.now();
        const title = 'Nuevo Tema';
        
        // Crear nuevo tema directamente
        const topicDiv = document.createElement('div');
        topicDiv.className = 'cq-topic active';
        topicDiv.dataset.topic = id;
        topicDiv.innerHTML = `
            <i class="fas fa-file-code"></i>
            ${title}
        `;
        
        // Eliminar la referencia a sampleContent y crear contenido inicial
        const initialContent = '# Nuevo Tema\n\nEscribe tu contenido aquí...';
        
        // Guardar el nuevo tema en el servidor
        saveContentToFile(currentLanguage, id, initialContent)
            .then(() => {
                topicDiv.addEventListener('click', () => {
                    console.log('Cargando tema:', id);
                    loadTopicContent(currentLanguage, id);
                });
                topicsList.appendChild(topicDiv);
                
                // Cargar el contenido del nuevo tema en el editor
                editor.value(initialContent);
                topicTitleInput.value = title;
                currentTopic = id;
                
                // Actualizar estado activo
                document.querySelectorAll('.cq-topic').forEach(t => t.classList.remove('active'));
                topicDiv.classList.add('active');
            })
            .catch(error => {
                console.error('Error al crear nuevo tema:', error);
                alert('Error al crear el nuevo tema');
            });
    });

    saveBtn.addEventListener('click', async () => {
        if (!currentLanguage || !currentTopic) {
            alert('Por favor, selecciona un tema o crea uno nuevo');
            return;
        }
        
        const title = topicTitleInput.value;
        if (!title || title.trim() === '') {
            alert('Por favor, ingresa un título para el tema');
            return;
        }

        const content = editor.value();
        const filename = slugify(title);

        // Intentar guardar el archivo
        const saved = await saveContentToFile(
            currentLanguage,
            filename,
            content
        );

        if (saved) {
            console.log('Contenido guardado con éxito');
        } else {
            console.error('Error al guardar el contenido');
        }
    });

    previewBtn.addEventListener('click', () => {
        editor.togglePreview();
    });

    // Cargar contenido inicial
    loadTopics('html');
}); 