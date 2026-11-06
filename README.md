# Style Nebula Atlas · Hologram

Your atlas as a hologram that stands on a printed square on a table. The map lies flat, and time rises upward. Each work floats as a glowing world with its photo, sized and lit by your impact rating. Works with no single date or place circle the outer ring.

It runs in the phone's own browser, with no app to install:

- **iPhone and iPad:** Safari
- **Android:** Chrome

The printed square holds a QR code inside a thick black frame, and it does two jobs:

1. **It opens the page.** The phone's camera app reads the QR code and opens the hologram site.
2. **It anchors the hologram.** The page tracks the black frame and recognizes the QR code inside it. The hologram stands on the square and sizes itself to it.

This is a separate site. It changes nothing in the atlas, its PDFs or its shared file.

## Three ways to look

**Stand it in your room**: the smooth, Fologram-like way. Your phone's own room tracking (ARKit or ARCore) holds the atlas still while you walk around it, or pinch it huge and stand inside it.

- **Android (Chrome):** opens right in the page. Move the phone slowly so it finds the floor. Put the ring on the printed square and tap: the atlas is set down there, facing you. Drag, pinch, twist and tap a world for its card, all inside the camera view. **Reset** lets you set it down again.
- **iPhone (Safari):** Safari doesn't give web pages room tracking, so the page builds the atlas into a 3D model and hands it to Apple's AR viewer, the same system Fologram uses. Aim at the square on the floor and it settles there. Pinch to scale, drag to move, and walk around and inside it. Every world carries its name, but Apple's viewer can't open cards. Tap **Done** to come back to the page.

**Pin it to the square**: the camera finds the printed square and stands the atlas on it, on any phone. Tap a world for its full card with photos and notes. Phone browsers can track the phone turning but not walking, so the motion sensors hold the atlas for a few seconds when the square leaves the picture, then it fades until you aim back at the square.

**Look without the camera**: an on-screen view, for checking things on a computer.

## Gestures

| Gesture | What it does |
|---|---|
| One-finger drag | Slides the atlas across the floor |
| Pinch | Grows or shrinks it (in your room, up to about 40 times) |
| Two-finger twist | Turns it |
| Tap a world | Opens its card: photos (tap the photo for the extras), caption, rating, designer, year, place, styles, your notes, and what it draws on |
| Tap empty space | Closes the card |

The buttons along the top: **Names** labels every world, **Reset** sets it down again, and **?** shows these instructions.

## Set it up on GitHub (free)

### 1. Make the atlas file

In the atlas, click **Save a copy to share** and choose **Compact** photos. Rename the file it saves to `atlas.html`.

### 2. Make a GitHub repository

Sign in at github.com, then click **New repository**:

- **Name:** `nebula-hologram` (any name works)
- **Visibility:** **Public**. Free GitHub Pages needs a public repository.

### 3. Upload the files

Open the new repository and choose **Add file → Upload files**. Drag in the following, keeping the `lib` and `data` folders as folders:

- the contents of this folder
- your `atlas.html`

Then click **Commit changes**.

### 4. Turn on GitHub Pages

Go to **Settings → Pages**. Under **Build and deployment**, choose:

- **Deploy from a branch**
- Branch **main**, folder **/ (root)**

Click **Save**. After a minute, the site is live at:

`https://YOURNAME.github.io/nebula-hologram/`

### 5. Print the marker

On your computer, open `https://YOURNAME.github.io/nebula-hologram/marker.html`. It must be the github.io address, so the QR code points there.

Choose a size (12 cm is a good start), click **Print**, and print at 100%. Matte paper glares less.

### 6. Try it

Lay the square flat on a table and scan it with the phone's camera. Tap **Start the camera** and allow camera access. The atlas rises from the square.

To look at the hologram on a computer without a camera, add `?preview` to the address, or tap **Look without the camera**.

## Updating it

When your spreadsheet changes:

1. Save a new shared copy.
2. Rename it `atlas.html`.
3. Upload it to the repository again. It replaces the old one.

The printed square keeps working. Reprint it only if the site moves to a new address.

## Good to know

- **Privacy:** a public repository means anyone with the address can see the atlas, its photos and your notes. It isn't listed anywhere, but it isn't private.
- **Tracking:** the camera tracks best with:
  - even light on the square
  - the whole square in view
  - the phone 30–60 cm away
  - a bigger print (15–18 cm) for a hologram you'll walk around
- **Big atlas files:** GitHub's upload page takes files up to 25 MB. With many photos, save the shared copy with Compact photos, or upload it with GitHub Desktop instead (up to 100 MB).
- **Settings:** `config.js` holds the few settings: the atlas file name, an optional fixed address for the QR code, and an optional printed title.

## Files

| File | What it is |
|---|---|
| `index.html` | The hologram page |
| `hologram.js` | Builds the hologram and handles touch and the cards |
| `marker.html`, `marker.js` | The printable square, and the code that both prints and recognizes it |
| `config.js` | Settings |
| `lib/three.min.js` | Three.js r147, the 3D library the atlas uses |
| `lib/ar-threex.js` | AR.js 3.4, marker tracking that works in iPhone and Android browsers |
| `lib/usdz-exporter.js` | Three.js's USDZ exporter, which builds the model for Apple's AR viewer |
| `lib/qrcode.js` | Makes the QR code |
| `lib/coast.js` | The coastlines |
| `data/camera_para.dat` | AR.js's standard camera settings |
| `atlas.html` | Yours: the shared copy of your atlas (not included) |
