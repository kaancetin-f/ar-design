const fs = require("fs-extra");
const path = require("path");

const srcDir = path.join(__dirname, "../../../src");
const destDir = path.join(__dirname, "../../../dist/libs/styles");

// CSS dosyalarını bulma ve kopyalama
async function copyCssFiles(src, dest) {
  try {
    // Kaynak dizindeki dosya ve klasörleri listele
    const items = await fs.readdir(src, { withFileTypes: true });

    // Sadece dosya olan öğeleri filtrele ve CSS dosyalarını bul
    const cssFiles = items
      .filter((item) => item.isFile() && path.extname(item.name) === ".css")
      .map((item) => item.name);

    // CSS dosyalarını kopyala
    for (const file of cssFiles) {
      const srcFile = path.join(src, file);
      const destFile = path.join(dest, file);
      await fs.copyFile(srcFile, destFile);
      console.log(`Kopyalandı: ${file}`);
    }
  } catch (err) {
    console.error("Hata:", err);
  }
}

// Hedef dizini oluştur (varsa üzerine yazmaz)
fs.ensureDir(destDir)
  .then(() => copyCssFiles(srcDir, destDir))
  .catch((err) => console.error("Hata:", err));
