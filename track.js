const puppeteer = require("puppeteer");
const { Telegraf, Context } = require("telegraf");

const bot = new Telegraf("5906119682:AAFitZoSk51MOv4iU2GXbLYSTvUaXccEcL4");
const id = "5760438151";

let i = 0;
let cambio = "";

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

  try{
    const page = await browser.newPage();
    await page.goto("https://chinapost-track.com/track-trace");
    await new Promise((r) => setTimeout(r, 5000));
  
    let input = await page.$x('//*[@id="track-form"]/input');
    await input[0].click();
    await page.keyboard.type("SP624201122AR");
    await page.keyboard.press("Enter");
  
  
    await new Promise((r) => setTimeout(r, 10000));

      
    let info = await page.$x('//*[@id="track_item_90_SP624201122AR_0"]/div[2]/div/text()');
    await new Promise((r) => setTimeout(r, 1000));
    let infoText = await page.evaluate((el) => el.textContent, info[0]);
    texto[0] = infoText.toUpperCase()
  
    await new Promise((r) => setTimeout(r, 800));
  
    let lugar = await page.$x('//*[@id="track_item_90_SP624201122AR_0"]/div[2]/div/span');
    await new Promise((r) => setTimeout(r, 1000));
    let lugarText = await page.evaluate((el) => el.textContent, lugar[0]);
    texto[1] = lugarText
  
    await new Promise((r) => setTimeout(r, 800));
  
    let fecha = await page.$x('//*[@id="track_item_90_SP624201122AR_0"]/div[2]/time/text()');
    await new Promise((r) => setTimeout(r, 1000));
    let fechaText = await page.evaluate((el) => el.textContent, fecha[0]);
    texto[2] = fechaText
    await new Promise((r) => setTimeout(r, 800));


    let msg = `📦 ❗ <b><u>Nuevo movimiento</u></b>\n\n<b>Auriculares:</b>\n<i>🏤${texto[0]}\n📍${texto[1]}\n📅${texto[2]}</i>`


    //cambioTrack(page, "CU773522090AR")
    console.log("Cambiando de tracking...")
    input = await page.$x('//*[@id="track-form"]/input');
    await input[0].click();
    for (let j = 0; j < 20;j++){
      await page.keyboard.press("Backspace");
    }
    await page.keyboard.type("CU773522090AR");
    await new Promise((r) => setTimeout(r, 700));
    await page.keyboard.press("Enter");
    await new Promise((r) => setTimeout(r, 7000));

    info = await page.$x('//*[@id="track_item_90_CU773522090AR_0"]/div[2]/div/text()');
    await new Promise((r) => setTimeout(r, 1000));
    infoText = await page.evaluate((el) => el.textContent, info[0]);
    texto[0] = infoText.toUpperCase()
  
    await new Promise((r) => setTimeout(r, 800));
  
    lugar = await page.$x('//*[@id="track_item_90_CU773522090AR_0"]/div[2]/div/span');
    await new Promise((r) => setTimeout(r, 1000));
    lugarText = await page.evaluate((el) => el.textContent, lugar[0]);
    texto[1] = lugarText
  
    await new Promise((r) => setTimeout(r, 800));
  
    fecha = await page.$x('//*[@id="track_item_90_CU773522090AR_0"]/div[2]/time/text()');
    await new Promise((r) => setTimeout(r, 1000));
    fechaText = await page.evaluate((el) => el.textContent, fecha[0]);
    texto[2] = fechaText
    await new Promise((r) => setTimeout(r, 800));



    msg = msg + `\n<b>Zapas Vans:</b>\n<i>🏤${texto[0]}\n📍${texto[1]}\n📅${texto[2]}</i>`

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


// //track();

// const interval = setInterval(() => {
//   //track();
//   trackeo()
// }, 1000 * 60 * 120);

const prueba = () =>{
  bot.telegram.sendMessage(id, 'Test', { parse_mode: "HTML" });
}

//prueba()