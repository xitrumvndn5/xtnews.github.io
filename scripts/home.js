"use strict";

// -------------------------------------------
// ------ĐỊNH NGHĨA CÁC BIẾN TRANG HOME--------
// -------------------------------------------

const btnLogin = document.getElementById("btn-login");
const btnRegister = document.getElementById("btn-register");
const login = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");
let currentUserName;

//--------------------------------
// ----KIỂM TRA ĐĂNG NHẬP---------
// -------------------------------

if (currentUser[0]) {
    for (let i = 0; i < userArr.length; i++) {
        if (userArr[i].userName === currentUser[0]) {
            currentUserName = userArr[i].firstName;
        }
    }
    login.style.display = "none";
    welcomeMessage.textContent = `Welcome ${currentUserName}`;
} else {
    mainContent.style.display = "none";
}

// ---------------------------------------
// --------TẠO EVENT CHO NÚT LOGOUT-------
// ---------------------------------------

btnLogout.addEventListener("click", function () {
    currentUser = [];
    saveToStorage("currentUser", currentUser);
    mainContent.style.display = "none";
    login.style.display = "";
});
