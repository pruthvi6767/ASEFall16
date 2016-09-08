/**
 * Created by pruthvirajreddy on 9/6/2016.
 */
// storing input from register-form

window.onload = function () {
    document.getElementById("inputPassword").onchange = validatePassword;
    document.getElementById("inputPassword1").onchange = validatePassword;
}
function validatePassword(){
    var pass2=document.getElementById("inputPassword").value;
    var pass1=document.getElementById("inputPassword1").value;
    if(pass1!=pass2)
        document.getElementById("inputPassword1").setCustomValidity("Passwords Don't Match");
    else
        document.getElementById("inputPassword1").setCustomValidity('');
//empty string means no validation error
}
function store() {
    var name1 = document.getElementById('inputEmail');
    var pw1 = document.getElementById('inputPassword');
    localStorage.setItem('email', name1.value);
    localStorage.setItem('password', pw1.value);
}
//Check Login validation
function check() {

    // stored data from the register-form
    var storedName = localStorage.getItem('email');
    var storedPw = localStorage.getItem('password');

    // entered data from the login-form
    var userName = document.getElementById('Email').value;
    var userPw = document.getElementById('Password').value;
    if (userName != null && userPw != null) {
        // check if stored data from register-form is equal to data from login form
        if (userName!= storedName || userPw != storedPw) {
            alert('ERROR');
        } else {
            alert('You are loged in. Click Ok for Dashboard');
        }
    }
}