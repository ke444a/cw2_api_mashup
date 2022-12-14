window.addEventListener('DOMContentLoaded', (event) => {
    callFetch();
  });
  
  function createNode(element) {
    return document.createElement(element);
  }
  
  function append(parent, el) {
    return parent.appendChild(el);
  }



let id = window.location.href.split('?')[1];
const container = document.getElementById('main');
const title = document.getElementById('title');
const screenshots = document.getElementById('carousel-inner');
const reviews = document.getElementById('reviews');

function callFetch() {

    if(id[0] === "id"){
      steamIdFetch(id[1]);
    }
    else{
      cheapsharkIDFetch(id[1]);
    }

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

            game[0].ratings.forEach(rating => {
                let rate = createNode('div');
                let text = createNode('p');
                text.innerHTML = rating.percent + "% - \"" + rating.title + "\"";
                append(rate, text);
                append(reviews, rate);
            })
        })
        .catch(function(error) {
        console.log(error);
        });
}

function steamIdFetch(id){

  let url = "https://store.steampowered.com/api/appdetails?appids="+id;

  fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
          console.log(data);
        })
        .catch(function(error) {
        console.log(error);
        });
}

function cheapsharkIDFetch(id){

  let url = 

  fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {
    console.log(data);
  })
  .catch(function(error) {
  console.log(error);
  });
}