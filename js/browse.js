let tabLinks = document.getElementsByClassName("tab-link");
tabLinks[0].click();

function openPriceCategory(event, priceCategory) {  
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
    document.getElementById(priceCategory).style.display = "block";
    event.currentTarget.className += " active";
  }