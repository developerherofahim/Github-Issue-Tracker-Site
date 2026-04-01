const logInButton = document.getElementById("login_btn");

logInButton.addEventListener("click", function(){
    const username = document.getElementById("login_username").value;
    const password = document.getElementById("login_password").value;

    if(username == "admin" && password == "admin123") {
        alert("Log In Successfully")
        window.location.href = "./main.html";
    }
    else{
        alert("Invalid Credential")
        return;
    }
})