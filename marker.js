/* The printed marker: a QR code (the link to this page) inside a thick black frame.
   The phone's camera app reads the QR to open the page; once open, the page tracks the black frame
   and recognizes the QR inside it as its pattern, so the same square both opens the experience and anchors it. */
const MARKER = {
  RATIO: 0.6,      // the QR area is 60% of the marker's width; the black frame is the rest
  MARGIN: 3,       // white modules between the QR and the black frame
  // the address the QR points to: this folder of the site, the same on the print page and the AR page
  url(){ const u = (window.AR_SITE_URL || "").trim(); if (u) return u; const h = location.href.split("#")[0].split("?")[0]; return h.slice(0, h.lastIndexOf("/") + 1); },
  // the QR with its white margin, crisp, `cell` pixels per module
  inner(url, cell){
    const qr = qrcode(0, "M"); qr.addData(url); qr.make();
    const n = qr.getModuleCount(), m = this.MARGIN, size = (n + 2*m)*cell;
    const c = document.createElement("canvas"); c.width = c.height = size;
    const g = c.getContext("2d"); g.fillStyle = "#fff"; g.fillRect(0, 0, size, size); g.fillStyle = "#000";
    for (let r = 0; r < n; r++) for (let q = 0; q < n; q++) if (qr.isDark(r, q)) g.fillRect((q + m)*cell, (r + m)*cell, cell, cell);
    return c;
  },
  // the whole marker: the black frame with the QR inside
  full(url, px){
    const inner = this.inner(url, 12), c = document.createElement("canvas"); c.width = c.height = px;
    const g = c.getContext("2d"); g.fillStyle = "#000"; g.fillRect(0, 0, px, px);
    const s = px*this.RATIO, o = (px - s)/2; g.imageSmoothingEnabled = false; g.drawImage(inner, o, o, s, s);
    return c;
  },
  // the pattern file the tracker matches against: the inner image at 16 × 16, in four turns, as AR.js trains it
  patt(url){
    const img = this.inner(url, 12), c = document.createElement("canvas"); c.width = c.height = 16;
    const g = c.getContext("2d"); let out = "";
    for (let o = 0; o > -2*Math.PI; o -= Math.PI/2){
      g.save(); g.clearRect(0, 0, 16, 16); g.translate(8, 8); g.rotate(o); g.drawImage(img, -8, -8, 16, 16); g.restore();
      const d = g.getImageData(0, 0, 16, 16).data;
      if (o !== 0) out += "\n";
      for (let ch = 2; ch >= 0; ch--) for (let y = 0; y < 16; y++){ let line = ""; for (let x = 0; x < 16; x++){ if (x) line += " "; line += String(d[(y*16 + x)*4 + ch]).padStart(3); } out += line + "\n"; }
    }
    return out;
  }
};
