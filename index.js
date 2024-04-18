const { Telegraf, Context } = require("telegraf");
const fs = require("fs");
require("dotenv").config();
const puppeteer = require("puppeteer");

const bot = new Telegraf(process.env.BOT_TOKEN);
const id = process.env.CHAT_ID;

let i = 0;
let cambio = "";
let msg = "";

async function trackeo() {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: "new",
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

  try {
    const page = await browser.newPage();
    await page.goto("https://chinapost-track.com/track-trace");

    await new Promise((r) => setTimeout(r, 2000));

    let input = await page.$x('//*[@id="track-form"]/input');

    console.log("Iniciando clicks...");

    await input[0].click();
    await page.keyboard.type("RG023708764CN");
    await new Promise((r) => setTimeout(r, 1800));
    await page.keyboard.press("Enter");

    // -- Doble ingreso de track por si hay error --
    // await new Promise((r) => setTimeout(r, 3000));
    // let input2 = await page.$x('//*[@id="track-form"]/input');
    // await input2[0].click();
    // await page.keyboard.type("RG023708764CN");
    // await new Promise((r) => setTimeout(r, 1800));
    // await page.keyboard.press("Enter");

    await new Promise((r) => setTimeout(r, 15000));

    try {
      const infoElements = await page.$x(
        '//*[@id="track_item_6_RG023708764CN_0"]/div[2]/div/text() '
      );
      const lugarElements = await page.$x(
        '//*[@id="track_item_6_RG023708764CN_0"]/div[2]/div/span'
      );
      const fechaElements = await page.$x(
        '//*[@id="track_item_6_RG023708764CN_0"]/div[2]/time/text()'
      );

      if (
        infoElements.length > 0 &&
        lugarElements.length > 0 &&
        fechaElements.length > 0
      ) {
        await new Promise((r) => setTimeout(r, 1000));

        const infoText = await page.evaluate(
          (el) => el.textContent,
          infoElements[0]
        );
        const lugarText = await page.evaluate(
          (el) => el.textContent,
          lugarElements[0]
        );
        const fechaText = await page.evaluate(
          (el) => el.textContent,
          fechaElements[0]
        );

        const textoInfo = infoText.toUpperCase();
        const textoLugar = lugarText.toUpperCase();
        const textoFecha = fechaText.toUpperCase();

        msg = `📦 ❗ <b><u>Nuevo movimiento</u></b>\n\n<b>Camiseta Boca 🔵🟡:</b>\n<i>🏤 ${textoInfo}\n📍 ${textoLugar}\n📅 ${textoFecha}</i>`;
      } else {
        console.error(
          "No se encontraron todos los elementos que coinciden con las expresiones XPath."
        );
      }
    } catch (error) {
      console.error("Hubo un error:", error);
    }

    if (msg === cambio) {
      console.log("No hay cambios");
    } else {
      console.log("Hay un cambio en los avisos");
      bot.telegram.sendMessage(id, msg, { parse_mode: "HTML" });
      cambio = msg;
    }

    await browser.close();
  } catch (error) {
    await new Promise((r) => setTimeout(r, 2000));
    console.error(
      "Hubo un error, intentando de nuevo dentro de 1hs 30min.",
      error
    );
    await browser.close();
  }
}

console.log("Iniciando...");

trackeo();

const interval = setInterval(() => {
  trackeo();
}, 1000 * 60 * 120);

const pruebaMsj = () => {
  msg = `📦 ❗ <b><u>Nuevo movimiento</u></b>\n\n<b>Camiseta Boca 🔵🟡:</b>\n<i>🏤 CORREO\n📍 SEOUL\n📅 17/04/2024</i>`;

  bot.telegram.sendMessage(id, msg, { parse_mode: "HTML" });
};

//pruebaMsj();
