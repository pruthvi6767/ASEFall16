/**
 * Created by pruthvirajreddy on 9/7/2016.
 */

function getWeather() {
    var city1 = document.getElementById('origin');
    var city2 = document.getElementById('destination');
    localStorage.setItem('origin', city1.value);
    localStorage.setItem('destination', city2.value);
    window.location.href = 'weather.html';

}