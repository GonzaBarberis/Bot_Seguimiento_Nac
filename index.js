const puppeteer = require("puppeteer");
const { Telegraf, Context } = require("telegraf");
const fs = require('fs');
const express = require('express');
require('dotenv').config();

// const bot = new Telegraf("5906119682:AAFitZoSk51MOv4iU2GXbLYSTvUaXccEcL4");
// const id = "5760438151";


const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);
const id = process.env.CHAT_ID

let i = 0;
let cambio = "";
let msg = "";


app.get('/', async (req, res) => {


  res.send('<h1 style="color:blue; text-align:center; font-family:\'Verdana\'">Iniciando Bot...</h1>');


  trackeo().catch(error => {
    console.error('Error al iniciar el bot:', error);
  });


});


app.get('/test', async (req, res) => {
  
  res.send('<h1 style="color:blue; text-align:center; font-family:\'Verdana\'">Iniciando Bot...</h1>');

});





async function trackeo(){

  

  function guardarCookies(cookies) {
    fs.writeFileSync('cookies.json', JSON.stringify(cookies));
  }

  function cargarCookies() {
    return JSON.parse(fs.readFileSync('cookies.json'));
  }


  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: false,
    args: [
      `--window-size=1200,800`,
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ],
    defaultViewport: {
      width: 1200,
      height: 800,
    },
  });


  try{
    const page = await browser.newPage();
    await page.goto("https://chinapost-track.com/track-trace");
    
    //await new Promise((r) => setTimeout(r, 4000));

    const cookies = await page.cookies();
    guardarCookies(cookies);
    const cookiesGuardadas = cargarCookies();
    await page.setCookie(...cookiesGuardadas);

    let input = await page.$x('//*[@id="track-form"]/input'); 

    console.log("Iniciando clicks...")


    await input[0].click();
    await page.keyboard.type("RP108478134MU");
    await new Promise((r) => setTimeout(r, 1800)); 
    await page.keyboard.press("Enter");   

    await new Promise((r) => setTimeout(r, 3000));

    let input2 = await page.$x('//*[@id="track-form"]/input'); 
    await input2[0].click();
    await page.keyboard.type("RP108478134MU");
    await new Promise((r) => setTimeout(r, 1800)); 
    await page.keyboard.press("Enter");   

    await new Promise((r) => setTimeout(r, 15000));

    try {
    
      const infoElements = await page.$x('//*[@id="track_item_78_RP108478134MU_0"]/div[2]/div/text()');
      const lugarElements = await page.$x('//*[@id="track_item_78_RP108478134MU_0"]/div[2]/div/span');
      const fechaElements = await page.$x('//*[@id="track_item_78_RP108478134MU_0"]/div[2]/time/text()');
    
      if (infoElements.length > 0 && lugarElements.length > 0 && fechaElements.length > 0) {

        await new Promise((r) => setTimeout(r, 1000));
    
        const infoText = await page.evaluate((el) => el.textContent, infoElements[0]);
        const lugarText = await page.evaluate((el) => el.textContent, lugarElements[0]);
        const fechaText = await page.evaluate((el) => el.textContent, fechaElements[0]);
    
        const textoInfo = infoText.toUpperCase();
        const textoLugar = lugarText.toUpperCase();
        const textoFecha = fechaText.toUpperCase();

        msg = `📦 ❗ <b><u>Nuevo movimiento</u></b>\n\n<b>Camiseta Boca 🔵🟡:</b>\n<i>🏤 ${textoInfo}\n📍 ${textoLugar}\n📅 ${textoFecha}</i>`
      } else {
        console.error('No se encontraron todos los elementos que coinciden con las expresiones XPath.');
      }
    } catch (error) {
      console.error('Hubo un error:', error);
    }
    
    if (msg === cambio) {
      console.log("No hay cambios");
    } else {
      console.log("Hubo un cambio en los avisos");
      bot.telegram.sendMessage(id, msg, { parse_mode: "HTML" });
      //console.log(msg)
      cambio = msg;
    }

    await browser.close();
  }
  catch (error){
    await new Promise((r) => setTimeout(r, 2000));
    console.error(
      "Hubo un error, intentando de nuevo dentro de 1hs 30min.", error
    );
    await browser.close();
  }
  
 
}


console.log("Iniciando...")

//trackeo()

// const interval = setInterval(() => {
//   trackeo()
// }, 1000 * 60 * 120);


const port = process.env.PORT || 3600;
  app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});



const pruebaMsj = () =>{
  bot.telegram.sendMessage(id, 'Test', { parse_mode: "HTML" });
}

//pruebaMsj()



    