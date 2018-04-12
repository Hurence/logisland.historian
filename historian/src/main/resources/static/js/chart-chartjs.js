/**
 * @Package: Ultra Admin HTML Theme
 * @Since: Ultra 1.0
 * This file is part of Ultra Admin Theme HTML package.
 */


jQuery(function($) {

    'use strict';

    var ULTRA_SETTINGS = window.ULTRA_SETTINGS || {};

    /*--------------------------------
        Chart Js Chart
     --------------------------------*/
    ULTRA_SETTINGS.chartJS = function() {












        /*Radar Chart*/
        var radarChartData = {
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            datasets: [{
                label: "My First dataset",
                fillColor: "rgba(31,181,172,0.4)",
                strokeColor: "rgba(31,181,172,1)",
                pointColor: "rgba(31,181,172,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(31,181,172,1)",
                data: [65, 59, 90, 81, 56, 55, 40]
            }, {
                label: "My Second dataset",
                fillColor: "rgba(153,114,181,0.4)",
                strokeColor: "rgba(153,114,181,1.0)",
                pointColor: "rgba(153,114,181,1.0)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(153,114,181,1.0)",
                data: [28, 48, 40, 19, 96, 27, 100]
            }]
        };

        window.myRadar = new Chart(document.getElementById("radar-chartjs").getContext("2d")).Radar(radarChartData, {
            responsive: true
        });


    };






    /******************************
     initialize respective scripts
     *****************************/
    $(document).ready(function() {});

    $(window).resize(function() {});

    $(window).load(function() {
        ULTRA_SETTINGS.chartJS();
    });

});
