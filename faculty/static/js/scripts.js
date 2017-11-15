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

function drawChart() {
    $.ajax({
        type: "POST",
        url: "review/",
        success: function(content) {

            var data = google.visualization.arrayToDataTable(content);

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
}


google.charts.load('current', { 'packages': ['corechart'] });

google.charts.setOnLoadCallback(drawChart);

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

disableScroll()