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

function stopSlider() {
  clearInterval(timers.nextSlideInterval);
  var element = document.getElementById("slides");
  element.parentNode.removeChild(element);
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



scheduleSlides(19, 09, 0);


function updateSlides() {
  slides = document.getElementsByName('slides');
  previousSlide = slides.length;
}
