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

function callFetch() {
    fetch(url)
        .then((resp) => resp.json())
        .then(function(response) {

            let data = eval("response['" + String(id) + "'];").data;

            document.getElementById("description").innerHTML += data.detailed_description;
            document.title = data.name;
            title.innerHTML = data.name;

            if (data.pc_requirements.recommended!=undefined) {
              document.getElementById('requirements').innerHTML = data.pc_requirements.recommended;
            } else {
              document.getElementById('requirements').innerHTML = data.pc_requirements.minimum;
            }


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
              console.log("here!");
              document.getElementById("reviews").innerHTML += '<a class="" href=' + data.metacritic.url + '><h2 class="metacritic-score">Metacritic Score: ' + data.metacritic.score + '</h2></a>';
            }else{
              document.getElementById("reviews").innerHTML += '<h2>Metacritic Score: <span class="metacritics-unrated">UNRATED</span></h2>';
            }

            if (data.content_descriptors.notes != null){
              document.getElementById("notes").innerHTML = '<p><span class="text-warning">PLEASE NOTE:</span> ' + data.content_descriptors.notes+'</p>';
            }

            let cheapestPriceDiv = document.getElementById("cheapestPriceDiv");

            if (data.is_free){
              cheapestPriceDiv.innerHTML= "<h3>Steam</h3><a href='https://store.steampowered.com/app/" + id + "'>FREE!</a>";
              return;
            }
            cheapestPriceDiv.innerHTML = "<h3>Steam</h3><a href='https://store.steampowered.com/app/" + id + "'>" + data.price_overview.final_formatted + "</a>";

            let url = "https://www.cheapshark.com/api/1.0/deals?steamAppID=" + id;

            fetch(url)
              .then((resp) => resp.json())
              .then(function(dealData) {
                let cheapestStoreID = dealData[0].storeID;
                let cheapestStoreName = "";

                // Get store data about the cheapest deal
                // (the first fetch will be completed before the second hence why the dealData stuff is inside this one as it goes after)
                fetch('https://www.cheapshark.com/api/1.0/stores')
                  .then((resp) => resp.json())
                  .then(function(storeData) {
                    storeData.forEach(store => {
                        if (store.storeID == cheapestStoreID)
                        {
                            cheapestStoreName = store.storeName;
                        }
                    });
                    cheapestPriceDiv.innerHTML = '<h3>' + cheapestStoreName + '</h3><a class="fw-bold" href="https://www.cheapshark.com/redirect?dealID=' + dealData[0].dealID + '">$ ' + dealData[0].salePrice + '</a>';
                
                  })
                  .catch(function(error) {
                    console.log(error);
                  });
                
              })
              .catch(function(error) {
                console.log(error);
              });
        })
        .catch(function(error) {
          console.log(error);
        });
}