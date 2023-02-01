const puppeteer = require('puppeteer')

const texto = []


async function trackeo(){
    const browser = await puppeteer.launch({
        headless: true,
        ignoreHTTPSErrors: true,
        args: [
          `--window-size=1920,1080`,
          "--no-sandbox",
          "--disable-setuid-sandbox",
        ],
        defaultViewport: {
          width: 1920,
          height: 1080,
        },
    });
    
    const page = await browser.newPage();
    await page.goto("https://chinapost-track.com/track-trace");
    await new Promise((r) => setTimeout(r, 5000));

    let input = await page.$x('//*[@id="track-form"]/input');
    await input[0].click();
    await page.keyboard.type("RG010827286CN");
    await page.keyboard.press("Enter");


    await new Promise((r) => setTimeout(r, 10000));

    let info = await page.$x('//*[@id="track_item_6_RG010827286CN_0"]/div[2]/div/text()');
    await new Promise((r) => setTimeout(r, 1000));
    let infoText = await page.evaluate((el) => el.textContent, info[0]);
    texto[0] = infoText

    await new Promise((r) => setTimeout(r, 800));

    let lugar = await page.$x('//*[@id="track_item_6_RG010827286CN_0"]/div[2]/div/span');
    await new Promise((r) => setTimeout(r, 1000));
    let lugarText = await page.evaluate((el) => el.textContent, lugar[0]);
    texto[1] = lugarText

    await new Promise((r) => setTimeout(r, 800));

    let fecha = await page.$x('//*[@id="track_item_6_RG010827286CN_0"]/div[2]/time/text()');
    await new Promise((r) => setTimeout(r, 1000));
    let fechaText = await page.evaluate((el) => el.textContent, fecha[0]);
    texto[2] = fechaText
    await new Promise((r) => setTimeout(r, 800));

    let hora = await page.$x('//*[@id="track_item_6_RG010827286CN_0"]/div[2]/time/span');
    await new Promise((r) => setTimeout(r, 1000));
    let horaText = await page.evaluate((el) => el.textContent, hora[0]);
    texto[3] = horaText
    await new Promise((r) => setTimeout(r, 800));


    console.log(`Fecha: ${texto[2]},\n Hora: ${texto[3]}\n, el estado es ${texto[0]},\nestá en: ${texto[1]}`)

    //terminar mensaje de telegram


    await new Promise((r) => setTimeout(r, 6000));


    await browser.close();
}

trackeo()