function createNode(element) {
  return document.createElement(element);
}
  
function append(parent, el) {
  return parent.appendChild(el);
}


//fetch CAROUSEL

//how many items do you want in the carousel?
var carouselItems = 5;

url = "https://api.rawg.io/api/games?key=0dac4fa06f3b451ea15e3e67b4b187c2&page_size=" + carouselItems;

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
      console.log(data);

      var slider = document.getElementsByClassName("deals-slider")[0];
      console.log(slider);

      for(var i = 0; i < topDealItemCount; i++){

        var item = createNode("div");
        var img = createNode("image");
        var title = createNode("h5");
        var price = createNode("p");

        item.setAttribute('class',"deals-slider__item" );
        img.setAttribute('class', "slider__item-img");
        img.setAttribute('src', data[i].thumb);
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


// <div class="deals-slider__item">
//   <img class="slider__item-img" src="https://picsum.photos/180/230" alt="Game logo">
//   <h5 class="slider__item-title mt-3 mb-0">Game title</h5>
//   <p class="slider__item-price mt-2">£<span id="top-deals-price">25.99</span></p>
// </div>


