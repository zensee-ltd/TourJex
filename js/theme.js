(function () {
    var STORAGE_KEY = 'vs-theme';

    function preferredTheme() {
        try {
            var stored = localStorage.getItem(STORAGE_KEY);
            if (stored === 'light' || stored === 'dark') return stored;
        } catch (e) { /* ignore */ }
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    function applyTheme(theme) {
        var next = theme === 'dark' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch (e) { /* ignore */ }
        document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
            btn.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
            btn.setAttribute('title', next === 'dark' ? 'Light mode' : 'Dark mode');
        });
    }

    function toggleTheme() {
        var current = document.documentElement.getAttribute('data-theme') || preferredTheme();
        applyTheme(current === 'dark' ? 'light' : 'dark');
    }

    // Apply immediately if this script runs after DOM paint (head bootstrap also applies)
    applyTheme(preferredTheme());
    document.documentElement.classList.add('theme-ready');

    document.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-theme-toggle]');
        if (!btn) return;
        e.preventDefault();
        toggleTheme();
    });

    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
            try {
                if (localStorage.getItem(STORAGE_KEY)) return;
            } catch (err) { /* ignore */ }
            applyTheme(e.matches ? 'dark' : 'light');
        });
    }

    window.VisitSiyengaTheme = { apply: applyTheme, toggle: toggleTheme };
})();
