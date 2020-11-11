//Load the next page

$(document).ready( function() {
    $("#load_home").on("click", function() {
        $("#content").load("content.html");
    });
});