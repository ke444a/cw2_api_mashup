function createNode(element) {
  return document.createElement(element);
}
  
function append(parent, el) {
  return parent.appendChild(el);
}


//fetch CAROUSEL

//how many items do you want in the carousel?
var carouselItems = 5;

var url = "https://api.rawg.io/api/games?key=0dac4fa06f3b451ea15e3e67b4b187c2&page_size=" + carouselItems;

fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
      var carousel = document.getElementsByClassName("carousel-inner")[0];
      
      var item = createNode("div");
      var img = createNode("img");
      var captionDiv = createNode("div");
      var caption = createNode("h5");

      item.setAttribute('class','carousel-item active');

      img.setAttribute('class', 'd-block w-100 h-100');
      img.setAttribute('src', data.results[0].background_image)

      captionDiv.setAttribute('class', 'carousel-caption d-none d-md-block pb-0');
      caption.setAttribute('class', 'carousel-caption__title mb-0 py-2');
      caption.innerHTML = data.results[0].name;

      append(captionDiv, caption);
      append(item, img);
      append(item, captionDiv);
      append(carousel, item)



      for(var i = 1; i < carouselItems; i++){

        let item = createNode("div");
        let img = createNode("img");
        let captionDiv = createNode("div");
        let caption = createNode("h5");

        item.setAttribute('class','carousel-item');

        img.setAttribute('class', 'd-block w-100 h-100');
        img.setAttribute('src', data.results[i].background_image)

        captionDiv.setAttribute('class', 'carousel-caption d-none d-md-block pb-0');
        caption.setAttribute('class', 'carousel-caption__title mb-0 py-2');
        caption.innerHTML = data.results[i].name;

        append(captionDiv, caption);
        append(item, img);
        append(item, captionDiv);
        append(carousel, item)
      }
    })
    .catch(function(error) {
        console.log(error);
    });


//fetch TOP DEALS

//how many items?
var topDealItemCount = 20;

url = "https://www.cheapshark.com/api/1.0/deals?pageSize=" + topDealItemCount;

fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {

      var slider = document.getElementsByClassName("deals-slider")[0];

      for(var i = 0; i < topDealItemCount; i++){

        var item = createNode("div");
        var img = createNode("img");
        var title = createNode("h5");
        var price = createNode("p");

        item.setAttribute('class',"deals-slider__item" );
        img.setAttribute('class', "slider__item-img");
        img.setAttribute('src', data[i].thumb);

        img.style.width = "180px"

        title.setAttribute('class', "slider__item-title mt-3 mb-0");
        title.innerHTML = data[i].title;
        price.setAttribute('class', "slider__item-price mt-2");
        price.innerHTML = "£<span id=\"top-deals-price\">" + data[i].salePrice + "</span>";

        append(item, img);
        append(item, title);
        append(item, price);

        append(slider, item);
      }


      $(function() {
        $('.deals-slider').slick({
          slidesToShow: 5,
          slidesToScroll: 5,
          autoplay: true,
          autoplaySpeed: 4000,
          speed: 1000,
          prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-circle-chevron-left"></i></button>',
          nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-circle-chevron-right"></i></i></button>',
        });
      })
    })
    .catch(function(error) {
        console.log(error);
    });



//fetch NEW RELEASES

var newReleaseItemRows = 2;

var cutOffDates = "2022-01-01,2022-12-31";

var newReleaseCount = 4*newReleaseItemRows;

var url = "https://api.rawg.io/api/games?key=0dac4fa06f3b451ea15e3e67b4b187c2&dates="+cutOffDates+"&page_size="+newReleaseCount;

fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
            // <div class="container">
            //     <h2 class="mb-3">NEW RELEASES</h2>
            //     <div class="row">
            //       <div class="col-3">
            //         <img class="w-100" src="https://picsum.photos/200/150" alt="">
            //         <p class="text-end fw-bold mt-2">£ <span id="new-realses-price">14.99</span></p>
            //       </div>
                  
            //     </div>
            // </div>


            var newReleases = document.getElementById("new-releases");

            var container = createNode("div");
            container.setAttribute("class", "container");
            append(newReleases, container);

            var header = createNode("h2");
            header.setAttribute("class", "mb-3");
            header.innerHTML = "NEW RELEASES";
            append(container, header);

            var rows = createNode("div");
            rows.setAttribute("class", "row");
            append(container, rows);

            for(var i = 0; i < newReleaseCount; i++){

              var div = createNode("div");
              div.setAttribute("class", "col-3");
              append(rows, div);

              var img = createNode("img");
              img.setAttribute("class", "w-100");
              img.setAttribute("src", data.results[i].background_image);
              append(div, img);
              
              
              
              var price = createNode("p");
              price.setAttribute("class", "text-end fw-bold mt-2");
              append(div, price);

              updateNewReleasePrices(price, data.results[i].name)
            }
            
            
    })
    .catch(function(error) {
        console.log(error);
    });

function updateNewReleasePrices(element, itemName){

console.log(element);

  var url = "https://www.cheapshark.com/api/1.0/deals?title="+itemName+"&sortBy=savings";
  fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
    console.log(data);
    element.innerHTML = "£ <span id=\"new-realses-price\">"+data[0].salePrice+"</span>"});

} 