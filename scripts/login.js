"use strict";

// -----------------------------------
// -----TẠO RESET CHO LOGIN FORM------
// -----------------------------------

function clearLoginForm() {
    userNameInput.value = "";
    passwordInput.value = "";
}

// ------------------------------------------
// ----TẠO HÀM KIỂM TRA DỮ LIỆU LOGIN--------
// ------------------------------------------

function validLoginForm() {
    let valid = true;
    if (!userNameInput.value || !passwordInput.value) {
        alert("Hãy nhập đầy đủ thông tin!");
        valid = false;
        return;
    } else if (!userUserArr.includes(userNameInput.value)) {
        alert("Username không tồn tại! Hãy đăng ký trước!");
        valid = false;
    }

    for (let i = 0; i < userArr.length; i++) {
        if (
            userArr[i].userName === userNameInput.value &&
            userArr[i].password !== passwordInput.value
        ) {
            alert("Password không đúng! Hãy nhập lại!");
            valid = false;
            return;
        }
    }

    return valid;
}

// -----------------------------------------------
// ----TẠO SỰ KIỆN CLICK LÊN BUTTON LOGIN---------
// -----------------------------------------------

submitbtn.addEventListener("click", function () {
    if (validLoginForm()) {
        currentUser = [];
        currentUser[0] = userNameInput.value;
        currentUser[1] = passwordInput.value;
        console.log(currentUser);
        saveToStorage("currentUser", currentUser);
        console.log("Login OK");
        clearLoginForm();
        window.location.href = "../index.html";
    }
});
