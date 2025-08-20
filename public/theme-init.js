(function () {
  try {
    var d = document.documentElement;
    var t = localStorage.getItem('theme');
    if (t === 'dark') {
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
