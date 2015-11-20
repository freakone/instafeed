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

function startSlider() {
  timers.nextSlideInterval = setInterval(function () {
    nextSlide();
  }, 2000);
}

function scheduleSlides(mm) {
  var monitorSlidesTime = setInterval(function () {
    var timeNow = new Date();
    if (timeNow.getMinutes() >= mm) {
      clearInterval(monitorSlidesTime);
      startSlider();
    }
  }, 20);
}

var x = new Date();
scheduleSlides(x.getMinutes() + 1);

function updateSlides() {
  slides = document.getElementsByName('slides');
  previousSlide = slides.length;
}
