"use strict";

// --------------------------------------------
// ------ĐỊNH NGHĨA MỘT SỐ BIẾN TRANG NEWS-----
// --------------------------------------------

const newsContainer = document.getElementById("news-container");
const li1 = document.querySelector(".page-item");
const nextbtn = document.getElementById("btn-next");
const prevbtn = document.getElementById("btn-prev");
let firstIndex = 0;
let lastIndex = parseInt(settingArr[0]);
const diffIndex = lastIndex - firstIndex + 1;
let firstPage = 1;
let lastPage = 3;
let currentAction = 1;
let countPage = 1;
let curentPagesArr = [];
let groupPageArr = [];
let pageSize = settingArr[0] + 1;
let pageItemArr;

// -------------------------------------------------
// -----TẠO MẢNG CHỨA CÁC NHÓM TRANG TIN TỨC--------
// -------------------------------------------------

for (let i = 0; i < data.articles.length; i += pageSize) {
    const theme = data.articles.slice(i, i + pageSize);
    groupPageArr.push(theme);
}

// --------------------------------------
// ------TẠO HÀM THÊM TRANG TIN TỨC------
// --------------------------------------

function addNews() {
    let html = "";
    for (let i = firstIndex; i <= lastIndex && i < data.articles.length; i++) {
        html += `<div class="card flex-row flex-wrap">
        <div class="card mb-3" style="">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${
                        data.articles[i].urlToImage
                            ? data.articles[i].urlToImage
                            : ""
                    }"
                        class="card-img"
                        alt="${
                            data.articles[i].description
                                ? data.articles[i].description
                                : "No Image! This canbe link to the video!"
                        }">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">"${data.articles[i].title}"</h5>
                        <p class="card-text">"${data.articles[i].content}"</p>
                        <a href="${data.articles[i].url}"
                            class="btn btn-primary" target="_blank">View</a>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    }
    newsContainer.insertAdjacentHTML("beforeend", html);
}

// -----------------------------------------------
// ------TẠO HÀM THANH ĐIỀU HƯỚNG PHÂN TRANG------
// -----------------------------------------------

function addPages() {
    let html = "";

    if (groupPageArr.length >= 3) {
        for (let i = firstPage; i <= lastPage; i++) {
            if (i === 1) {
                html += `
        <li class="page-item">
                            <a class="page-link current-page" id="page${i}" href="#" onclick=clickPage(${i})>${i}</a>
                        </li>
        `;
            } else {
                html += `
        <li class="page-item">
                            <a class="page-link" id="page${i}" href="#" onclick=clickPage(${i})>${i}</a>
                        </li>
        `;
            }
        }
    } else if (groupPageArr.length > 1 && groupPageArr.length < 3) {
        for (let i = firstPage; i <= groupPageArr.length; i++) {
            if (i === 1) {
                html += `
        <li class="page-item">
                            <a class="page-link current-page" id="page${i}" href="#" onclick=clickPage(${i})>${i}</a>
                        </li>
        `;
            } else {
                html += `
        <li class="page-item">
                            <a class="page-link" id="page${i}" href="#" onclick=clickPage(${i})>${i}</a>
                        </li>
        `;
            }
        }
    } else {
        prevbtn.style.display = "none";
        nextbtn.style.display = "none";
    }
    li1.insertAdjacentHTML("afterend", html);
}

// -------------------------------------------------------------------
// -----TẠO HÀM KHI CLICK VÀO CÁC SỐ TRANG TRÊN THANH ĐIỀU HƯỚNG------
// -------------------------------------------------------------------

function clickPage(numPage) {
    const pageItemAll = document.querySelectorAll(".page-item");

    while (newsContainer.firstChild) {
        newsContainer.removeChild(newsContainer.firstChild);
    }

    for (let i = 1; i < pageItemAll.length - 1; i++) {
        pageItemAll[i].remove();
    }

    if (numPage > 0 && numPage <= groupPageArr.length) {
        firstIndex = (numPage - 1) * diffIndex;
        lastIndex = firstIndex + diffIndex - 1;
        countPage = numPage;
    }

    addNews();
    addPages();

    const pageAction = document.getElementById(`page${countPage}`);
    const removeAction = document.getElementById(`page${countPage - 1}`);

    if (document.getElementById("page1")) {
        document.getElementById("page1").classList.remove("current-page");
        pageAction.classList.add("current-page");
    } else if (removeAction) {
        pageAction.classList.add("current-page");
        removeAction.classList.remove("current-page");
    } else {
        pageAction.classList.add("current-page");
    }

    prevbtn.removeAttribute("style");
    console.log("count Pages", countPage);
    if (countPage === 1) {
        prevbtn.style.display = "none";
        nextbtn.removeAttribute("style");
    } else if (countPage === groupPageArr.length) {
        nextbtn.style.display = "none";
        prevbtn.removeAttribute("style");
    } else {
        nextbtn.removeAttribute("style");
        prevbtn.removeAttribute("style");
    }
}

addNews();
addPages();
prevbtn.style.display = "none";

// -----------------------------------------
// ----TẠO SỰ KIỆN CLICK LÊN NÚT NEXT-------
// -----------------------------------------

nextbtn.addEventListener("click", function () {
    const pageItemAll = document.querySelectorAll(".page-item");

    while (newsContainer.firstChild) {
        newsContainer.removeChild(newsContainer.firstChild);
    }

    if (countPage < groupPageArr.length) {
        firstIndex += diffIndex;
        lastIndex += diffIndex;
        countPage += 1;
    }

    if (lastPage < groupPageArr.length) {
        firstPage += 1;
        lastPage += 1;
    }

    if (countPage === groupPageArr.length) {
        nextbtn.style.display = "none";
    }

    for (let i = 1; i < pageItemAll.length - 1; i++) {
        pageItemAll[i].remove();
    }

    addNews();
    addPages();

    const pageAction = document.getElementById(`page${countPage}`);
    const removeAction = document.getElementById(`page${countPage - 1}`);

    console.log("Page Action Next Page", pageAction);
    console.log("Remove Action Next Page", removeAction);
    console.log("Count Page Next Page", countPage);
    console.log("last Page Next Page", lastPage);

    if (document.getElementById("page1")) {
        document.getElementById("page1").classList.remove("current-page");
        pageAction.classList.add("current-page");
    } else if (removeAction) {
        pageAction.classList.add("current-page");
        removeAction.classList.remove("current-page");
    } else {
        pageAction.classList.add("current-page");
    }

    prevbtn.removeAttribute("style");

    const pageItem1 = parseInt(
        document.getElementById(`page${firstPage}`).textContent
    );
    const pageItem2 = parseInt(
        document.getElementById(`page${firstPage + 1}`).textContent
    );
    if (document.getElementById(`page${firstPage + 2}`)) {
        const pageItem3 = parseInt(
            document.getElementById(`page${firstPage + 2}`).textContent
        );
    }
});

// ---------------------------------------------
// -----TẠO SỰ KIỆN CLICK LÊN NÚT PREVIOUS------
// ---------------------------------------------

prevbtn.addEventListener("click", function () {
    const pageItemAll = document.querySelectorAll(".page-item");

    const pageItem1 = parseInt(
        document.getElementById(`page${firstPage}`).textContent
    );
    const pageItem2 = parseInt(
        document.getElementById(`page${firstPage + 1}`).textContent
    );

    let countPageThemePrev = countPage + 1;

    if (groupPageArr.length >= 3) {
        const pageItem3 = parseInt(
            document.getElementById(`page${firstPage + 2}`).textContent
        );
        pageItemArr = [pageItem1, pageItem2, pageItem3];
    } else {
        pageItemArr = [pageItem1, pageItem2];
    }

    const maxPageItemArr = Math.max(...pageItemArr);

    while (newsContainer.firstChild) {
        newsContainer.removeChild(newsContainer.firstChild);
    }

    prevbtn.removeAttribute("style");

    if (firstIndex >= diffIndex) {
        firstIndex -= diffIndex;
        lastIndex -= diffIndex;
    }
    if (countPage >= 1) {
        countPage -= 1;
    }

    console.log("count Page Previous", countPage);

    if (firstPage > 1 && countPage < lastPage - 1) {
        firstPage -= 1;
        lastPage -= 1;
    }

    console.log("First Page Previous", firstPage);
    console.log("Last Page Privious", lastPage);

    if (countPage === 1) {
        prevbtn.style.display = "none";
    }

    if (countPage < maxPageItemArr) {
        nextbtn.style.display = "";
    }

    for (let i = 1; i < pageItemAll.length - 1; i++) {
        pageItemAll[i].remove();
    }

    addNews();
    addPages();

    const pageAction = document.getElementById(`page${countPage}`);
    const removeAction = document.getElementById(`page${countPage + 1}`);

    console.log("Page Action", pageAction);
    console.log("Remove Action", removeAction);
    console.log("Count Page", countPage);
    console.log("Count Page Theme Previous", countPageThemePrev);
    console.log("last Page", lastPage);

    if (document.getElementById("page1")) {
        document.getElementById("page1").classList.remove("current-page");
        pageAction.classList.add("current-page");
    } else if (removeAction) {
        pageAction.classList.add("current-page");
        removeAction.classList.remove("current-page");
    } else {
        pageAction.classList.add("current-page");
    }
    if (groupPageArr.length >= 3) {
        const pageItem3 = parseInt(
            document.getElementById(`page${firstPage + 2}`).textContent
        );
        pageItemArr = [pageItem1, pageItem2, pageItem3];
    } else {
        pageItemArr = [pageItem1, pageItem2];
    }
});
