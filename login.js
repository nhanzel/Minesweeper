//function used to validate the user's login attempt
function validateLogin() {
    var name = document.getElementById("userTB").value;
    var pass = document.getElementById("passTB").value;

    //value to pass with a POST request
    var data = "userName=" + name + "&password=" + pass;

    var myReq = new XMLHttpRequest();

    //false indicates sync, not async
    myReq.open("POST", "INSERT LINK TO USERS/PASSWORDS HERE", false); //rudimentary example for user auth
    myReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    myReq.send(data);

    if (myReq.status === 200) {
	    var response = JSON.parse(myReq.responseText);
        var errorMessage = document.getElementById("loginError");

        //valid login
        if (response["result"] === "valid") {
            window.location.href='index.html';

            //store user info in LocalStorage
            var userInfo = response["userName"] + " " + response["timestamp"];
            SaveUserInfo(userInfo);
        }
        //invalid login
        else if (response["result"] === "invalid") {
            errorMessage.innerHTML = "<p>Logins were incorrect</p>";
        }

    }
    else {
        errorMessage.innerHTML = "<p>Server Error</p>";
    }
}

//Save the user's info if they logged in successfully
function SaveUserInfo(u) {
    localStorage.setItem("cs2550timestamp", u);
}