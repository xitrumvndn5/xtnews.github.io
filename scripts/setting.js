"use strict";

const pageSizeInput = document.getElementById("input-page-size");
const categoryInput = document.getElementById("input-category");

// ---------------------------------------------
// ----TẠO HÀM KIỂM TRA FORM NHẬP SETTING-------
// ---------------------------------------------

function validSetting() {
    let valid = true;
    if (!pageSizeInput.value) {
        alert("Hãy nhập số lượng tin tức trên một trang!");
        valid = false;
        return;
    } else if (!parseInt(pageSizeInput.value)) {
        alert("Số trang là một số nguyên dương!");
        valid = false;
        return;
    } else if (parseInt(pageSizeInput.value) < 1) {
        alert("Số trang là một số nguyên dương!");
        valid = false;
        return;
    }
    return valid;
}

// -----------------------------------------------
// -----TẠO HÀM HIỂN THỊ THIẾT LẬP HIỆN TẠI-------
// -----------------------------------------------

function currentSetting() {
    pageSizeInput.value = settingArr[0] + 1;
    categoryInput.value = settingArr[1];
}

currentSetting();

// ------------------------------------------------
// -----TẠO SỰ KIỆN LÊN BUTTON SUBMIT SETTING------
// ------------------------------------------------

submitbtn.addEventListener("click", async function () {
    if (validSetting()) {
        settingArr = [];
        settingArr.push(parseInt(pageSizeInput.value) - 1);
        settingArr.push(categoryInput.value);
        saveToStorage("settingArr", settingArr);
        alert(
            `Bạn đã thiết lập: Category là ${categoryInput.value} và ${pageSizeInput.value} tin tức trên một trang.`
        );
    }
    await loadData();

    setTimeout(function () {
        location.reload();
    }, 200);
});
