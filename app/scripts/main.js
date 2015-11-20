var sliderList = document.getElementsByName('slider');
var currentSlide = 0;
var slides = document.getElementsByName('slides');
var slide_container = document.getElementById('instafeed_container');
var previousSlide = slides.length;
var timers = {
  nextSlideInterval: null
};
var feed = null;

function nextSlide() {
  sliderList[currentSlide].checked = true;
  if (currentSlide === sliderList.length - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
}

function nextPhoto() {
  slides[previousSlide].classList.remove('slide-active');
  slides[currentSlide].classList.add('slide-active');
  previousSlide = currentSlide;
  currentSlide++;
  feed.next();
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
      limit: 4,

      after: updateSlides()
    });
    feed.run();
  }
}

function startSlider() {
  timers.nextSlideInterval = setInterval(function () {
    nextSlide();
  }, 2000);
}

function stopSlider() {
  clearInterval(timers.nextSlideInterval);
  var element = document.getElementById("slides");
  element.parentNode.removeChild(element);
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
    limit: 4,

    after: updateSlides()
  });
  feed.run();

  setInterval(function () {
    nextPhoto();
  }, 2000);
}

function scheduleSlides(hh, mm, ss) {
  var monitorSlidesTime = setInterval(function () {
    var timeNow = new Date();
    if (timeNow.getHours() >= hh && timeNow.getMinutes() >= mm) {
      clearInterval(monitorSlidesTime);
      startSlider();
    }
  }, 1000);
}

function scheduleInstagram(hh, mm, ss) {
  var monitorInstagramTime = setInterval(function () {
    var timeNow = new Date();
    if (timeNow.getHours() >= hh && timeNow.getMinutes() >= mm) {
      clearInterval(monitorInstagramTime);
      stopSlider();
      startInstagram();
    }
  }, 1000);
}

scheduleSlides(19, 09, 0);
scheduleInstagram(19, 30, 0);

function updateSlides() {
  slides = document.getElementsByName('slides');
  previousSlide = slides.length;
}
