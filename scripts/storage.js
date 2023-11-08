"use strict";

// ---------------------------------
// -----ĐỊNH NGHĨA CÁC BIẾN-------
// --------------------------------

let apiKey = "3848913a43714e1d9ce3bd1265616308";
let userArr = JSON.parse(localStorage.getItem("userArr")) ?? [];
let userAndPassArr = JSON.parse(localStorage.getItem("userAndPassArr")) ?? [];
let userUserArr = JSON.parse(localStorage.getItem("userUserArr")) ?? [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) ?? [];
let data = JSON.parse(localStorage.getItem("data")) ?? [];
let settingArr = JSON.parse(localStorage.getItem("settingArr")) ?? [
    4,
    "science",
];
let getUrl = url("us", `${settingArr[1]}`);

//us-ua-eg-fr-ch-cn

// -------------------------------------------------
// --------TẠO HÀM TRONG SETTING -------------------
// -----(một số mã quốc gia: us-ua-eg-fr-ch-cn)-----
// -------------------------------------------------

function url(country, catagory) {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${catagory}&apiKey=3848913a43714e1d9ce3bd1265616308`;

    return url;
}

// ------------------------------------------------
// --------TẠO HÀM LẤY API VÀ LƯU LOCALSTORAGE------
// ------------------------------------------------

async function loadData() {
    const data = await fetch(getUrl).then((response) => response.json());
    saveToStorage("data", data);
    return data;
}
loadData();

// ---------------------------------------------
// -------TẠO HÀM LƯU VÀO LOCALSTORAGE----------
// --------------------------------------------

function saveToStorage(arrName, arr) {
    localStorage.setItem(arrName, JSON.stringify(arr));
}
