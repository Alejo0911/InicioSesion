document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (!isValidEmail(email)) {
            showError(document.getElementById('loginEmail'), 'Por favor, introduce un correo electrónico válido');
            return;
        }

        if (password.length < 6) {
            showError(document.getElementById('loginPassword'), 'La contraseña debe tener al menos 6 caracteres');
            return;
        }

        simulateLogin(email);
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.textContent = message;

        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }

        formGroup.classList.add('error');

        setTimeout(() => {
            formGroup.classList.remove('error');
            errorElement.remove();
        }, 3000);
    }

    function simulateLogin(email) {
        showLoadingOverlay();
        setTimeout(() => {
            hideLoadingOverlay();
            showSuccessMessage('Inicio de sesión exitoso');
            window.initDashboard(email.split('@')[0]);
        }, 2000);
    }

    function showLoadingOverlay() {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(loadingOverlay);
    }

    function hideLoadingOverlay() {
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.remove();
        }
    }

    function showSuccessMessage(message) {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = message;
        document.body.appendChild(successMessage);

        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    }
});