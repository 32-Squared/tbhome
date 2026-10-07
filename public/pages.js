/* Shared behaviour for every standalone page. Usage: <body data-title="Page title" data-back="panel-id">
   - injects the top bar (bold title left, "Back to the boards" right, returning to that panel)
   - any <a data-back> link also returns to that panel
   - keeps the browser's address-bar color in step with the page spectrum */
(function () {
  var b = document.body, back = b.dataset.back || '', href = '/' + (back ? '#' + back : '');
  var bar = document.createElement('div'), t = document.createElement('span'), a = document.createElement('a');
  bar.className = 'bar'; t.textContent = b.dataset.title || ''; a.href = href; a.textContent = 'Back to the boards';
  bar.appendChild(t); bar.appendChild(a); b.insertBefore(bar, b.firstChild);
  [].forEach.call(document.querySelectorAll('a[data-back]'), function (l) { l.href = href; });

  // same stops as --spectrum in pages.css: [position %, r, g, b]
  var S = [[0,212,160,106],[10,196,136,90],[22,168,106,90],[35,122,88,112],[52,74,90,122],[70,58,106,138],[88,200,144,96],[100,212,165,120]];
  var meta = document.querySelector('meta[name=theme-color]'), tick = false;
  function at(p) {
    for (var i = 1; i < S.length; i++) if (p <= S[i][0]) {
      var a = S[i - 1], c = S[i], f = (p - a[0]) / (c[0] - a[0]);
      return 'rgb(' + [1, 2, 3].map(function (k) { return Math.round(a[k] + (c[k] - a[k]) * f); }).join(',') + ')';
    }
    return 'rgb(212,165,120)';
  }
  function update() {
    tick = false;
    if (meta) meta.setAttribute('content', at(Math.min(100, scrollY / document.documentElement.scrollHeight * 100)));
  }
  addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', update); addEventListener('load', update); update();
})();
