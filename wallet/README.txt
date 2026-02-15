APPLE WALLET PASS INSTRUCTIONS
================================

Your Apple Wallet pass assets are ready in this folder.

FILES CREATED:
- pass.json       : The definition of your pass (colors, text, links).
- icon.png (x1,x2,x3) : The icon shown on the lock screen (based on your logo).
- logo.png (x1,x2,x3) : The logo shown on the top of the pass.
- generate_pass.js: A script to regenerate manifest.json if you change files.

HOW TO FINISH & INSTALL:

1. You need an Apple Developer Account to create a Pass Type ID.
2. Go to developer.apple.com -> Certificates, Identifiers & Profiles -> Identifiers -> Pass Type IDs.
3. Create a new Pass Type ID (e.g., pass.com.alexandru-cornea.card).
4. Create a Certificate for this Pass Type ID and download it (.cer). Double click to install in Keychain Access.
5. You also need the "Apple Worldwide Developer Relations Certification Authority" certificate (WWDR) in Keychain.

SIGNING with a Mac App (Easiest):
- Download a tool like "Pass Maker" or "Pugpig" or verify with "signpass" executable provided by Apple in their "Wallet Companion Files".
- Or use the command line (checking generate_pass.js for openssl hints).

If you have the `signpass` tool from Apple (usually checks `src/wallet`):
   ./signpass -p wallet

MANUAL ZIP:
1. Ensure `manifest.json` is up to date (run `node generate_pass.js`).
2. Generate `signature` file using OpenSSL (complex, see generate_pass.js output).
3. Zip the contents: `icon.png`, `icon@2x.png`, ... `pass.json`, `manifest.json`, `signature`.
4. Rename .zip to .pkpass.
5. Email to yourself or AirDrop to iPhone.
