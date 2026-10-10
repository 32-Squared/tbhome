/* Shared behaviour for every standalone page. Usage: <body data-title="Page title" data-back="panel-id">
   - injects the top bar (bold title left, back link right, returning to that panel: "Back to the Boards" for panels
     left of Home, "Back to the Beach" for panels right of Home, "Back to Town" for the Town)
   - any <a data-back> link also returns to that panel
   - keeps the browser's address-bar color in step with the page spectrum */
(function () {
  var LEFT = ['dry-off', 'collection-details', 'malecon-plaza', 'thirty-two-squared', 'visitor-center']; // panels left of Home
  var TOWN = ['parking', 'mall', 'daycare', 'town-hall']; // panels in the Town (reached from Dry Off)
  var b = document.body, back = b.dataset.back || '', href = '/' + (back ? '#' + back : '');
  var plain = b.dataset.title === undefined; // no data-title: just an unpinned back link, top right
  var bar = document.createElement('div'), t = document.createElement('span'), a = document.createElement('a');
  bar.className = plain ? 'backrow' : 'bar'; t.textContent = b.dataset.title || ''; a.href = href; a.textContent = TOWN.indexOf(back) >= 0 ? 'Back to Town' : LEFT.indexOf(back) >= 0 ? 'Back to the Boards' : 'Back to the Beach';
  if (!plain) bar.appendChild(t);
  bar.appendChild(a); b.insertBefore(bar, b.firstChild);
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
