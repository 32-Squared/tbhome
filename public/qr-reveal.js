/* Wave QR codes: soft reveal. Each <div class="qr" data-reveal="ISO time" data-src="image url"> shows its
   "Revealed:" note until that moment (the dates are midnight UTC), then is replaced by the QR image.
   Checked on load, when the tab becomes visible again, and every 30 seconds while the page stays open. */
(function () {
  var boxes = [].slice.call(document.querySelectorAll('.qr[data-reveal]'));
  if (!boxes.length) return;
  var timer;

  function check() {
    boxes = boxes.filter(function (el) {
      if (Date.now() < Date.parse(el.getAttribute('data-reveal'))) return true; // not yet
      var img = new Image();
      img.className = 'qr qr--live';
      img.alt = 'QR code for ' + (el.getAttribute('data-name') || 'this wave');
      img.decoding = 'async';
      // Swap only once the picture is ready, so there is no blank flash; if it fails, the note stays
      img.onload = function () { if (el.parentNode) el.parentNode.replaceChild(img, el); };
      img.src = el.getAttribute('data-src');
      return false;
    });
    if (!boxes.length) clearInterval(timer);
  }

  check();
  if (boxes.length) timer = setInterval(check, 30000);
  document.addEventListener('visibilitychange', function () { if (!document.hidden) check(); });
})();
