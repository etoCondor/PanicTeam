// *************СОЗДАЕМ НОВОСТИ*************
const navNews = document.querySelector(".navNews");
navNews.textContent = "Новости";
const allNewsPosts = [
  {
    paragraph:
      "С фотогалереей пока не срослось, но теперь состав команды формируется из актуального ростера на Альфа-лиге.",
    author: "Condor",
    date: "09.09.2020",
  },
  {
    paragraph:
      "Следующим этапом будет открытие фотогалереи и оптимизация кода. Ждем ваши отзывы и пожелания!",
    author: "Condor",
    date: "07.04.2019",
  },
  {
    paragraph:
      "Добро пожаловать на обновленный сайт команды Panic! Он почти адаптивный и в дальнейшем его ждет множество изменений, следите за новостями!",
    author: "Condor",
    date: "07.04.2019",
  },
];
let addNews = function (e) {
  const content = document.querySelector(".mainclass");
  content.innerHTML = "";
  content.classList.remove("players");
  content.classList.add("content");
  document.querySelector(".side_right").classList.remove("hidden");
  //создаю внутренности для новости

  function renderPosts() {
    allNewsPosts.forEach((e) => {
      let news = document.createElement("div");
      let pNews = document.createElement("p");
      let author = document.createElement("div");
      news.classList.add("news");
      pNews.innerHTML = `${e.paragraph}`;
      author.classList.add("author");
      author.innerHTML = `${e.author}<br> ${e.date}`;
      news.append(pNews);
      news.append(author);
      //добавляю внутренности в новость
      content.append(news);
    });
    navNews.removeEventListener("click", addNews);
    navPlayers.addEventListener("click", addPlayers);
  }
  renderPosts();
  // var news = document.createElement("div");
  // news.classList.add("news");
  // var pNews = document.createElement("p");
  // pNews.innerHTML = `С фотогалереей пока не срослось, но теперь состав команды формируется из актуального ростера на Альфа-лиге.`;
  // var author = document.createElement("div");
  // author.classList.add("author");
  // author.innerHTML = "Condor<br> 09.09.2020";
  // news.append(pNews);
  // news.append(author);
  // //добавляю внутренности в новость
  // content.append(news);

  // var news = document.createElement("div");
  // news.classList.add("news");

  // var pNews = document.createElement("p");
  // pNews.innerHTML = `Следующим этапом будет открытие фотогалереи и оптимизация кода. Ждем ваши отзывы и пожелания!`;
  // var author = document.createElement("div");
  // author.classList.add("author");
  // author.innerHTML = "Condor<br> 07.04.2019";
  // news.append(pNews);
  // news.append(author);
  // //добавляю внутренности в новость
  // content.append(news);

  // var news = document.createElement("div");
  // news.classList.add("news");
  // var pNews = document.createElement("p");
  // pNews.textContent =
  //   "Добро пожаловать на обновленный сайт команды Panic! Он почти адаптивный и в дальнейшем его ждет множество изменений, следите за новостями!";
  // var author = document.createElement("div");
  // author.classList.add("author");
  // author.innerHTML = "Condor<br> 07.04.2019";
  // news.append(pNews);
  // news.append(author);
  // //добавляю внутренности в новость
  // content.append(news);

  //убираю событие клика по строке "Новости"
  navNews.removeEventListener("click", addNews);
  navPlayers.addEventListener("click", addPlayers);
};
//Добавляю события клика по строке "Новости"
navNews.addEventListener("click", addNews);
//
//
// *************СОЗДАЕМ СОСТАВ КОМАНДЫ*************
const navPlayers = document.querySelector(".navPlayers"),
  content = document.querySelector(".mainclass"),
  statusMessage = document.createElement("img");

navPlayers.textContent = "Состав команды";

statusMessage.src = "spinner.svg";
statusMessage.style.cssText = `display: block;  heigth: 150px; width: 150px; margin: 0 auto; right: 0; left: 0;`;

let addPlayers = function () {
  document.querySelector(".side_right").classList.add("hidden");
  content.innerHTML = "";
  content.insertAdjacentElement("afterbegin", statusMessage);

  //создаю внутренности для Состава команды

  function renderPlayers(json) {
    const responseGood = json.players;
    responseGood.forEach((post) => {
      const Player = document.createElement("div");
      Player.classList.add("player", post.race);
      const PlayerName = document.createElement("div");
      PlayerName.innerHTML = `<a href="${post.bnetaccount}" target='_blank'>${post.nickname}</a>`;
      const Playerdesc = document.createElement("p");
      Playerdesc.textContent = post.league;
      Player.append(PlayerName);
      Player.append(Playerdesc);
      content.append(Player);
    });
  }

  fetch("https://alpha.tl/api?clan=1")
    .then((data) => data.json())
    .then((json) => {
      renderPlayers(json);
    })
    .catch(() => {
      console.error("ERROR!");
      alert("Не удалось загрузить список игроков, попробуйте еще раз!");
    })
    .finally(() => {
      statusMessage.remove();
    });

  function renderPlayers(json) {
    const responseGood = json.players;
    responseGood.forEach((post) => {
      const Player = document.createElement("div");
      Player.classList.add("player", post.race);
      const PlayerName = document.createElement("div");
      PlayerName.innerHTML = `<a href="${post.bnetaccount}" target='_blank'>${post.nickname}</a>`;
      const Playerdesc = document.createElement("p");
      Playerdesc.textContent = post.league;
      Player.append(PlayerName);
      Player.append(Playerdesc);
      content.append(Player);
    });
  }

  content.classList.add("players");
  content.classList.remove("content");

  //убираю событие клика по строке "Состав команды"
  navPlayers.removeEventListener("click", addPlayers);
  navNews.addEventListener("click", addNews);
};
navPlayers.addEventListener("click", addPlayers);
//
//Грузим дефолт
addNews();
