"use strict";

// -----------------------------------------------
// ----ĐỊNH NGHĨA MỘT SỐ BIẾN CHO TRANG SEARCH----
// -----------------------------------------------

const searchInput = document.getElementById("input-query");
const searchKey = searchInput.value;
let urlSearch;
let dataSearch = JSON.parse(localStorage.getItem("dataSearch")) ?? [];
const searchContent = document.getElementById("search-container");
const submitSearchbtn = document.getElementById("btn-submit");
const liSearch = document.querySelector(".page-item");
const nextbtnSearch = document.getElementById("btn-next");
const prevbtnSearch = document.getElementById("btn-prev");
let firstIndex = 0;
let lastIndex = 5;
const diffIndex = lastIndex - firstIndex + 1;
let firstPage = 1;
let lastPage = 5;
let currentAction = 1;
let countPage = 1;
let groupSearchPageArr = [];
let pageSize = 6;
let pageItemArr;

// ---------------------------------------------------------
// -------TẠO HÀM LƯU DỮ LIỆU SEARCH XUỐNG LOCALSTORAGE-----
// ---------------------------------------------------------

async function getSearchData() {
    const data = await fetch(urlSearch).then((response) => response.json());
    const dataSearch = data.articles;
    saveToStorage("dataSearch", dataSearch);
    return dataSearch;
}

// ------------------------------------------------
//------TẠO HÀM KIỂM TRA TÍNH HỢP LỆ KHI SEARCH----
// ------------------------------------------------

function validSearch() {
    let valid = true;
    if (!searchInput.value) {
        alert("Bạn hãy nhập thông tin cần tìm!");
        valid = false;
    }
    return valid;
}

// -----------------------------------------------
// -----TẠO SỰ KIỆN CLICK LÊN BUTTON SEARCH-------
// -----------------------------------------------

submitSearchbtn.addEventListener("click", function () {
    urlSearch = `https://newsapi.org/v2/everything?q=${searchInput.value}&apiKey=3848913a43714e1d9ce3bd1265616308`;

    if (validSearch()) {
        getSearchData();
        setTimeout(function () {
            location.reload();
        }, 1000);
    }
});

// ------------------------------------------------
// ----TẠO MẢNG CHIA NHÓM CHO THANH ĐIỀU HƯỚNG-----
// ------------------------------------------------

for (let i = 0; i < dataSearch.length; i += pageSize) {
    const themeSearch = dataSearch.slice(i, i + pageSize);
    groupSearchPageArr.push(themeSearch);
}

// ----------------------------------------------------------------
// ---TẠO HÀM HIỂN THỊ CÁC NÚT THANH ĐIỀU HƯỚNG TRANG SEARCH-------
// ----------------------------------------------------------------

function addPageSearch() {
    let html = "";

    if (groupSearchPageArr.length >= 5) {
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
    } else if (groupSearchPageArr.length > 1 && groupSearchPageArr.length < 3) {
        for (let i = firstPage; i <= groupSearchPageArr.length; i++) {
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
        prevbtnSearch.style.display = "none";
        nextbtnSearch.style.display = "none";
    }
    liSearch.insertAdjacentHTML("afterend", html);
    // }
}

addPageSearch();

// --------------------------------------------------
// -----TẠO HÀM HIỂN THỊ CÁC TRANG VỪA SEARCH--------
// --------------------------------------------------

function addSearch() {
    let html = "";
    for (let i = firstIndex; i <= lastIndex && i < dataSearch.length; i++) {
        html += `<div class="card flex-row flex-wrap">
<div class="card mb-3" style="">
    <div class="row no-gutters">
        <div class="col-md-4">
            <img src="${
                dataSearch[i].urlToImage ? dataSearch[i].urlToImage : ""
            }"
                class="card-img"
                alt="${
                    dataSearch[i].description
                        ? dataSearch[i].description
                        : "No Image! This canbe link to the video!"
                }">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">"${dataSearch[i].title}"</h5>
                <p class="card-text">"${dataSearch[i].content}"</p>
                <a href="${dataSearch[i].url}"
                    class="btn btn-primary" target="_blank">View</a>
            </div>
        </div>
    </div>
</div>
</div>`;
    }

    searchContent.insertAdjacentHTML("beforeend", html);
}

addSearch();

// --------------------------------------
// ----TẠO SỰ KIỆN LÊN BUTTON NEXT-------
// --------------------------------------

nextbtnSearch.addEventListener("click", function () {
    const pageItemAll = document.querySelectorAll(".page-item");

    while (searchContent.firstChild) {
        searchContent.removeChild(searchContent.firstChild);
    }

    if (countPage < groupSearchPageArr.length) {
        firstIndex += diffIndex;
        lastIndex += diffIndex;
        countPage += 1;
    }

    if (lastPage < groupSearchPageArr.length) {
        firstPage += 1;
        lastPage += 1;
    }

    if (countPage === groupSearchPageArr.length) {
        nextbtnSearch.style.display = "none";
    }

    for (let i = 1; i < pageItemAll.length - 1; i++) {
        pageItemAll[i].remove();
    }

    addSearch();
    addPageSearch();

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

    prevbtnSearch.removeAttribute("style");
});

// ----------------------------------------------
// -----TẠO SỰ KIỆN LÊN BUTTON PREVIOUS----------
// ----------------------------------------------

prevbtnSearch.addEventListener("click", function () {
    const pageItemAll = document.querySelectorAll(".page-item");

    const pageItem1 = parseInt(
        document.getElementById(`page${firstPage}`).textContent
    );
    const pageItem2 = parseInt(
        document.getElementById(`page${firstPage + 1}`).textContent
    );

    if (groupSearchPageArr.length >= 5) {
        const pageItem3 = parseInt(
            document.getElementById(`page${firstPage + 2}`).textContent
        );
        const pageItem4 = parseInt(
            document.getElementById(`page${firstPage + 3}`).textContent
        );
        const pageItem5 = parseInt(
            document.getElementById(`page${firstPage + 4}`).textContent
        );
        pageItemArr = [pageItem1, pageItem2, pageItem3, pageItem4, pageItem5];
    } else {
        pageItemArr = [pageItem1, pageItem2];
    }

    const maxPageItemArr = Math.max(...pageItemArr);

    while (searchContent.firstChild) {
        searchContent.removeChild(searchContent.firstChild);
    }

    prevbtnSearch.removeAttribute("style");

    if (firstIndex >= diffIndex) {
        firstIndex -= diffIndex;
        lastIndex -= diffIndex;
    }
    if (countPage >= 1) {
        countPage -= 1;
    }
    if (firstPage > 1 && countPage < lastPage - 1) {
        firstPage -= 1;
        lastPage -= 1;
    }

    if (countPage === 1) {
        prevbtnSearch.style.display = "none";
    }

    if (countPage < maxPageItemArr) {
        nextbtnSearch.style.display = "";
    }

    for (let i = 1; i < pageItemAll.length - 1; i++) {
        pageItemAll[i].remove();
    }

    addSearch();
    addPageSearch();

    const pageAction = document.getElementById(`page${countPage}`);
    const removeAction = document.getElementById(`page${countPage + 1}`);

    if (document.getElementById("page1")) {
        document.getElementById("page1").classList.remove("current-page");
        pageAction.classList.add("current-page");
    } else if (removeAction) {
        pageAction.classList.add("current-page");
        removeAction.classList.remove("current-page");
    } else {
        pageAction.classList.add("current-page");
    }
    if (groupSearchPageArr.length >= 5) {
        const pageItem3 = parseInt(
            document.getElementById(`page${firstPage + 2}`).textContent
        );
        const pageItem4 = parseInt(
            document.getElementById(`page${firstPage + 3}`).textContent
        );
        const pageItem5 = parseInt(
            document.getElementById(`page${firstPage + 4}`).textContent
        );
        pageItemArr = [pageItem1, pageItem2, pageItem3, pageItem4, pageItem5];
    } else {
        pageItemArr = [pageItem1, pageItem2];
    }
});

// -----------------------------------------------------------------------
// -----TẠO HÀM KHI CLICK VÀO CÁC BUTTON SỐ TRÊN THANH ĐIỀU HƯỚNG---------
// -----------------------------------------------------------------------

function clickPage(numPage) {
    const pageItemAll = document.querySelectorAll(".page-item");

    while (searchContent.firstChild) {
        searchContent.removeChild(searchContent.firstChild);
    }

    for (let i = 1; i < pageItemAll.length - 1; i++) {
        pageItemAll[i].remove();
    }

    if (numPage > 0 && numPage <= groupSearchPageArr.length) {
        firstIndex = (numPage - 1) * diffIndex;
        lastIndex = firstIndex + diffIndex - 1;
        countPage = numPage;
    }

    addSearch();
    addPageSearch();

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

    prevbtnSearch.removeAttribute("style");

    if (countPage === 1) {
        prevbtnSearch.style.display = "none";
        nextbtnSearch.removeAttribute("style");
    } else if (countPage === groupSearchPageArr.length) {
        nextbtnSearch.style.display = "none";
        prevbtnSearch.removeAttribute("style");
    } else {
        nextbtnSearch.removeAttribute("style");
        prevbtnSearch.removeAttribute("style");
    }
}
