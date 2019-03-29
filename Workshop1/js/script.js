
var bookDataFromLocalStorage = [];
var bookCategoryList = [
    { text: "資料庫", value: "database", src: "image/database.jpg" },
    { text: "網際網路", value: "internet", src: "image/internet.jpg" },
    { text: "應用系統整合", value: "system", src: "image/system.jpg" },
    { text: "家庭保健", value: "home", src: "image/home.jpg" },
    { text: "語言", value: "language", src: "image/language.jpg" }
];

// 載入書籍資料
function loadBookData() {
    bookDataFromLocalStorage = JSON.parse(localStorage.getItem('bookData'));
    if (bookDataFromLocalStorage == null) {
        bookDataFromLocalStorage = bookData;
        localStorage.setItem('bookData', JSON.stringify(bookDataFromLocalStorage));
    }
}

function book_gird() {
    $("#book_grid").kendoGrid({
        dataSource: {
            type: "json",
            data: bookData,
            pageSize: 20,
        },
        height: 550,
        pageable: true,
        columns:
            [
                { command: { text: "刪除", click: DeleteButtonIsClicked } },
                {
                    field: "BookId",
                    title: "書籍編號",
                    width: 80,
                },
                {
                    field: "BookName",
                    title: "書籍名稱",

                    width: 200,
                },
                {
                    field: "BookCategory",
                    title: "書籍種類",
                    width: 100,
                },

                {
                    field: "BookAuthor",
                    title: "作者",
                    width: 130,
                },
                {
                    field: "BookBoughtDate",
                    title: "購買日期",
                    format: "{0:yyyy-MM-dd}",
                    width: 100
                },
                {
                    field: "a",
                    title: "送達狀態",
                    width: 100,
                },
                {
                    field: "BookPrice",
                    title: "金額",
                    width: 100,
                    format: "{0:0,0}"
                }, {
                    field: "BookAmount",
                    title: "數量",
                    width: 100,

                    //format: "{0:MM/dd/yyyy}"
                },
                {
                    field: "BookTotal",
                    title: "總計",
                    width: 100,
                    format: "{0:0,00元}"

                }],

    });
}

function DeleteButtonIsClicked(e) {
    var tr = $(e.target).closest("tr"); // get the current table row (tr)
    var data = this.dataItem(tr);
    var dataSource = $("#book_grid").data("kendoGrid").dataSource;
    console.log("Details for: " + data.BookId);
    kendo.confirm("確定刪除「" + data.BookName + "」 嗎?").then(function () {
        dataSource.remove(data);
    });
}

function form() {
$("#add_book").click(function () {   
    $("#ad").kendoWindow({
        title: "新增書籍",
        actions: ["pin", "Minimize", "Maximize", "Close"],
        modal: true,
        width: "500px",
        height: "602px",        
        position: {
            top: 100,
            left: "35%"
        },
        close:onClose

    });
    
   
});
}


$(function () {
    book_gird();
    loadBookData();
    form();
    
});