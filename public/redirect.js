(function () {
  const path = window.location.pathname.slice(1);
  if (path) {
    window.location.href = `/?currentRoute=${path}`;
  }
})();
