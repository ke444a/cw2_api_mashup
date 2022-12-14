window.addEventListener('DOMContentLoaded', (event) => {
    callFetch();
  });
  
  function createNode(element) {
    return document.createElement(element);
  }
  
  function append(parent, el) {
    return parent.appendChild(el);
  }



let id = window.location.href.split('?')[1].split('=')[1];
const container = document.getElementById('main');
const title = document.getElementById('title');
const screenshots = document.getElementById('carousel-inner');
const reviews = document.getElementById('reviews');

let url = "https://api.codetabs.com/v1/proxy/?quest=https://store.steampowered.com/api/appdetails?appids="+id;
console.log(url);

function callFetch() {
    fetch(url)
        .then((resp) => resp.json())
        .then(function(response) {

            let data = eval("response['" + String(id) + "'];").data;

            document.getElementById("description").innerHTML = data.detailed_description;
        
            title.innerHTML = data.name;

            document.getElementById('requirements').innerHTML = data.pc_requirements.recommended;


            let screenshots = data.screenshots;

            var carousel = document.getElementById("carousel-inner");
      
            var item = createNode("div");
            var img = createNode("img");

            item.setAttribute('class','carousel-item active');

            img.setAttribute('class', 'd-block w-100 h-100');
            img.setAttribute('src', screenshots[0].path_full);

            append(item, img);
            append(carousel, item)

            for(var i = 1; i < screenshots.length; i++){

              let item = createNode("div");
              let img = createNode("img");

              item.setAttribute('class','carousel-item');

              img.setAttribute('class', 'd-block w-100 h-100');
              img.setAttribute('src', screenshots[i].path_full)

              append(item, img);
              append(carousel, item)
            }

            if (data.metacritic != undefined){
              document.getElementById("reviews").innerHTML = "<a href='" + data.metacritic.url + "'><h2>Metacritic Score: " + data.metacritic.score + "</h2></a>";
            }else{
              document.getElementById("reviews").innerHTML = "<h2>Metacritic Score: unrated</h2>";
            }

            if (data.content_descriptors.notes != null){
              document.getElementById("notes").innerHTML = "please note: " + data.content_descriptors.notes;
            }

            let cheapestPriceDiv = document.getElementById("cheapestPriceDiv");

            let url = "https://www.cheapshark.com/api/1.0/deals?steamAppID=" + id;

            

            fetch(url)
              .then((resp) => resp.json())
              .then(function(dealData) {
                cheapestPriceDiv.innerHTML = "<a href='https://www.cheapshark.com/redirect?dealID=" + dealData[0].dealID + "'>$" + dealData[0].salePrice + "</a>";
              })
              .catch(function(error) {
              console.log(error);
              });

        })
        .catch(function(error) {
        console.log(error);
        });
}