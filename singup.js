document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const terms = document.getElementById('terms').checked;

        if (fullname.trim().length < 3) {
            showError(document.getElementById('fullname'), 'El nombre debe tener al menos 3 caracteres');
            return;
        }

        if (!isValidEmail(email)) {
            showError(document.getElementById('signupEmail'), 'Por favor, introduce un correo electrónico válido');
            return;
        }

        if (password.length < 6) {
            showError(document.getElementById('signupPassword'), 'La contraseña debe tener al menos 6 caracteres');
            return;
        }

        if (password !== confirmPassword) {
            showError(document.getElementById('confirmPassword'), 'Las contraseñas no coinciden');
            return;
        }

        if (!terms) {
            showError(document.getElementById('terms'), 'Debes aceptar los términos y condiciones');
            return;
        }

        simulateSignup(fullname, email);
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group') || input.parentElement;
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

    function simulateSignup(fullname, email) {
        showLoadingOverlay();
        setTimeout(() => {
            hideLoadingOverlay();
            showSuccessMessage('Registro exitoso');
            window.initDashboard(fullname);
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