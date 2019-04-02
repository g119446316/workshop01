
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


$("#book_category").kendoDropDownList({
    dataTextField: "text",
    dataValueField: "value",
    dataSource: bookCategoryList,
    change: function (e) {
        //  console.log(e);
        console.log(document.getElementById("book_category").value);
        var listvalue = ""
        listvalue = document.getElementById("book_category").value;
        var src = ""
        if (listvalue == 'database') {
            src = bookCategoryList[0]['src']
        }
        if (listvalue == 'internet') {
            src = bookCategoryList[1]['src']
        }
        if (listvalue == 'system') {
            src = bookCategoryList[2]['src']
        }
        if (listvalue == 'home') {
            src = bookCategoryList[3]['src']
        }
        if (listvalue == 'language') {
            src = bookCategoryList[4]['src']
        }
        document.getElementById("book-image").src = src;
    }
});
$("#bought_datepicker").kendoDatePicker({
    culture: "zh-TW",
    format: " yyyy-MM-dd ",
    parseFormats: ["yyyy/MM/dd", "yyyy-MM-dd", "yyyyMMdd"],

});
$("#delivered_datepicker").kendoDatePicker({
    culture: "zh-TW",
    format: " yyyy-MM-dd ",
    parseFormats: ["yyyy/MM/dd", "yyyy-MM-dd", "yyyyMMdd"]
});
$("#book_price").kendoNumericTextBox({
    min: 0,
    format: "n0"
});
$("#book_amount").kendoNumericTextBox({
    min: 0,
    format: "n0"
});
$("#book_price").change(function () {
    var price = document.getElementById("book_price").value;
    var amount = document.getElementById("book_amount").value;
    console.log(price);
    document.getElementById("book_total").innerHTML = price * amount;

});
$("#book_amount").change(function () {
    var price = document.getElementById("book_price").value;
    var amount = document.getElementById("book_amount").value;
    document.getElementById("book_total").innerHTML = price * amount;

});

function book_gird() {
    bookDataFromLocalStorage = JSON.parse(localStorage.getItem('bookData'));
    $("#book_grid").kendoGrid({
        dataSource: {
            type: "json",
            data: bookDataFromLocalStorage,
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
                    width: 100,
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
                    attributes: {
                        style: "text-align: right;"
                    },
                    format: "{0:0,0}"
                }, {
                    field: "BookAmount",
                    title: "數量",
                    attributes: {
                        style: "text-align: right;"
                    },
                    width: 100,

                    //format: "{0:MM/dd/yyyy}"
                },
                {
                    field: "BookTotal",
                    title: "總計",
                    width: 100,
                    attributes: {
                        style: "text-align: right;"
                    },
                    format: "{0:0,00元}"

                }],

    });
}


bookDataFromLocalStorage = JSON.parse(localStorage.getItem('bookData'));
console.log(bookDataFromLocalStorage);
function DeleteButtonIsClicked(e) {
    var tr = $(e.target).closest("tr");
    var data = this.dataItem(tr);
    console.log(data.BookId);

    bookDataFromLocalStorage = JSON.parse(localStorage.getItem('bookData'));
    console.log(bookDataFromLocalStorage);

    kendo.confirm("確定刪除「" + data.BookName + "」 嗎?").then(function () {
        for (i = 0; i < bookDataFromLocalStorage.length; i++) {
            if (bookDataFromLocalStorage[i]['BookId'] == data.BookId) {
                console.log('delete id :' + i);
                bookDataFromLocalStorage.splice(bookDataFromLocalStorage.indexOf(bookDataFromLocalStorage[i]), 1);
                localStorage.setItem('bookData', JSON.stringify(bookDataFromLocalStorage));
                break
            }
        }
        console.log(bookDataFromLocalStorage);
        //$('#book_grid').data('kendoGrid').refresh();
        location.reload();
    });
    


    /*var dataSource = $("#book_grid").data("kendoGrid").dataSource;
    console.log("Details for: " + data.BookId);
    kendo.confirm("確定刪除「" + data.BookName + "」 嗎?").then(function () {
        dataSource.remove(data);
    });
    */

}

$("#ad").kendoWindow({
    title: "新增書籍",
    actions: ["pin", "Minimize", "Maximize", "Close"],
    modal: true,
    width: "500px",
    height: "600px",
    position: {
        top: 100,
        left: "35%"
    },
});

$("#add_book").click(function () {
    var dialog = $("#ad").data("kendoWindow");
    dialog.open();

});

$("#save_book").click(function () {

    bookDataFromLocalStorage = JSON.parse(localStorage.getItem('bookData'));
    bookid = bookDataFromLocalStorage[bookDataFromLocalStorage.length - 1]['BookId'] + 1;
    BookCategory = document.getElementById("book_category").value;
    BookName = document.getElementById("book_name").value;
    BookAuthor = document.getElementById("book_author").value;
    BookBoughtDate = document.getElementById("bought_datepicker").value;
    BookDeliveredDate = document.getElementById("delivered_datepicker").value;
    BookPrice = document.getElementById("book_price").value;
    BookAmount = document.getElementById("book_amount").value;
    BookTotal = BookPrice * BookAmount;
    bookDataFromLocalStorage.push({
        "BookId": bookid,
        "BookCategory": BookCategory,
        "BookName": BookName,
        "BookAuthor": BookAuthor,
        "BookBoughtDate": BookBoughtDate,
        "BookDeliveredDate": BookDeliveredDate,
        "BookPublisher": "公司",
        "BookPrice": BookPrice,
        "BookAmount": BookAmount,
        "BookTotal": BookTotal
    });
    localStorage.setItem('bookData', JSON.stringify(bookDataFromLocalStorage));
    console.log(bookDataFromLocalStorage);

});

$(function () {
    book_gird();
    loadBookData();
    $("#book_form").kendoValidator().data("kendoValidator");

});