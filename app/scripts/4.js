var currentSlide = 0;
var slides = document.getElementsByName('slides');
var slide_container = document.getElementById('instafeed_container');
var slide_container_hidden = document.getElementById('instafeed_container_hidden');
var feed = null;

function initInsta(){

   feed = new Instafeed({

      get: 'tagged',
      tagName: 'meetatmonterail',
      clientId: '25a5f37f226940b29b4856329ea4e68e',
      target: 'instafeed_container_hidden',
      template: '<div class="slide" name="slides"><img class="insta" src="{{image}}" /></div>',
      resolution: 'standard_resolution',
      sortBy: 'most-recent',
      limit: 10,
      error: function(error) {
        refreshSite();
      },      
      after: function() {
        slide_container.innerHTML = slide_container_hidden.innerHTML;
        slide_container_hidden.innerHTML = null;
        currentSlide = 0;
        nextPhoto();

      }
    });

    feed.run();
}

function nextPhoto() {

  if(!slides || slides.length === 0)
    return;

  if (currentSlide >= slides.length) {    
    feed.run();
  }
  else  {
    for(var i = 0; i < slides.length; i++){
      slides[i].classList.remove('slide-active');
    }

    slides[currentSlide++].classList.add('slide-active');
  }
}

function refreshSite() {
  location.reload();
}

function startInstagram() {

  initInsta();
  setInterval(function () {
    nextPhoto();
  }, 5000);
}

startInstagram();

