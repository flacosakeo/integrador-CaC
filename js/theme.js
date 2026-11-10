// Gestor de Modo Oscuro / Claro persistente con Bootstrap 5.3
(function () {
    const getStoredTheme = () => localStorage.getItem('theme');
    const setStoredTheme = theme => localStorage.setItem('theme', theme);

    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme();
        if (storedTheme) {
            return storedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const setTheme = theme => {
        document.documentElement.setAttribute('data-bs-theme', theme);
        const icon = document.getElementById('theme-icon');
        const text = document.getElementById('theme-text');
        if (icon) {
            if (theme === 'dark') {
                icon.className = 'bi bi-sun-fill text-warning';
                if (text) text.textContent = 'Modo Claro';
            } else {
                icon.className = 'bi bi-moon-stars-fill text-light';
                if (text) text.textContent = 'Modo Oscuro';
            }
        }
    };

    // Aplicar tema inicial inmediatamente para evitar flash
    setTheme(getPreferredTheme());

    window.addEventListener('DOMContentLoaded', () => {
        setTheme(getPreferredTheme());

        const toggleBtn = document.getElementById('btn-theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-bs-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                setStoredTheme(newTheme);
                setTheme(newTheme);
            });
        }
    });
})();
