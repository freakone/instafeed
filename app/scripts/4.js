var currentSlide = 0;
var slides = document.getElementsByName('slides');
var slide_container = document.getElementById('instafeed_container');
var previousSlide = slides.length;
var feed = null;

function nextPhoto() {
  slides[previousSlide].classList.remove('slide-active');
  slides[currentSlide].classList.add('slide-active');
  previousSlide = currentSlide;
  currentSlide++;
  if (currentSlide === slides.length) {
    currentSlide = 0;
    slide_container.innerHTML = null;
    feed = new Instafeed({
      get: 'tagged',
      tagName: 'hi5monte',
      clientId: '25a5f37f226940b29b4856329ea4e68e',
      target: 'instafeed_container',
      template: '<div class="slide" name="slides"><img class="insta" src="{{image}}" /></div>',
      resolution: 'standard_resolution',
      sortBy: 'most-recent',
      limit: 11,
      error: function(error) {
        refreshSite();
      },

      after: updateSlides()
    });
    feed.run();
  }
}

function refreshSite() {
  location.reload();
}

function startInstagram() {

  feed = new Instafeed({
    get: 'tagged',
    tagName: 'hi5monte',
    clientId: '25a5f37f226940b29b4856329ea4e68e',
    target: 'instafeed_container',
    template: '<div class="slide" name="slides"><img class="insta" src="{{image}}" /></div>',
    resolution: 'standard_resolution',
    sortBy: 'most-recent',
    limit: 11,

    after: updateSlides()
  });
  feed.run();

  setInterval(function () {
    nextPhoto();
  }, 2000);
}

startInstagram();

function updateSlides() {
  slides = document.getElementsByName('slides');
  previousSlide = slides.length;
}
