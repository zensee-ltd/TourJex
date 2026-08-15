(function () {
    var STORAGE_KEY = 'vs-theme';

    function preferredTheme() {
        try {
            var stored = localStorage.getItem(STORAGE_KEY);
            if (stored === 'light' || stored === 'dark') return stored;
        } catch (e) { /* ignore */ }
        try {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
        } catch (e) { /* ignore */ }
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

    function onToggleClick(e) {
        var btn = e.target.closest ? e.target.closest('[data-theme-toggle]') : null;
        if (!btn) return;
        e.preventDefault();
        e.stopPropagation();
        toggleTheme();
    }

    function bindToggles() {
        document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
            btn.addEventListener('click', onToggleClick);
        });
    }

    applyTheme(preferredTheme());
    document.documentElement.classList.add('theme-ready');

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindToggles);
    } else {
        bindToggles();
    }
    // Catch late / bubbled clicks as well
    document.addEventListener('click', onToggleClick);

    try {
        if (window.matchMedia) {
            var mql = window.matchMedia('(prefers-color-scheme: dark)');
            var onChange = function (e) {
                try {
                    if (localStorage.getItem(STORAGE_KEY)) return;
                } catch (err) { /* ignore */ }
                applyTheme(e.matches ? 'dark' : 'light');
            };
            if (typeof mql.addEventListener === 'function') {
                mql.addEventListener('change', onChange);
            } else if (typeof mql.addListener === 'function') {
                mql.addListener(onChange);
            }
        }
    } catch (e) { /* ignore */ }

    window.VisitSiyengaTheme = { apply: applyTheme, toggle: toggleTheme };
})();
