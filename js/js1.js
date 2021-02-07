// *************СОЗДАЕМ НОВОСТИ*************
const navNews = document.querySelector(".navNews");
navNews.textContent = "Новости";

let addNews = function (e) {
  const content = document.querySelector(".mainclass");
  content.innerHTML = "";
  content.classList.remove("players");
  content.classList.add("content");
  document.querySelector(".side_right").classList.remove("hidden");
  //создаю внутренности для новости

  var news = document.createElement("div");
  news.classList.add("news");
  var pNews = document.createElement("p");
  pNews.innerHTML = `С фотогалереей пока не срослось, но теперь состав команды формируется из актуального ростера на Альфа-лиге.`;
  var author = document.createElement("div");
  author.classList.add("author");
  author.innerHTML = "Condor<br> 09.09.2020";
  news.appendChild(pNews);
  news.appendChild(author);
  //добавляю внутренности в новость
  content.appendChild(news);

  var news = document.createElement("div");
  news.classList.add("news");

  var pNews = document.createElement("p");
  pNews.innerHTML = `Следующим этапом будет открытие фотогалереи и оптимизация кода. Ждем ваши отзывы и пожелания!`;
  var author = document.createElement("div");
  author.classList.add("author");
  author.innerHTML = "Condor<br> 07.04.2019";
  news.appendChild(pNews);
  news.appendChild(author);
  //добавляю внутренности в новость
  content.appendChild(news);

  var news = document.createElement("div");
  news.classList.add("news");
  var pNews = document.createElement("p");
  pNews.textContent =
    "Добро пожаловать на обновленный сайт команды Panic! Он почти адаптивный и в дальнейшем его ждет множество изменений, следите за новостями!";
  var author = document.createElement("div");
  author.classList.add("author");
  author.innerHTML = "Condor<br> 07.04.2019";
  news.appendChild(pNews);
  news.appendChild(author);
  //добавляю внутренности в новость
  content.appendChild(news);

  //убираю событие клика по строке "Новости"
  navNews.removeEventListener("click", addNews);
  navPlayers.addEventListener("click", addPlayers);
};
//Добавляю события клика по строке "Новости"
navNews.addEventListener("click", addNews);
//
//
// *************СОЗДАЕМ СОСТАВ КОМАНДЫ*************
const navPlayers = document.querySelector(".navPlayers");
navPlayers.textContent = "Состав команды";

let addPlayers = function (e) {
  document.querySelector(".side_right").classList.add("hidden");
  const content = document.querySelector(".mainclass");
  content.innerHTML = "";
  //создаю внутренности для Состава команды
  function getPlayers(cb) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://alpha.tl/api?clan=1");
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      const responseGood = response.players;
      const rerere = responseGood.bnetaccount;
      cb(responseGood);
    });

    xhr.send();
  }

  content.classList.add("players");
  content.classList.remove("content");
  getPlayers((responseGood) => {
    const fragment = document.createDocumentFragment();
    responseGood.forEach((post) => {
      const Player = document.createElement("div");
      Player.classList.add("player", post.race);

      const PlayerName = document.createElement("div");
      PlayerName.innerHTML = `<a href="${post.bnetaccount}" target='_blank'>${post.nickname}</a>`;
      const Playerdesc = document.createElement("p");
      Playerdesc.textContent = post.league;
      Player.appendChild(PlayerName);
      Player.appendChild(Playerdesc);
      content.appendChild(Player);
    });
  });
  //убираю событие клика по строке "Состав команды"
  navPlayers.removeEventListener("click", addPlayers);
  navNews.addEventListener("click", addNews);
};
navPlayers.addEventListener("click", addPlayers);
//
//Грузим дефолт
addNews();
