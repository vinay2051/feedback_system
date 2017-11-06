$(document).ready(function() {
    var sem = 0;
    var branch = 0;

    $('#login').localScroll({
        target: 'html'
    });

    $('#categories').localScroll({
        target: 'html'
    });

    $('#lecturers').localScroll({
        target: 'html'
    });

    $('.script-case-1').bind("click", function() {
        if ($(this).hasClass('open')) {
            collapse($(this));
        } else {
            expand($(this), 0);
        }
    });
    $('.script-case-2').bind("click", function() {
        if ($(this).hasClass('open')) {
            collapse($(this));
        } else {
            expand($(this), 1);
        }
    });

    function expand(ele, n) {
        ele.removeClass('closed').addClass('open');

        options = ele.find('.select');

        options.each(function(index) {
            var layer = options.length - index;
            $(this).css("top", 40 * index + "px");
            $(this).css("width", 230);
        });
        options.bind('click', function() {
            var selection = $(this).text();
            ele.find('#select-default').text(selection);
            var data = $(this).data("id");
            if (n == 0) {
                sem = data;
            } else {
                branch = data;
            }
        });
    }

    function collapse(ele) {
        ele.removeClass('open').addClass('closed');

        options = ele.find('.option');

        options.each(function(index) {
            var layer = options.length - index;
            $(this).css("z-index", layer);
            $(this).css("top", 2 * index + "px");
            $(this).css("width", 230 - 2 * index);
            $(this).css("margin-left", index);
        });
        if (sem != 0 && branch != 0) {
            if (sem == 5 && branch == 1) {
                $('#lb').removeClass('button-visibility');
            } else {
                $('#lb').addClass('button-visibility');
            }
        }
    }
    collapse($('.script-case-1'));
    collapse($('.script-case-2'));

});

$('body').on('mousewheel touchmove', function(e) {
    e.preventDefault();
});

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
var leftOption = document.getElementsByClassName('left');
var currentSlide = 0;

questionNumber();

function questionNumber() {
    // leftOption[0].innerHTML = '<h3>' + (currentSlide + 1) + '/' + slides.length + '</h3>';
}

function nextSlide() {
    slides[currentSlide].className = 'slide';
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].className = 'slide showing';
    questionNumber();
}

function prevSlide() {
    slides[currentSlide].className = 'slide';
    if (currentSlide === 0) {
        currentSlide = slides.length - 1;
    } else { currentSlide = (currentSlide - 1) % slides.length; }
    slides[currentSlide].className = 'slide showing';
    questionNumber();
}