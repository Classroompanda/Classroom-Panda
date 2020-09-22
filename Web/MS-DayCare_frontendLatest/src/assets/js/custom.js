$(document).ready(function () {
  $("#overlay-section").click(function () {
    // alert("Hello");
    // debugger;
    $("#toggleButtons").click();
  });
  $(".an-nav-item a").click(function () {
    
    let windowWidth = $(window).width();
    if(windowWidth < 992){
       if ($(this).parent().find('ul').length > 0) {
      } else {
        console.log('else called 2');
        document.getElementById('toggleButtons').click();
      }
    }

  });
  // $('#overlay-section, .an-nav-item > ul > li > a').click(function () {
  //   $("#toggleButtons").click();
  //     });
});


