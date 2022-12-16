function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}


let tabLinks = document.getElementsByClassName("tab-link");
tabLinks[0].click();

function openGameCategory(event, gameCategory) {  
    // Get all elements with class="tabcontent" and hide them
    let tabContents = document.getElementsByClassName("tab-content");
    for (let tab of tabContents) {
      tab.style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    for (let tabLink of tabLinks) {
      tabLink.className = tabLink.className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(gameCategory).style.display = "block";
    event.currentTarget.className += " active";
  }

  categories = ["action", "sports", "strategy", "horror", "rpg", "adventure", "simulation", "indie"];

  for(let i = 0; i<categories.length; i++){
    createCategoryTab(categories[i], i*i);
  }

function createCategoryTab(category, page){
  url = "https://www.cheapshark.com/api/1.0/deals?pageSize=50&pageNumber="+page
  fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {

          var dataIndex = -1;

          for(let i = 0; i < 5; i++){
            var row = createNode("div");
            row.setAttribute('class', 'row mb-4');

            append(document.getElementById(category), row);

            for (let j = 0; j < 4; j++){
              while(true){
                dataIndex++;
                if (data[dataIndex].steamAppID == null){
                  continue;
                }
                break;
              }

              var column = createNode('div');
              column.setAttribute('class', 'col-3 text-center');
              append(row, column);

              var card = createNode('div');
              card.setAttribute('class', 'card d-inline-block');
              append(column, card);

              var imgDiv = createNode('div');
              imgDiv.setAttribute('class', 'card-link-wrapper text-center');
              append(card, imgDiv);

              let link = "descriptionPage.html?id=" + data[dataIndex].steamAppID;
              let imageSrc = data[dataIndex].thumb;

              imgDiv.innerHTML = '<a href="'+ link +'"><img src="' + imageSrc + '"class="card-img-top w-100" alt="Game image"></a><a href="'+ link +'" class="btn card-link fw-bold d-none d-sm-block px-sm-0 pb-0 pb-md-1 pt-md-2">DETAILS <i class="fa-solid fa-chevron-right"></i></a>';

              var bodyDiv = createNode('div');
              bodyDiv.setAttribute('class', 'card-body pt-2 pt-md-3 pb-1 px-1 px-md-3 text-start lh-1');
              append(card, bodyDiv);

              bodyDiv.innerHTML = '<a href="'+ link +'" class="card-title">' + data[dataIndex].title + '</a><p class="card-text mt-1 mb-0 mb-md-1 fw-bold">'+ data[dataIndex].salePrice +'</p>';
            }
          }

        })
        .catch(function(error) {
          console.log(error);
        });
}