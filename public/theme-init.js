(function () {
  try {
    var d = document.documentElement;
    var t = localStorage.getItem('theme');
    var systemDark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (t === 'dark' || (!t && systemDark)) {
      d.classList.add('dark');
      d.style.colorScheme = 'dark';
    } else {
      d.classList.remove('dark');
      d.style.colorScheme = 'light';
    }
  } catch (e) {
    // no-op
  }
})();
