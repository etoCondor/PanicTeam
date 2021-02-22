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
const content = document.querySelector(".mainclass");
let addNews = function (e) {
  navNews.style = "text-shadow: #4496ff 0px 0px 20px;";
  navPlayers.style = "";
  streams.style = "";
  content.innerHTML = "";
  content.classList.remove("players");
  content.classList.remove("streams");
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
  streams.addEventListener("click", addStreams);
};
//Добавляю события клика по строке "Новости"
navNews.addEventListener("click", addNews);
//
//
// *************СОЗДАЕМ СОСТАВ КОМАНДЫ*************
const navPlayers = document.querySelector(".navPlayers"),
  statusMessage = document.createElement("img");

navPlayers.textContent = "Состав команды";

statusMessage.src = "spinner.svg";
statusMessage.style.cssText = `display: block;  heigth: 150px; width: 150px; margin: 0 auto; right: 0; left: 0;`;

let addPlayers = function () {
  streams.style = "";
  navNews.style = "";
  navPlayers.style = "text-shadow: #4496ff 0px 0px 20px;";
  document.querySelector(".side_right").classList.add("hidden");
  content.innerHTML = "";
  content.insertAdjacentElement("afterbegin", statusMessage);

  //создаю внутренности для Состава команды

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
  content.classList.remove("streams");

  //убираю событие клика по строке "Состав команды"
  navPlayers.removeEventListener("click", addPlayers);
  navNews.addEventListener("click", addNews);
  streams.addEventListener("click", addStreams);
};
navPlayers.addEventListener("click", addPlayers);

// Streams
const streams = document.querySelector(".navStreams");

streams.textContent = "Трансляции";

statusMessage.src = "spinner.svg";
statusMessage.style.cssText = `display: block;  heigth: 150px; width: 150px; margin: 0 auto; right: 0; left: 0;`;

let addStreams = function () {
  streams.style = "text-shadow: #4496ff 0px 0px 20px;";
  navPlayers.style = "";
  navNews.style = "";
  document.querySelector(".side_right").classList.add("hidden");
  content.innerHTML = "";
  content.insertAdjacentElement("afterbegin", statusMessage);

  //создаю внутренности для стримов

  fetch(
    "https://api.twitch.tv/helix/streams?user_login=maradorsc2&user_login=xfreezardx&user_login=sail___&user_login=lumumbatv&user_login=panicjohnnie",
    {
      headers: {
        "client-id": "gp762nuuoqcoxypju8c569th9wz7q5",
        Authorization: "Bearer 2v1au0vpd2mnbbdlkv193s6oknluyi",
      },
    }
  )
    .then((data) => data.json())
    .then((json) => {
      if (json.data.length === 0) {
        const errorCard = document.createElement("div");
        errorCard.classList.add("errorCard");
        const errorMessage = document.createElement("h2");
        const errorImage = document.createElement("img");
        errorMessage.textContent = "Упс! В данный момент никто не стримит :(";
        errorImage.src = "img/pepeSad.png";
        errorImage.classList.add("errorImage");
        errorCard.appendChild(errorImage);
        errorCard.appendChild(errorMessage);
        content.append(errorCard);
      } else {
        renderStreams(json);
        console.log(json);
      }
    })
    .catch(() => {
      console.error("ERROR!");
      alert("Не удалось загрузить список игроков, попробуйте еще раз!");
    })
    .finally(() => {
      statusMessage.remove();
    });

  function renderStreams(json) {
    const responseGood = json.data;
    responseGood.forEach((stream) => {
      const streamCard = document.createElement("div");
      const streamLink = document.createElement("a");
      const streamerName = document.createElement("h2");
      const streamTitle = document.createElement("p");
      streamTitle.textContent = `${stream.title}`;
      streamerName.textContent = `${stream.user_name}`;
      streamLink.target = "_blank";
      streamLink.href = `https://twitch.tv/${stream.user_login}`;
      const streamImage = document.createElement("img");
      streamImage.src = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${stream.user_login}-480x270.jpg`;
      streamImage.classList.add("streamImage");
      // streamCard.style = "margin: 10px";
      // streamCard.style = "width: 45%";
      streamCard.appendChild(streamLink);
      streamLink.appendChild(streamerName);
      streamLink.appendChild(streamImage);
      streamLink.appendChild(streamTitle);

      content.append(streamCard);
    });
  }

  content.classList.remove("players");
  content.classList.remove("content");
  content.classList.add("streams");

  //убираю событие клика по строке "Стримы"
  navPlayers.addEventListener("click", addPlayers);
  navNews.addEventListener("click", addNews);
  streams.removeEventListener("click", addStreams);
};
streams.addEventListener("click", addStreams);
//
//Грузим дефолт
addNews();
