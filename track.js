const puppeteer = require("puppeteer");
const { Telegraf, Context } = require("telegraf");

const bot = new Telegraf("5906119682:AAFitZoSk51MOv4iU2GXbLYSTvUaXccEcL4");
const id = "5760438151";

let i = 1;
let cambio = "";
async function track() {
  //let numeroTrack = 'RG010827286CN'

  console.log(i);
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

  const estados = [];
  estados[0] = [];
  estados[1] = [];
  estados[2] = [];

  const lugares = [];
  lugares[0] = [];
  lugares[1] = [];
  lugares[2] = [];

  // try{
  //   console.log('TRY...')
  //   let select = await page.$x('/html/body/div/main/div[1]/div/div[2]/div[2]/div[1]/div/div[2]/label/select')
  //   await select[0].click()
  // }
  // catch{
  //   console.log('CATCH....')
  //   //let flecha = await page.$x(`/html/body/div/main/div[1]/div/div[2]/div/div[1]/div/div/a`)
  //   let flecha = await page.$x('/html/body/div/main/div[1]/div/div[2]/div/div[1]/a')
  //   await flecha[0].click()
  //   await new Promise(r => setTimeout(r, 3000));

  //   let select = await page.$x('/html/body/div/main/div[1]/div/div[2]/div[2]/div[1]/div/div[2]/label/select')
  //   await select[0].click()

  // }

  try {
    console.log("---------------Track nº1 ");
    await page.goto("https://postal.ninja/es");
    await new Promise((r) => setTimeout(r, 3000));

    let input = await page.$x(
      "/html/body/div/main/div[1]/div/form/label/input"
    );
    await input[0].click();
    await page.keyboard.type("RD878405359AR");
    await page.keyboard.press("Enter");
    await new Promise((r) => setTimeout(r, 8000));
    let select = await page.$x(
      "/html/body/div/main/div[1]/div/div[2]/div[2]/div[1]/div/div[2]/label/select"
    );
    await select[0].click();
    await new Promise((r) => setTimeout(r, 700));
    await page.keyboard.press("ArrowUp");
    await new Promise((r) => setTimeout(r, 700));
    await page.keyboard.press("ArrowUp");
    await new Promise((r) => setTimeout(r, 700));
    await page.keyboard.press("ArrowUp");
    await new Promise((r) => setTimeout(r, 700));
    await page.keyboard.press("ArrowUp");
    await new Promise((r) => setTimeout(r, 700));
    await page.keyboard.press("ArrowUp");
    await new Promise((r) => setTimeout(r, 700));
    await page.keyboard.press("Enter");
    await new Promise((r) => setTimeout(r, 7000));

    let e = 1;
    while (e < 20) {
      try {
        let estado1 = await page.$x(
          `/html/body/div/main/div[1]/div/div[2]/div[2]/div[2]/div[${e}]/div[2]/div[2]`
        );
        let estadoText1 = await page.evaluate(
          (el) => el.textContent,
          estado1[0]
        );
        estados[0].push(estadoText1);
        let lugar1 = await page.$x(
          `/html/body/div/main/div[1]/div/div[2]/div[2]/div[2]/div[${e}]/div[2]/div[3]`
        );
        let lugarText1 = await page.evaluate((el) => el.textContent, lugar1[0]);
        lugares[0].push(lugarText1);
        e++;
      } catch {
        e = 21;
      }
    }

    let ultimoMov1 = estados[0][estados[0].length - 1];
    let ultimoLugar1 = lugares[0][lugares[0].length - 1];

    console.log("Correcto");
    await new Promise((r) => setTimeout(r, 1000));

    console.log("---------------Track nº2 ");
    await page.goto("https://postal.ninja/es");
    await new Promise((r) => setTimeout(r, 3000));

    //let input = await page.$x('/html/body/div/main/div[1]/div/form/label/input')
    // await input[0].click()
    await page.keyboard.type("RD876841696AR");
    await page.keyboard.press("Enter");
    await new Promise((r) => setTimeout(r, 5000));

    e = 1;
    await new Promise((r) => setTimeout(r, 2000));
    while (e < 20) {
      try {
        let estado1 = await page.$x(
          `/html/body/div/main/div[1]/div/div[2]/div[2]/div[2]/div[${e}]/div[2]/div[2]`
        );
        let estadoText1 = await page.evaluate(
          (el) => el.textContent,
          estado1[0]
        );
        estados[1].push(estadoText1);
        let lugar1 = await page.$x(
          `/html/body/div/main/div[1]/div/div[2]/div[2]/div[2]/div[${e}]/div[2]/div[3]`
        );
        let lugarText1 = await page.evaluate((el) => el.textContent, lugar1[0]);
        lugares[1].push(lugarText1);
        e++;
      } catch {
        e = 21;
      }
    }

    let ultimoMov2 = estados[1][estados[1].length - 1];
    let ultimoLugar2 = lugares[1][lugares[1].length - 1];
    console.log("Correcto");

    console.log("---------------Track nº3 ");
    await page.goto("https://postal.ninja/es");
    await new Promise((r) => setTimeout(r, 3000));

    //let input = await page.$x('/html/body/div/main/div[1]/div/form/label/input')
    //await input[0].click()
    await page.keyboard.type("RD876810654AR");
    await page.keyboard.press("Enter");
    await new Promise((r) => setTimeout(r, 5000));

    e = 1;
    await new Promise((r) => setTimeout(r, 2000));
    while (e < 20) {
      try {
        let estado1 = await page.$x(
          `/html/body/div/main/div[1]/div/div[2]/div[2]/div[2]/div[${e}]/div[2]/div[2]`
        );
        let estadoText1 = await page.evaluate(
          (el) => el.textContent,
          estado1[0]
        );
        estados[2].push(estadoText1);
        let lugar1 = await page.$x(
          `/html/body/div/main/div[1]/div/div[2]/div[2]/div[2]/div[${e}]/div[2]/div[3]`
        );
        let lugarText1 = await page.evaluate((el) => el.textContent, lugar1[0]);
        lugares[2].push(lugarText1);
        e++;
      } catch {
        e = 21;
      }
    }

    let ultimoMov3 = estados[2][estados[2].length - 1];
    let ultimoLugar3 = lugares[2][lugares[2].length - 1];

    let mensaje = `<b>📫❗ <u>Seguimiento Nacional</u></b>\n\n<b>Memoria RAM: </b>\n🏤<i>${ultimoMov1}\n📍${ultimoLugar1}</i>\n<b>Luz Led RGB: </b>\n🏤<i>${ultimoMov2}\n📍${ultimoLugar2}</i>\n<b>SmartWatch: </b>\n🏤<i>${ultimoMov3}\n📍${ultimoLugar3}</i>`;

    console.log("Correcto y cerrando página. Nuevo trackeo en 2hs");

    if (mensaje === cambio) {
      console.log("No hay cambios");
      //console.log(mensaje + ' y ' + cambio)
    } else {
      if (ultimoMov1 != 'EN Customs Process' || !ultimoMov1.includes('Customs')){
        console.log("Hubo un cambio en los avisos");
        bot.telegram.sendMessage(id, mensaje, { parse_mode: "HTML" });
        cambio = mensaje;
      }
      else{
        console.log('Tradució cualquier cosa, no se enviará un mensaje')
      }
      
    }

    //bot.telegram.sendMessage(id,mensaje,{parse_mode: 'HTML'})
    //Hello
    //console.log(ultimoLugar1, ultimoMov1,'\n',ultimoLugar2, ultimoMov2,'\n',ultimoLugar3, ultimoMov3)

    await new Promise((r) => setTimeout(r, 1000));
    await browser.close();
  } catch {
    await new Promise((r) => setTimeout(r, 2000));
    console.error(
      "Hubo un error, intentando de nuevo en las próximas horas..."
    );
    await browser.close();
  }

  i++;
}

track();

const interval = setInterval(() => {
  track();
}, 1000 * 60 * 120);
