document.addEventListener('DOMContentLoaded', function() {
    // Configuración de partículas
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('particles.js loaded - callback');
    });

    // Función para mostrar secciones
    window.showSection = function(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    }

    // Inicializar dashboard
    window.initDashboard = function(name) {
        document.getElementById('userNameDisplay').textContent = name;
        updateDashboardStats();
        simulateTerminal();
        showSection('dashboardSection');
    }

    // Actualizar estadísticas del dashboard
    function updateDashboardStats() {
        document.getElementById('commitsCount').textContent = Math.floor(Math.random() * 100);
        document.getElementById('prCount').textContent = Math.floor(Math.random() * 20);
        document.getElementById('issuesResolved').textContent = Math.floor(Math.random() * 50);
    }

    // Simular terminal
    function simulateTerminal() {
        const terminal = document.querySelector('.terminal');
        const commands = [
            'npm install',
            'git pull origin master',
            'npm run test',
            'git push origin feature/new-dashboard'
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < commands.length) {
                const line = document.createElement('div');
                line.className = 'terminal-line terminal-prompt typing-animation';
                line.textContent = commands[i];
                terminal.appendChild(line);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 2000);
    }

    // Agregar tarea
    window.addTask = function() {
        const newTaskInput = document.getElementById('newTask');
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            const li = document.createElement('li');
            li.innerHTML = `${taskText} <button onclick="this.parentElement.remove()">X</button>`;
            document.getElementById('taskList').appendChild(li);
            newTaskInput.value = '';
        }
    }

    // Cerrar sesión
    window.logout = function() {
        showSection('welcomeSection');
    }
});