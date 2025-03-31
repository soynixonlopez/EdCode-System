const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Endpoint para listar temas
app.get('/list-topics', async (req, res) => {
    try {
        const { language } = req.query;
        console.log('Listando temas para:', language);
        
        if (!language) {
            console.error('Lenguaje no especificado');
            return res.status(400).json({ error: 'Lenguaje no especificado' });
        }

        const dir = path.join(__dirname, 'content', language);
        console.log('Buscando en directorio:', dir);
        
        try {
            const files = await fs.readdir(dir);
            console.log('Archivos encontrados:', files);
            
            // Obtener información de cada archivo
            const filesWithStats = await Promise.all(files.map(async (file) => {
                if (file.endsWith('.md')) {
                    const filePath = path.join(dir, file);
                    const stats = await fs.stat(filePath);
                    const content = await fs.readFile(filePath, 'utf8');
                    const title = content.split('\n')[0].replace(/^#\s*/, '');
                    return {
                        filename: file.replace('.md', ''),
                        title: title,
                        mtime: stats.mtime
                    };
                }
                return null;
            }));

            // Filtrar archivos nulos y ordenar por fecha de modificación
            const topics = filesWithStats
                .filter(topic => topic !== null)
                .sort((a, b) => a.mtime - b.mtime)
                .map(({ filename, title }) => ({ filename, title }));

            console.log('Temas procesados:', topics);
            res.json(topics);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log('El directorio no existe, devolviendo lista vacía');
                res.json([]);
            } else {
                throw error;
            }
        }
    } catch (error) {
        console.error('Error al listar temas:', error);
        res.status(500).json({ error: 'Error al listar temas' });
    }
});

// Endpoint para obtener contenido de un tema
app.get('/get-topic-content', async (req, res) => {
    try {
        const { language, topic } = req.query;
        console.log('Obteniendo contenido para:', { language, topic });
        
        if (!language || !topic) {
            console.error('Faltan parámetros requeridos');
            return res.status(400).json({ error: 'Faltan parámetros requeridos' });
        }

        // Si es un tema nuevo, devolver contenido por defecto
        if (topic.startsWith('nuevo-tema-')) {
            console.log('Es un tema nuevo, devolviendo contenido por defecto');
            return res.send('# Nuevo Tema\n\nEscribe tu contenido aquí...');
        }

        const filepath = path.join(__dirname, 'content', language, `${topic}.md`);
        console.log('Buscando archivo:', filepath);
        
        try {
            const content = await fs.readFile(filepath, 'utf8');
            console.log('Contenido encontrado');
            res.send(content);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log('El archivo no existe, devolviendo contenido por defecto');
                res.send('# Nuevo Tema\n\nEscribe tu contenido aquí...');
            } else {
                throw error;
            }
        }
    } catch (error) {
        console.error('Error al obtener contenido:', error);
        res.status(500).json({ error: 'Error al obtener contenido' });
    }
});

// Endpoint para guardar contenido
app.post('/save-content', async (req, res) => {
    try {
        const { language, filename, content } = req.body;
        console.log('Guardando contenido para:', { language, filename });
        
        // Validar datos
        if (!language || !filename || !content) {
            console.error('Faltan datos requeridos');
            return res.status(400).json({ error: 'Faltan datos requeridos' });
        }

        // Crear directorio si no existe
        const dir = path.join(__dirname, 'content', language);
        console.log('Creando directorio si no existe:', dir);
        try {
            await fs.mkdir(dir, { recursive: true });
        } catch (error) {
            console.error('Error al crear directorio:', error);
            return res.status(500).json({ error: 'Error al crear el directorio' });
        }

        // Guardar archivo
        const filepath = path.join(dir, `${filename}.md`);
        console.log('Guardando archivo:', filepath);
        try {
            await fs.writeFile(filepath, content, 'utf8');
            console.log('Contenido guardado exitosamente');
            res.json({ success: true });
        } catch (error) {
            console.error('Error al guardar archivo:', error);
            return res.status(500).json({ error: 'Error al guardar el archivo' });
        }
    } catch (error) {
        console.error('Error al guardar archivo:', error);
        res.status(500).json({ error: 'Error al guardar el archivo' });
    }
});

// Endpoint para actualizar recursos.html
app.post('/update-recursos-html', async (req, res) => {
    try {
        const { language, filename, title } = req.body;
        
        // Validar datos
        if (!language || !filename || !title) {
            return res.status(400).json({ error: 'Faltan datos requeridos' });
        }

        // Leer el archivo recursos.html
        const recursosPath = path.join(__dirname, 'recursos.html');
        let recursosContent = await fs.readFile(recursosPath, 'utf8');

        // Crear el nuevo elemento de tema
        const newTopic = `
                        <div class="cq-topic" data-topic="${filename}">
                            <i class="fas fa-file-code"></i>
                            ${title}
                        </div>`;

        // Encontrar la lista de temas correspondiente
        const topicListRegex = new RegExp(`<div class="cq-topic-list" id="${language}-topics">([\\s\\S]*?)</div>`);
        const match = recursosContent.match(topicListRegex);

        if (match) {
            // Verificar si el tema ya existe
            const existingTopicRegex = new RegExp(`data-topic="${filename}"`);
            if (existingTopicRegex.test(recursosContent)) {
                // Si el tema existe, actualizar su título
                recursosContent = recursosContent.replace(
                    new RegExp(`<div class="cq-topic" data-topic="${filename}">[\\s\\S]*?<\\/div>`),
                    newTopic.trim()
                );
            } else {
                // Si el tema no existe, agregarlo al final de la lista
                const updatedContent = recursosContent.replace(
                    topicListRegex,
                    `<div class="cq-topic-list" id="${language}-topics">${match[1]}${newTopic}</div>`
                );
                recursosContent = updatedContent;
            }

            // Guardar el archivo actualizado
            await fs.writeFile(recursosPath, recursosContent, 'utf8');
            console.log(`Tema "${title}" actualizado en recursos.html`);
            res.json({ success: true });
        } else {
            console.error('No se encontró la lista de temas para:', language);
            // Intentar crear la lista si no existe
            const topicsSidebarRegex = /<div class="cq-topics-sidebar">([\s\S]*?)<\/div>/;
            const sidebarMatch = recursosContent.match(topicsSidebarRegex);
            
            if (sidebarMatch) {
                const newTopicList = `
                    <div class="cq-topic-list" id="${language}-topics">
                        ${newTopic}
                    </div>`;
                
                const updatedContent = recursosContent.replace(
                    sidebarMatch[0],
                    `<div class="cq-topics-sidebar">${sidebarMatch[1]}${newTopicList}</div>`
                );
                
                await fs.writeFile(recursosPath, updatedContent, 'utf8');
                console.log(`Lista de temas creada para ${language}`);
                res.json({ success: true });
            } else {
                res.status(404).json({ error: 'No se encontró el contenedor de temas' });
            }
        }
    } catch (error) {
        console.error('Error al actualizar recursos.html:', error);
        res.status(500).json({ error: 'Error al actualizar el archivo' });
    }
});

// Endpoint para crear directorio
app.post('/create-directory', async (req, res) => {
    try {
        const { language } = req.body;
        console.log('Creando directorio para:', language);
        
        if (!language) {
            console.error('Lenguaje no especificado');
            return res.status(400).json({ error: 'Lenguaje no especificado' });
        }

        const dir = path.join(__dirname, 'content', language);
        console.log('Ruta del directorio:', dir);
        
        try {
            await fs.mkdir(dir, { recursive: true });
            console.log('Directorio creado exitosamente');
            res.json({ success: true });
        } catch (error) {
            console.error('Error al crear directorio:', error);
            return res.status(500).json({ error: 'Error al crear el directorio' });
        }
    } catch (error) {
        console.error('Error al crear directorio:', error);
        res.status(500).json({ error: 'Error al crear el directorio' });
    }
});

// Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
}); 