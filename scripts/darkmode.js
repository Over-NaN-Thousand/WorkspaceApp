// script.js
document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDarkMode);
});

// Check for saved preference on page load
window.addEventListener('load', () => {
    const isDarkMode = localStorage.getItem('dark-mode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
});
