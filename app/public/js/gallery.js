$(document).ready(function() {
  var image, imageCache = [];
  $("#slides img").each(function() {
    image = new Image();
        image.src = $(this).attr("src");
        // image.title = $(this).attr("alt");
        // image.title.style.color= "white";
        imageCache[imageCache.length] = image;
    });

  // Start slide show
  var imageCounter = 0;
  var nextImage, nextCaption;
    var  timer = setInterval(
        function () {
          $("#caption").fadeOut(500);
          $("#slide").fadeOut(500,
        function() {
          imageCounter = (imageCounter + 1) % imageCache.length;
              nextImage = imageCache[imageCounter];
              // nextCaption = nextImage.title;	
            // $("#caption").text(nextCaption).fadeIn(0);
            $("#slide").attr("src", nextImage.src).fadeIn(500);
        }
          );
        },
      3000);

});
