const puppeteer = require('puppeteer');

// Define our constant variables here.
const criterionChannelBaseUrl = new URL('https://films.criterionchannel.com/');

// Default initialization.
criterionChannelBaseUrl.searchParams.append('geo_availability', 'CA');

const run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(criterionChannelBaseUrl.toString(), {
    waitUntil: 'networkidle2',
  });

  let data = await page.evaluate(getFilms);
  browser.close();
};

const getFilms = () => {
  const totalCount = document.querySelector(
    'span.criterion-channel__filters-results > b',
  ).innerText;

  const films = Array.from(
    document.querySelectorAll('.criterion-channel__tr'),
  ).map((rawFilmData, index) => {
    const queryStringPrefix = '.criterion-channel__td--';
    return {
      id: index,
      url: rawFilmData.dataset.href,
      imageSrc: rawFilmData.querySelector(`${queryStringPrefix}img img`).src,
      title: rawFilmData.querySelector(`${queryStringPrefix}title > a`)
        .innerText,
      director: rawFilmData.querySelector(`${queryStringPrefix}director`)
        .innerText,
      country: rawFilmData.querySelector(`${queryStringPrefix}country > span`)
        .innerText,
      year: rawFilmData.querySelector(`${queryStringPrefix}year`).innerText,
    };
  });

  return {
    totalCount,
    films,
  };
};

run();
