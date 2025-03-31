// Función para cargar componentes HTML
async function loadComponent(elementId, componentPath) {
    try {
        console.log(`Intentando cargar componente: ${componentPath}`);
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (!element) {
            throw new Error(`No se encontró el elemento con ID: ${elementId}`);
        }
        element.innerHTML = html;
        console.log(`Componente cargado exitosamente: ${componentPath}`);

        // Reinicializar AOS después de cargar el componente
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    } catch (error) {
        console.error(`Error loading component from ${componentPath}:`, error);
    }
}

// Función para cargar scripts de componentes
function loadComponentScript(scriptPath) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = scriptPath;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

// Inicializar todos los componentes
async function initComponents() {
    console.log('Iniciando carga de componentes...');
    
    try {
        // Cargar componentes en orden
        await loadComponent('header-component', 'components/header.html');
        await loadComponent('missions-component', 'components/missions.html');
        await loadComponent('footer-component', 'components/footer.html');
        
        // Inicializar AOS después de cargar todos los componentes
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                once: true,
                offset: 100
            });
        }
    } catch (error) {
        console.error('Error durante la inicialización de componentes:', error);
    }
}

// Inicializar componentes cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initComponents); 