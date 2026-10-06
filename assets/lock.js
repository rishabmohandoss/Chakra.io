/* TEMPORARY preview password lock. Surface-level only (NOT security: content is still in the page source).
   Password: Rishab (any capitalization). Remembered per browser in localStorage.

   TO TURN OFF (fastest): set ENABLED = false below and push.
   TO REMOVE COMPLETELY: delete this file and delete the line
     <script src="/Chakra.io/assets/lock.js"></script>
   from the <head> of all 7 HTML pages. Full steps: handoff.md, "Temporary password lock". */
(function () {
  var ENABLED = true;
  var KEY = 'chakraUnlocked', PASS = 'rishab';
  if (!ENABLED) return;
  try { if (localStorage.getItem(KEY) === '1') return; } catch (e) {}
  var d = document.documentElement;
  d.classList.add('site-locked');
  // hold the launch screen until unlocked (it captures keys); cleared on unlock
  try { sessionStorage.setItem('chakraBooted', '1'); } catch (e) {}
  var css = document.createElement('style');
  css.textContent =
    'html.site-locked,html.site-locked body{overflow:hidden!important;background:#0b1633!important}' +
    'html.site-locked body>*:not(.lock){display:none!important}' +
    '.lock{position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;background:#0b1633;color:#f2f1eb;font-family:Manrope,system-ui,sans-serif;padding:16px}' +
    '.lock form{display:grid;gap:16px;width:min(100%,360px);margin:0 auto;text-align:center}' +
    '.lock .lock-title{font-size:34px;font-weight:800;letter-spacing:-.04em}.lock .lock-title b{color:#d9ff55}' +
    '.lock p{margin:0;color:#97a6c2;font-size:16px}' +
    '.lock input{font:inherit;font-size:18px;padding:14px 16px;border-radius:10px;border:1px solid #ffffff33;background:#101e3b;color:inherit;text-align:center;outline:none}' +
    '.lock input:focus{border-color:#d9ff55}' +
    '.lock button{font:inherit;font-weight:800;font-size:17px;padding:14px;border:0;border-radius:10px;background:#d9ff55;color:#101e3b;cursor:pointer}' +
    '.lock .err{color:#ffd166;min-height:1.4em;font-size:15px}' +
    '.lock.shake form{animation:lockshake .35s}@keyframes lockshake{25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}';
  document.head.appendChild(css);
  var build = function () {
    var w = document.createElement('div');
    w.className = 'lock';
    w.innerHTML = '<form><div class="lock-title">chakra<b>.</b>io</div><p>Private preview. Enter the password to continue.</p>' +
      '<input type="password" aria-label="Password" placeholder="Password" autocomplete="off" autofocus>' +
      '<button type="submit">Enter</button><div class="err" role="alert"></div></form>';
    document.body.appendChild(w);
    var f = w.querySelector('form'), i = w.querySelector('input'), err = w.querySelector('.err');
    i.focus();
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (i.value.trim().toLowerCase() === PASS) {
        try { localStorage.setItem(KEY, '1'); sessionStorage.removeItem('chakraBooted'); } catch (x) {}
        location.reload(); // reload so the launch screen plays fresh
      } else {
        err.textContent = 'Incorrect password';
        w.classList.remove('shake'); void w.offsetWidth; w.classList.add('shake');
        i.select();
      }
    });
  };
  if (document.body) build(); else document.addEventListener('DOMContentLoaded', build);
})();
