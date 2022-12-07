window.addEventListener('DOMContentLoaded', (event) => {
    callFetch();
  });
  
  function createNode(element) {
    return document.createElement(element);
  }
  
  function append(parent, el) {
    return parent.appendChild(el);
  }

let url = "https://api.rawg.io/api/games?key=0dac4fa06f3b451ea15e3e67b4b187c2&page_size=5&search=elden%20ring&language=eng";
const container = document.getElementById('main');
const title = document.getElementById('title');
const screenshots = document.getElementById('carousel-inner');
const reviews = document.getElementById('reviews');

function callFetch() {
    fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
        
            let game = data.results;
            title.innerHTML = game[0].name;

            let inner = createNode('div');
            inner.setAttribute('class', 'carousel-inner');
            let item1 = document.getElementById('item1');
            item1.setAttribute('src', 'https://sportshub.cbsistatic.com/i/2022/04/07/4e7e79bc-b941-4e56-bfad-2c547d36b6ca/elden-ring-malenia.png');
            game[0].short_screenshots.forEach(screenshot => {
                let item = createNode('div');
                item.setAttribute('class', 'carousel-item');
                let img = createNode('img');
                img.setAttribute('class', 'd-block w-100 h-100');
                img.setAttribute('src', screenshot.image);
                append(screenshots, item);
                append(item, img);
            })

            
        })
        .catch(function(error) {
        console.log(error);
        });
}

