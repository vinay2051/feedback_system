var sem = 0;
var branch = "def";
var faculty;
var categories;
var options;
var suggestion;
var flag = 0;
var course;


var slides = $('.slide');
var leftOption = $('.left');
var currentSlide = 0;

google.charts.load('current', { 'packages': ['corechart'] });


$(document).ready(function() {

    $('#login').localScroll({
        target: 'html'
    });

    $('#categories').localScroll({
        target: 'html'
    });

    $('#lecturers').localScroll({
        target: 'html'
    });

    $('#questions').localScroll({
        target: 'html'
    });

    $('#suggestion').localScroll({
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
                branch = $(this).text();
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
        if (sem != 0 && branch != "def") {
            $('#lb').removeClass('button-visibility');
        }
    }

    collapse($('.script-case-1'));
    collapse($('.script-case-2'));
});

function lectureCircle(data) {
    $('.one_fourth').each(function(i, obj) {
        obj.setAttribute('data-id', data[i].pk);
        obj.setAttribute('data-course', data[i].course);
        obj.children[0].children[0].text = data[i].name
        obj.children[0].children[1].setAttribute('src', data[i].image)
    });
}

$('body').on('click', '.login-button', function() {
    $.ajax({
        type: "POST",
        url: "lecturers/",
        dataType: "json",
        data: { "semester": sem, "branch": branch },
        success: function(data) {
            lectureCircle(data);
        }
    });
});


// $('body').on('click', '.one_fourth', function() {
//     faculty = $(this).data('id');
//     $.ajax({
//         type: "POST",
//         url: "categories/",
//         dataType: "json",
//         data: { "semester": sem, "branch": branch, 'faculty': faculty },
//         success: function(data) {
//             var categories = $('.categories_div');
//             // var title = $('.cat_text');
//             categories.empty();
//             // title.empty();
//             // title.append('Select categories to suggest ' + data.faculty);
//             for (i = 0; i < data.categories.length; i++) {
//                 categories.append('<label class="switcher" > <input type = "checkbox" name="categories" value="' + data.categories[i] + '" /><div class = "switcher__indicator" > </div><span>' + data.categories[i].toUpperCase() + '</span ></label><br/> <br/>');
//             }
//         }
//     });
// });

// $('body').on('change', '.categories_div input:checkbox', function() {
//     if (this.checked) {
//         $('#cb').removeClass('button-visibility');
//     } else {
//         $('#cb').addClass('button-visibility');
//     }
// });

// $('body').on('click', '#cb', function() {

//     categories = [];

//     $("input[name='categories']").each(function() {
//         if (this.checked) {
//             categories.push($(this).val());
//         }
//     });

//     $.ajax({
//         type: "POST",
//         url: "questions/",
//         dataType: "json",
//         data: { "categories": categories },
//         success: function(data) {
//             var slideShow = $('#slides');
//             slideShow.empty();
//             for (i = 0; i < data.length; i++) {
//                 if (i == 0) {
//                     slideShow.append('<li class="slide showing"><div class="demo"><div class="demo__title">' + data[i].question + '</div><div class="demo__content options_div ' + data[i].pk + '"></div></div></li>');
//                 } else {
//                     slideShow.append('<li class="slide"><div class="demo"><div class="demo__title">' + data[i].question + '</div><div class="demo__content options_div ' + data[i].pk + '"></div></div></li>');
//                 }
//                 var ele = $('.options_div.' + data[i].pk);
//                 for (j = 0; j < data[i].options.length; j++) {
//                     ele.append('<input type="radio" class="option-input radio" name="' + data[i].pk + '" value="' + data[i].options[j].pk + '"/><span class="op_text">' + data[i].options[j].option + '</span><br/><br/>');
//                 }
//             }
//             slides = $('.slide');
//             questionNumber();
//         }
//     });
// });


$('body').on('click', '.one_fourth', function() {
    faculty = $(this).data('id');
    course = $(this).data('course');
    $.ajax({
        type: "POST",
        url: "questions/",
        success: function(data) {
            var slideShow = $('#slides');
            slideShow.empty();
            for (i = 0; i < data.length; i++) {
                if (i == 0) {
                    slideShow.append('<li class="slide showing"><div class="demo"><div class="demo__title">' + data[i].question + '</div><div class="demo__content options_div ' + data[i].pk + '"></div></div></li>');
                } else {
                    slideShow.append('<li class="slide"><div class="demo"><div class="demo__title">' + data[i].question + '</div><div class="demo__content options_div ' + data[i].pk + '"></div></div></li>');
                }
                var ele = $('.options_div.' + data[i].pk);
                for (j = 0; j < data[i].options.length; j++) {
                    ele.append('<input type="radio" class="option-input radio" name="' + data[i].pk + '" value="' + data[i].options[j].pk + '"/><span class="op_text">' + data[i].options[j].option + '</span><br/><br/>');
                }
            }
            slides = $('.slide');
            questionNumber();
        }
    });
});

$('body').on('change', '.options_div input:radio', function() {

    $(this).each(function() {
        if (this.checked) {
            flag = flag + 1;
        }
    });
    if (flag >= slides.length && flag != 0) {
        $('#qb').removeClass('button-visibility');
    }
});

$('body').on('click', '#qb', function() {

    options = []

    $('.options_div input:radio').each(function() {
        if (this.checked) {
            options.push($(this).val());
        }
    });
    $.ajax({
        type: "POST",
        url: "suggestion/",
        dataType: "json",
        data: { "options": options },
        success: function(content) {

            suggestion = content.json

            var data = google.visualization.arrayToDataTable(content.array);

            var chartOptions = {
                title: 'My Daily Activities',
                titleTextStyle: {
                    color: 'black',
                    fontName: 'Quicksand',
                    fontSize: 20,
                    bold: false,
                    italic: false
                },
                legend: {
                    position: 'top',
                    textStyle: {
                        color: 'black',
                        fontName: 'Quicksand',
                        fontSize: 14,
                        bold: false,
                        italic: false
                    }
                },
                tooltip: {
                    textStyle: {
                        color: 'black',
                        fontName: 'Quicksand',
                        fontSize: 16,
                        bold: false,
                        italic: false
                    }
                }
            };

            var chart = new google.visualization.PieChart(document.getElementById('piechart'));

            chart.draw(data, chartOptions);
        }
    });
});

$('body').on('click', '#sb', function() {
    $.ajax({
        type: "POST",
        url: "submit/",
        dataType: "json",
        data: { "course": course, "faculty": faculty, "semester": sem, "branch": branch, "suggestion": JSON.stringify(suggestion) },
        success: function(data) {
            console.log(data);
        }
    });
    faculty = null;
    categories = null;
    options = null;
    suggestion = null;
    flag = 0;
    course = null;
    currentSlide = 0;
    $('#slides').empty();
});

function getCookie(name) {
    var cookieValue = null;
    var i = 0;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (i; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    crossDomain: false,
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type)) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    if (window.addEventListener)
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault;
    window.onmousewheel = document.onmousewheel = preventDefault;
    window.ontouchmove = preventDefault;
    document.onkeydown = preventDefaultForScrollKeys;
}

disableScroll();

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

function questionNumber() {
    leftOption[0].innerHTML = '<h3>' + (currentSlide + 1) + '/' + slides.length + '</h3>';
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