import { auth } from '../firebase/config/firebase.js';
import { logout } from '../firebase/auth/auth.js';

// Verificar si hay un usuario autenticado
auth.onAuthStateChanged((user) => {
    if (!user) {
        // Ruta relativa para volver al login
        window.location.href = '../login.html';
    } else {
        // Mostrar el email del usuario autenticado
        console.log('Usuario autenticado:', user.email);
        // Aquí puedes inicializar las funciones de admin.js
        // si necesitas que algo se ejecute después de verificar la autenticación
    }
});

// Manejar cierre de sesión
document.getElementById('logoutBtn')?.addEventListener('click', async () => {
    try {
        await logout();
        // Ruta relativa para volver al login
        window.location.href = '../login.html';
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        alert('Error al cerrar sesión');
    }
});
