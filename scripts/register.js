"use strict";

// -------------------------------------------------------
// -----TẠO HÀM KIỂM TRA TÍNH HỢP LỆ CỦA FORM REGISTER----
// -------------------------------------------------------

function validRegisterForm() {
    let valid = true;

    if (
        !firstNameInput.value ||
        !lastNameInput.value ||
        !userNameInput.value ||
        !passwordInput.value ||
        !passwordConfirmInput.value
    ) {
        alert("Hãy điền đầy đủ thông tin các trường!");
        valid = false;
        return;
    } else if (passwordInput.value !== passwordConfirmInput.value) {
        alert("Password và Confirm Password phải trùng nhau!");
        valid = false;
        return;
    } else if (passwordInput.value.length <= 8) {
        alert("Password phải từ 9 ký tự trở lên!");
        valid = false;
        return;
    }

    for (let i = 0; i < userArr.length; i++) {
        if (userArr[i].userName === userNameInput.value) {
            alert("Tên user đã tồn tại! Xin hãy nhập tên khác!");
            valid = false;
            return;
        }
    }
    return valid;
}

// --------------------------------------
// -----TẠO HÀM RESET FORM REGISTER------
// --------------------------------------

function clearRegisterForm() {
    firstNameInput.value = "";
    lastNameInput.value = "";
    userNameInput.value = "";
    passwordInput.value = "";
}

// --------------------------------------
// -----TẠO SỰ KIỆN LÊN NÚT REGISTER-----
// --------------------------------------

submitbtn.addEventListener("click", function () {
    if (validRegisterForm()) {
        alert("Bạn đã đăng ký thành công!");

        const newUser = new User(
            firstNameInput.value,
            lastNameInput.value,
            userNameInput.value,
            passwordInput.value
        );

        userArr.push(newUser);

        saveToStorage("userArr", userArr);
        clearRegisterForm();

        window.location.href = "../pages/login.html";
    }
    userAndPassArr = userArr.map((user) => {
        return {
            userName: user.userName,
            password: user.password,
        };
    });

    userUserArr = userArr.map((user) => {
        return user.userName;
    });

    saveToStorage("userAndPassArr", userAndPassArr);
    saveToStorage("userUserArr", userUserArr);
});
