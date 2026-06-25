(function () {
  // Restore saved mode before first paint (called from inline script in <head>)
  var saved = localStorage.getItem('pdmode');
  if (saved === 'retro') document.body.classList.add('retro');
})();

function toggleMode() {
  var isRetro = document.body.classList.toggle('retro');
  localStorage.setItem('pdmode', isRetro ? 'retro' : 'modern');
  updateToggle();
}

function updateToggle() {
  var btn = document.getElementById('modeToggle');
  if (!btn) return;
  btn.textContent = document.body.classList.contains('retro')
    ? '✨ Modern Mode'
    : '🕹️ Retro Mode';
}

// Set correct label on load
document.addEventListener('DOMContentLoaded', updateToggle);
