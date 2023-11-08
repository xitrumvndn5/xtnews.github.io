"use strict";

// ------------------------
// ----TẠO CLASS USER--------
// ------------------------
class User {
    constructor(firstName, lastName, userName, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
    }
}

// ----------------------------------
// ------ĐỊNH NGHĨA CÁC BIÉN---------
// ----------------------------------

const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const userNameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const passwordConfirmInput = document.getElementById("input-password-confirm");
const submitbtn = document.getElementById("btn-submit");
