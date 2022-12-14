function createNode(element) {
  return document.createElement(element);
}
  
function append(parent, el) {
  return parent.appendChild(el);
}


//fetch CAROUSEL

//how many items do you want in the carousel?
var carouselItems = 5;

var url = "https://api.codetabs.com/v1/proxy/?quest=https://store.steampowered.com/api/featuredcategories/?cc=EE&amp;l=english&v=1&trailer=1%20HTTP/1.1";

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
      img.setAttribute('src', data.specials.items[0].large_capsule_image);

      data.new_releases.items[i];

      captionDiv.setAttribute('class', 'carousel-caption d-none d-md-block pb-0');
      caption.setAttribute('class', 'carousel-caption__title mb-0 py-2');
      caption.innerHTML = "<a href=descriptionPage.html?id=" + data.specials.items[0].id + ">" + data.specials.items[0].name + "</a>";

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
        img.setAttribute('src', data.specials.items[i].large_capsule_image)

        captionDiv.setAttribute('class', 'carousel-caption d-none d-md-block pb-0');
        caption.setAttribute('class', 'carousel-caption__title mb-0 py-2');
        caption.innerHTML = "<a href=descriptionPage.html?id=" + data.specials.items[i].id + ">" + data.specials.items[i].name + "</a>";

        append(captionDiv, caption);
        append(item, img);
        append(item, captionDiv);
        append(carousel, item)
      }
    })
    .catch(function(error) {
        //console.log(error);
    });


//fetch TOP DEALS

//how many items?
var topDealItemCount = 50;

url = "https://www.cheapshark.com/api/1.0/deals?steamworks=1&pageSize=" + topDealItemCount;

fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {

      var slider = document.getElementsByClassName("deals-slider")[0];

      for(var i = 0; i < topDealItemCount; i++){

        if(data[i].steamAppID == null){
          continue;
        }

        var item = createNode("div");
        var img = createNode("img");
        var title = createNode("h5");
        var price = createNode("p");

        item.setAttribute('class',"deals-slider__item" );
        img.setAttribute('class', "slider__item-img");
        img.setAttribute('src', data[i].thumb);

        img.style.width = "240px"
        img.style.height = "90px"

        title.setAttribute('class', "slider__item-title mt-3 mb-0");
        title.innerHTML = "<a href=descriptionPage.html?id=" + data[i].steamAppID + ">" + data[i].title+ "</a>";
        price.setAttribute('class', "slider__item-price mt-2");
        price.innerHTML = "£<span id=\"top-deals-price\">" + data[i].salePrice + "</span>";

        append(item, img);
        append(item, title);
        append(item, price);

        append(slider, item);
      }


      $(function() {
        $('.deals-slider').slick({
          slidesToShow: 3,
          slidesToScroll: 3,
          autoplay: true,
          autoplaySpeed: 4000,
          speed: 1000,
          prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-circle-chevron-left"></i></button>',
          nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-circle-chevron-right"></i></i></button>',
        });
      })
    })
    .catch(function(error) {
        //console.log(error);
    });



//fetch NEW RELEASES

var newReleaseItemRows = 2;

var newReleaseCount = 4*newReleaseItemRows;

var url = "https://api.codetabs.com/v1/proxy/?quest=https://store.steampowered.com/api/featuredcategories/?cc=EE&amp;l=english&v=1&trailer=1%20HTTP/1.1";
  
fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {

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
              img.setAttribute("src", data.new_releases.items[i].large_capsule_image);
              append(div, img);
              
              
              
              var price = createNode("p");
              price.setAttribute("class", "text-end fw-bold mt-2");
              append(div, price);

              if (data.new_releases.items[i].final_price == 0){
                price.innerHTML = "FREE!"
                continue;
              }

              price.innerHTML = "<a href='descriptionPage.html?id="+ data.new_releases.items[i].id +"'>£ <span id=\"new-realses-price\">"+String(data.new_releases.items[i].final_price/100)+"</span>";

              updateNewReleasePrices(price, data.new_releases.items[i].id)
            }
            
            
    })
    .catch(function(error) {
        //console.log(error);
    });

function updateNewReleasePrices(element, id){

  var url = "https://www.cheapshark.com/api/1.0/games?steamAppID="+id;
  fetch(url)

    .then((resp) => resp.json())
    .then(function(data) {

      if(data.length == 0){return;}

      element.innerHTML = "<a href='descriptionPage.html?id="+ id +"'>£ <span id=\"new-realses-price\">"+data[0].cheapest+"</span></a>"})
      .catch(function(error){
      //console.log(error);
      return;
    });

}