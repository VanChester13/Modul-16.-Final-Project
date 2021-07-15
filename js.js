const inputPage = document.querySelector("#page");
const inputLimit = document.querySelector("#limit");
const output = document.querySelector('.output');
const btn = document.querySelector('.btn');
const lastcards = localStorage.getItem('card');
output.innerHTML = lastcards;

// Отрабатываем сценарий действия
btn.addEventListener('click', () => {
  let input1 = true;
  let input2 = true;
  let page = +inputPage.value;
  let limit = +inputLimit.value;

  if (page === '' ||  isNaN(page) || page < 1 || page > 10) {
      output.textContent = 'Номер страницы вне диапазона от 1 до 10';
     input1 = false;
    }
  
  if (limit === '' ||  isNaN(limit) || limit < 1 || limit > 10) {
   output.textContent = 'Лимит вне диапазона от 1 до 10';
  input2 = false;
}
  
  if (input1 === false && input2 === false) {
    output.textContent = 'Номер страницы и лимит вне диапазона от 1 до 10';
  }
  
  if (input1 === true && input2 === true) {
    useRequest(page, limit);
  }
  
});

 // отправка запроса и получение ответа
 async function useRequest(page, limit) {
  return await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => { console.log(json);   
    displayResult(json);    
  })
    .catch(() => { console.log('error') });
}

  // отрисовка картинок
 function displayResult (obj) {
  let cards = '';
  obj.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img width="600" height="400"
           src="${item.download_url}"
          class="card-image" />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });   
  output.innerHTML = cards;
    localStorage.setItem('card', cards);  
}