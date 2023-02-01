const puppeteer = require("puppeteer");
const { Telegraf, Context } = require("telegraf");

const bot = new Telegraf("5906119682:AAFitZoSk51MOv4iU2GXbLYSTvUaXccEcL4");
const id = "5760438151";

let i = 0;
let cambio = "";

const texto = []


async function trackeo(){

  console.log(i)

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

  try{
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
    texto[0] = infoText.toUpperCase()
  
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
  
    
  
  
    await new Promise((r) => setTimeout(r, 3000));
    cambioTrack(page, 'SP624028870AR')

    await new Promise((r) => setTimeout(r, 6000));

    info = await page.$x('//*[@id="track_item_90_SP624028870AR_0"]/div[2]/div/text()');
    await new Promise((r) => setTimeout(r, 1000));
    infoText = await page.evaluate((el) => el.textContent, info[0]);
    texto[3] = infoText.toUpperCase()
  
    await new Promise((r) => setTimeout(r, 800));
  
    lugar = await page.$x('//*[@id="track_item_90_SP624028870AR_0"]/div[2]/div/span');
    await new Promise((r) => setTimeout(r, 1000));
    lugarText = await page.evaluate((el) => el.textContent, lugar[0]);
    texto[4] = lugarText
  
    await new Promise((r) => setTimeout(r, 800));
  
    fecha = await page.$x('//*[@id="track_item_90_SP624028870AR_0"]/div[2]/time/text()');
    await new Promise((r) => setTimeout(r, 1000));
    fechaText = await page.evaluate((el) => el.textContent, fecha[0]);
    texto[5] = fechaText
    await new Promise((r) => setTimeout(r, 800));

    await new Promise((r) => setTimeout(r, 3000));
    cambioTrack(page, 'SP623979539AR')

    await new Promise((r) => setTimeout(r, 6000));

    info = await page.$x('//*[@id="track_item_90_SP623979539AR_0"]/div[2]/div/text()');
    await new Promise((r) => setTimeout(r, 1000));
    infoText = await page.evaluate((el) => el.textContent, info[0]);
    texto[6] = infoText.toUpperCase()
  
    await new Promise((r) => setTimeout(r, 800));
  
    lugar = await page.$x('//*[@id="track_item_90_SP623979539AR_0"]/div[2]/div/span');
    await new Promise((r) => setTimeout(r, 1000));
    lugarText = await page.evaluate((el) => el.textContent, lugar[0]);
    texto[7] = lugarText
  
    await new Promise((r) => setTimeout(r, 800));
  
    fecha = await page.$x('//*[@id="track_item_90_SP623979539AR_0"]/div[2]/time/text()');
    await new Promise((r) => setTimeout(r, 1000));
    fechaText = await page.evaluate((el) => el.textContent, fecha[0]);
    texto[8] = fechaText
    await new Promise((r) => setTimeout(r, 800));

    await new Promise((r) => setTimeout(r, 3000));
    cambioTrack(page, 'UY274479332CZ')

    await new Promise((r) => setTimeout(r, 6000));

    info = await page.$x('//*[@id="track_item_148_UY274479332CZ_0"]/div[2]/div/text()');
    await new Promise((r) => setTimeout(r, 1000));
    infoText = await page.evaluate((el) => el.textContent, info[0]);
    texto[9] = infoText.toUpperCase()
  
    await new Promise((r) => setTimeout(r, 800));
  
    lugar = await page.$x('//*[@id="track_item_148_UY274479332CZ_0"]/div[2]/div/span');
    await new Promise((r) => setTimeout(r, 1000));
    lugarText = await page.evaluate((el) => el.textContent, lugar[0]);
    texto[10] = lugarText
  
    await new Promise((r) => setTimeout(r, 800));
  
    fecha = await page.$x('//*[@id="track_item_148_UY274479332CZ_0"]/div[2]/time/text()');
    await new Promise((r) => setTimeout(r, 1000));
    fechaText = await page.evaluate((el) => el.textContent, fecha[0]);
    texto[11] = fechaText
    await new Promise((r) => setTimeout(r, 800));
  

   

    let msg = `📦 ❗ <b><u>Nuevo movimiento</u></b>\n\n<b>✅Camiseta ARG:</b>\n<i> 🏤${texto[0]}\n 📍${texto[1]}\n 📅${texto[2]}</i>\n<b>✅Switches:</b>\n<i> 🏤${texto[3]}\n 📍${texto[4]}\n 📅${texto[5]}</i>\n<b>✅Keycaps:</b>\n<i> 🏤${texto[6]}\n 📍${texto[7]}\n 📅${texto[8]}</i>\n<b>✅Funda:</b>\n<i> 🏤${texto[9]}\n 📍${texto[10]}\n 📅${texto[11]}</i>`








    if (msg === cambio) {
      console.log("No hay cambios");
    } else {
      console.log("Hubo un cambio en los avisos");
      bot.telegram.sendMessage(id, msg, { parse_mode: "HTML" });
      cambio = msg;
      
    }


  
    await browser.close();
  }
  catch{
    await new Promise((r) => setTimeout(r, 2000));
    console.error(
      "Hubo un error, intentando de nuevo dentro de 1hs 30min."
    );
    await browser.close();
  }
  
  i++
}


async function cambioTrack(page, number){
  let input = await page.$x('//*[@id="track-form"]/input');
  await input[0].click();
  for (let j = 0; j < 20;j++){
    await page.keyboard.press("Backspace");
  }
  await page.keyboard.type(number);
  await new Promise((r) => setTimeout(r, 700));
  await page.keyboard.press("Enter");
  await new Promise((r) => setTimeout(r, 7000));
}


trackeo()


//track();

const interval = setInterval(() => {
  //track();
  trackeo()
}, 1000 * 60 * 120);