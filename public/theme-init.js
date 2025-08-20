(function () {
  try {
    var d = document.documentElement;
    var t = localStorage.getItem('theme');
    if (t === 'dark') {
      d.classList.add('dark');
      d.style.colorScheme = 'dark';
    } else {
      // Default to light on first paint and persist it
      d.classList.remove('dark');
      d.style.colorScheme = 'light';
      if (t !== 'light') {
        try {
          localStorage.setItem('theme', 'light');
        } catch (e) {
          /* ignore write errors */
        }
      }
    }
  } catch (e) {
    // no-op
  }
})();
