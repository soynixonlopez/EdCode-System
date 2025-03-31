import { auth } from '../config/firebase.js';
import { 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

export const authService = {
    // Iniciar sesión
    login: async (email, password) => {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const role = await checkUserRole(userCredential.user.uid);
            return { user: userCredential.user, role };
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Registrar usuario
    register: async (email, password) => {
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfile(userCredential.user, 'student');
            return userCredential.user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Cerrar sesión
    logout: async () => {
        try {
            await signOut(auth);
            console.log('✅ Logout exitoso');
        } catch (error) {
            console.error('❌ Error en logout:', error);
            throw new Error('Error al cerrar sesión');
        }
    }
};

// Función de login
export const loginWithEmailAndPassword = async (email, password) => {
    console.log('🔵 Iniciando proceso de autenticación');
    console.log('📧 Email recibido:', email);
    
    try {
        console.log('🔄 Llamando a signInWithEmailAndPassword...');
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('✅ Credenciales recibidas:', userCredential);
        console.log('👤 Usuario autenticado:', userCredential.user.email);
        return userCredential.user;
    } catch (error) {
        console.error('❌ Error en autenticación:', error);
        console.error('❌ Código de error:', error.code);
        throw {
            code: error.code,
            message: getErrorMessage(error.code)
        };
    }
};

// Función para verificar el estado de autenticación
export const checkAuthState = (callback) => {
    return onAuthStateChanged(auth, callback);
};

// Funciones auxiliares
async function checkUserRole(uid) {
    const userDoc = await db.collection('users').doc(uid).get();
    return userDoc.exists ? userDoc.data().role : 'student';
}

async function createUserProfile(user, role) {
    await db.collection('users').doc(user.uid).set({
        email: user.email,
        role: role,
        createdAt: new Date()
    });
}

// Mensajes de error en español
function getErrorMessage(errorCode) {
    console.log('🔄 Traduciendo código de error:', errorCode);
    switch (errorCode) {
        case 'auth/wrong-password':
            return 'Contraseña incorrecta';
        case 'auth/user-not-found':
            return 'Usuario no encontrado';
        case 'auth/invalid-email':
            return 'Email inválido';
        case 'auth/too-many-requests':
            return 'Demasiados intentos fallidos. Intenta más tarde';
        default:
            return `Error al iniciar sesión (${errorCode})`;
    }
}
