function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  // получаем доступ 
  const startBtn = document.querySelector('button[data-start]');
  const stoptBtn = document.querySelector('button[data-stop]');
  const body = document.querySelector('body');
  // делаем кнопку стоп не активной
  stoptBtn.setAttribute("disabled", "");
  
  // создаем слушателя на кнопку старт
  startBtn.addEventListener("click", handlerStart);
  
  // запускаем событие при нажатии кнопки старт
  function handlerStart(event) {
  
      // меняем цвет body с интервалом 1000 мсек
      const intervalID = setInterval(() => {
          body.style.backgroundColor = getRandomHexColor();
      }, 1000);
  
      // делаем кнопку старт не активной, а стоп активной
      startBtn.setAttribute("disabled", "");
      stoptBtn.removeAttribute("disabled");
  
      // создаем слушателя на кнопку стоп
      stoptBtn.addEventListener("click", (event) => {
  
          // убираем изменения цвета body
          clearInterval(intervalID);
  
          // делаем кнопку старт активной, а стоп не активной
          startBtn.removeAttribute("disabled");
          stoptBtn.setAttribute("disabled", "");
      }, )
  };
