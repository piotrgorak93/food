/**
 * Created by user on 04.01.16.
 */
$(document).ready(function () {
    bindRestaurantSelector();
});

function bindRestaurantSelector() {
    $(".restaurant-selector").change(function () {
        getUsersAjax();
        getMenuAjax($(this).find(":selected").data("restaurant-id"));
    });
}
function getUsersAjax() {
    $.ajax("users/")
        .done(function (response) {
            $(".content").html(response);
        })
}
function getMenuAjax(id) {
    $.ajax("menu/" + id)
        .done(function (response) {
            $(".menu-content").html(response);
            bindFoodSelector();
            bindGoToSummaryButton();
        })
}
function bindFoodSelector() {
    $("input[type=checkbox]").on("click", function () {
        var sum = 0;
        $(this).parent().next().find(".order-sum").html(function () {
            $(this).parent().prev().children(":checked").each(function (index, value) {
                sum += parseFloat($(value).next().html());
            });
            return sum;
        });
    });
}
function goToSummary() {
    var summaryJSON = [{}];
    $(".food-list").each(function (index, value) {
        if ($(value).find(".order-sum").html() != "0") {
        } else {
            //console.log($(value));
            summaryJSON[$(value).find(".user").html()] = $(value).next();
            //console.log(getPickedDishNameByUser($(value)));
            getPickedDishNameByUser($(value));

        }
    });
    //console.log(summaryJSON);
}

function getPickedDishNameByUser(user) {
    console.log(user.children(".menu-content").find(":checked"));
    user.children().find(":checked").each(function (index, value) {
        console.log($(value));
    });
    return 0;
}

function bindGoToSummaryButton() {
    $("#summary-button").on("click", function () {
        goToSummary();
    })
}