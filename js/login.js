import { loginWithEmailAndPassword } from '../firebase/auth/auth.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('🔵 DOM Cargado - Login Page');
    const loginForm = document.getElementById('loginForm');
    
    if (!loginForm) {
        console.error('❌ No se encontró el formulario con ID "loginForm"');
        return;
    }

    console.log('✅ Formulario de login encontrado');
    
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('🔵 Intento de login iniciado');
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log('📧 Email intentando login:', email);
        
        const errorDiv = document.getElementById('error-message');
        const submitBtn = this.querySelector('button[type="submit"]');

        try {
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Iniciando sesión...';
            
            console.log('🔄 Llamando a Firebase Auth...');
            const user = await loginWithEmailAndPassword(email, password);
            console.log('✅ Login exitoso:', user);
            
            // Usando ruta relativa que funcionará en cualquier ambiente
            console.log('🔄 Redirigiendo a panel admin...');
            window.location.href = 'admin/admin.html';
            
        } catch (error) {
            console.error('❌ Error en login:', error);
            if (errorDiv) {
                errorDiv.textContent = error.message;
                errorDiv.style.display = 'block';
            } else {
                alert(error.message);
            }
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Ingresar';
        }
    });
});
