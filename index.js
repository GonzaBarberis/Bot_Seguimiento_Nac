const { Telegraf, Context } = require("telegraf");
const fs = require("fs");
require("dotenv").config();
const puppeteer = require("puppeteer");
const { type } = require("os");

const bot = new Telegraf(process.env.BOT_TOKEN);
const id = process.env.CHAT_ID;

let cambio = "";
let msg = "";

async function trackeo() {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: false,
    args: [`--window-size=1200,800`, "--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: {
      width: 1200,
      height: 800,
    },
  });

  try {
    const page = await browser.newPage();
    await page.goto("https://postal.ninja/es/track#/6WPA3q");
    await new Promise((r) => setTimeout(r, 2000));

    //let input = await page.$x('//*[@id="track-form"]/input');

    // await page.click("#track-form > input");

    // console.log("Iniciando clicks...");

    // //await input[0].click();
    // await page.keyboard.type("RG023708764CN"); // RD887141536AR
    // await new Promise((r) => setTimeout(r, 1800));
    // await page.keyboard.press("Enter");

    // -- Doble ingreso de track por si hay error --
    // await new Promise((r) => setTimeout(r, 3000));
    // let input2 = await page.$x('//*[@id="track-form"]/input');
    // await input2[0].click();
    // await page.keyboard.type("RG023708764CN");
    // await new Promise((r) => setTimeout(r, 1800));
    // await page.keyboard.press("Enter");

    await new Promise((r) => setTimeout(r, 25000));

    try {
      const infoText = await page.$eval("#track_item_6_RG023708764CN_0 > div.tracking-data > div", (element) =>
        element.textContent.trim().toUpperCase()
      );

      let lugarText;
      try {
        lugarText = await page.$eval("#track_item_6_RG023708764CN_0 > div.tracking-data > div > span", (element) =>
          element.textContent.trim().toUpperCase()
        );
      } catch {
        lugarText = "No hay ubicacion registrada";
      }

      const elementoFecha = await page.$x('//*[@id="track_item_6_RG023708764CN_0"]/div[2]/time/text()');
      const fechaText = await page.evaluate((el) => el.textContent, elementoFecha[0]);

      if (infoText && lugarText && fechaText) {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        msg = `📦 ❗ <b><u>Nuevo movimiento</u></b>\n\n<b>Camiseta Boca 🔵🟡:</b>\n<i>🏤 ${infoText}\n📍 ${lugarText}\n📅 ${fechaText}</i>`;
      } else {
        console.error("No se encontraron todos los elementos que coinciden con las expresiones XPath.");
      }
    } catch (error) {
      console.error("Hubo un error al conseguir los elementos:", error);
      await browser.close();
      return;
    }

    if (msg === cambio) {
      console.log("No hay cambios");
    } else {
      console.log("Hay un cambio en los avisos");
      bot.telegram.sendMessage(id, msg, { parse_mode: "HTML" });
      cambio = msg;
    }

    await browser.close();
    return;
  } catch (error) {
    await new Promise((r) => setTimeout(r, 2000));
    console.error("Hubo un error inesperado, se volverá a intentar mas tarde", error);
    await browser.close();
    return;
  }
}

console.log("Iniciando...");

trackeo();

// const interval = setInterval(() => {
//   trackeo();
// }, 1000 * 60 * 120);

const pruebaMsj = () => {
  msg = `📦 ❗ <b><u>Nuevo movimiento</u></b>\n\n<b>Camiseta Boca 🔵🟡:</b>\n<i>🏤 CORREO\n📍 SEOUL\n📅 17/04/2024</i>`;

  bot.telegram.sendMessage(id, msg, { parse_mode: "HTML" });
};

//pruebaMsj();
