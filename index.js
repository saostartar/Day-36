const puppeteer = require("puppeteer");

const EMAIL = "christiankandori@gmail.com";
const PASSWORD = "Qtpepas020302.";

(async () => {
  try {
    // 1. launch the browser
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      defaultViewport: null
    });

    // 2. Open a new page
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    // 3. Go to the login page
    await page.goto('https://discord.com/login'), { waitUntil: 'networkidle2' };

    // 4. Fill the login form
    await page.type('input[name="email"]', EMAIL, { delay: 100 });
    await page.type('input[name="password"]', PASSWORD, { delay: 100 });
    
    // 5. Click the login button
    await page.click('button[type="submit"]');

    // 6. Wait for the login process to complete
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    console.log('Berhasil login ke Discord!');

     // 7. Menunggu 10 detik agar halaman sepenuhnya siap
     await new Promise(resolve => setTimeout(resolve, 10000)); // Tunggu 10 detik

    // 8. Take a screenshot
    await page.screenshot({ path: 'discord-home.png', fullPage: true });

    console.log('Screenshot berhasil diambil dan disimpan sebagai discord-home.png!');

    // 9. Menunggu 3 detik sebelum menutup browser 
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 10.. Close the browser
    await browser.close();
  } catch (error) {
    console.error('Ups, terjadi kesalahan:', error);
  }
})();
