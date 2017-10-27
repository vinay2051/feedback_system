var btns = document.querySelectorAll('.btn');
var paginationWrapper = document.querySelector('.pagination-wrapper');
var bigDotContainer = document.querySelector('.big-dot-container');
var littleDot = document.querySelector('.little-dot');

for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', btnClick);
}

function btnClick() {
    if (this.classList.contains('btn--prev')) {
        paginationWrapper.classList.add('transition-prev');
        prevSlide();
    } else {
        paginationWrapper.classList.add('transition-next');
        nextSlide();
    }

    var timeout = setTimeout(cleanClasses, 500);
}

function cleanClasses() {
    if (paginationWrapper.classList.contains('transition-next')) {
        paginationWrapper.classList.remove('transition-next')
    } else if (paginationWrapper.classList.contains('transition-prev')) {
        paginationWrapper.classList.remove('transition-prev')
    }
}

$(document).keyup(function(e) {
    if (e.which === 37) {
        paginationWrapper.classList.add('transition-prev');
        prevSlide();
    }
    if (e.which === 39) {
        paginationWrapper.classList.add('transition-next');
        nextSlide();
    }
    var timeout = setTimeout(cleanClasses, 500);
});

var slides = document.querySelectorAll('#slides .slide');
var currentSlide = 0;

function nextSlide() {
    slides[currentSlide].className = 'slide';
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].className = 'slide showing';
}

function prevSlide() {
    slides[currentSlide].className = 'slide';
    if (currentSlide === 0) {
        currentSlide = slides.length - 1;
    } else { currentSlide = (currentSlide - 1) % slides.length; }
    slides[currentSlide].className = 'slide showing';
}