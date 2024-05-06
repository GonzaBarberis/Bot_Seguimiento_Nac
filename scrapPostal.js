const { Telegraf, Context } = require("telegraf");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const puppeteer = require("puppeteer-core");
// const fetch = require("node-fetch");

const bot = new Telegraf(process.env.BOT_TOKEN);
const id = process.env.CHAT_ID;

const statusFilePath = path.join(__dirname, "JSON/status.json");

// let cambio = "";
// let msg = "";

async function trackeo() {
  // const browser = await puppeteer.launch({
  //   ignoreHTTPSErrors: true,
  //   headless: "new",
  //   args: [`--window-size=1200,800`, "--no-sandbox", "--disable-setuid-sandbox", "--incognito"],
  //   defaultViewport: {
  //     width: 1200,
  //     height: 800,
  //   },
  // });
  const isProduction = process.env.NODE_ENV === "production";

  // if (isProduction) {
  //   console.log("Es producción");
  //   browser = await puppeteer.launch({
  //     executablePath: "/usr/bin/google-chrome", // Ruta para Ubuntu runner en GitHub Actions
  //     args: ["--no-sandbox", "--disable-setuid-sandbox"],
  //     headless: false,
  //   });
  // } else {
  //   browser = await puppeteer.launch({
  //     executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // Ruta local de chrome.exe en Windows
  //     args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1980,720"],
  //     headless: false,
  //     defaultViewport: {
  //       width: 1980,
  //       height: 720,
  //     },
  //   });
  // }

  if (isProduction) {
    console.log("es produccion");
    browser = await puppeteer.launch({
      executablePath: "/usr/bin/google-chrome", // Ruta para Ubuntu runner en GitHub Actions
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: false,
    });
  } else {
    browser = await puppeteer.launch({
      executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // Ruta local de chrome.exe en Windows
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: false,
    });
  }

  try {
    const page = await browser.newPage();
    await page.goto("https://postal.ninja/es/track#/6WPA3q", { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 10000));

    try {
      const selector = "body > div.pnj-container > main > section > div.track.data > div.table > div.events > div";

      // Recupera todos los elementos que coincidan con el selector
      const elements = await page.$$(selector);

      // Verifica que haya suficientes elementos para obtener el antepenúltimo
      //if (elements.length >= 2) {
      const anteultimoElemento = elements[elements.length - 2];

      const detalles = await page.evaluate((el) => {
        const dt = el.querySelector("div.dt") ? el.querySelector("div.dt").textContent.trim() : "No hay información registrada";
        const dsc = el.querySelector("div.info > div.dsc")
          ? el.querySelector("div.info > div.dsc").textContent.trim()
          : "No hay información registrada";
        const loc = el.querySelector("div.info > div.loc")
          ? el.querySelector("div.info > div.loc").textContent.trim()
          : "No hay información registrada";
        return { dt, dsc, loc };
      }, anteultimoElemento);

      //console.log("Info NUEVA: ", detalles);

      let infoCargada = await JSON.parse(fs.readFileSync(statusFilePath, "utf-8"));

      //console.log("Info VIEJA: ", infoCargada);

      if (JSON.stringify(detalles) !== JSON.stringify(infoCargada)) {
        console.log("# La información se actualizó");

        let msg = `📦 ❗ <b><u>Nuevo movimiento</u></b>\n\n<b>Camiseta Boca 🔵🟡:</b>\n<i>🏤 ${detalles.dsc}\n📍 ${detalles.loc}\n📅 ${detalles.dt}</i>`;

        bot.telegram.sendMessage(id, msg, { parse_mode: "HTML" });
      } else {
        console.log("# No hay cambios en la información");
        fs.writeFileSync(statusFilePath, JSON.stringify(detalles, null, 2));
      }
      //} else {
      // console.log("# ! Error: No hay suficientes elementos para seleccionar el elemento.");
      //}
    } catch (error) {
      console.error("# ! Error: No se pudo conseguir los elementos:", error);
      await browser.close();
      return;
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

console.log("# Iniciando...");

trackeo();

async function pruebaJSON() {
  const infoFilePath = path.join(__dirname, "JSON/status.json");
  let aver = JSON.parse(fs.readFileSync(infoFilePath, "utf-8"));
  // let detalles = {
  //   dt: "30 abr 2024, 12:27",
  //   dsc: "Sostenido por la aduana",
  //   loc: "Bue Avion",
  // };

  let infoCargada = await JSON.parse(fs.readFileSync(infoFilePath, "utf-8"));

  // let infoCargada = await getInfo();
  console.log(infoCargada);
}

//pruebaJSON();

async function getInfo() {
  try {
    const data = await fs.promises.readFile("JSON/status.json", { encoding: "utf8" });
    return JSON.parse(data);
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
}

const pruebaMsj = () => {
  msg = `📦 ❗ <b><u>Nuevo movimiento</u></b>\n\n<b>Camiseta Boca 🔵🟡:</b>\n<i>🏤 CORREO\n📍 SEOUL\n📅 17/04/2024</i>`;

  bot.telegram.sendMessage(id, msg, { parse_mode: "HTML" });
};

//pruebaMsj();
