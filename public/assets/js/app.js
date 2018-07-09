$(document).ready(function() {

    $.getJSON("/reports", function (data) {
        for (var i = 0; i < data.length; i++) {
            $("#reports").append("<p data-id='" + data[i]._id + "'>" + data[i].lake + "<br />" + data[i].report + "</p>");
        }
    });

    $(document).on("click", "p", function() {
        // Empty the notes from the note section
        $("#notes").empty();
        // Save the id from the p tag
        var thisId = $(this).attr("data-id");

        $.ajax({
            method: "GET",
            url: "/reports/" + thisId
        })
            // With that done, add the note information to the page
        .then(function (data) {
            console.log(data);
            $("#notes").append("<h2>" + data.title + "</h2>");
            // An input to enter a new title
            $("#notes").append("<input id='titleinput' name='title' >");
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            // If there's a note in the article
            if (data.note) {
                $("#titleinput").val(data.note.title);
                $("#bodyinput").val(data.note.body);
            }
        })
    });

    $(document).on("click", "#savenote", function () {
        // Grab the id associated with the article from the submit button
        var thisId = $(this).attr("data-id");

        $.ajax({
            method: "POST",
            url: "/reports/" + thisId,
            data: {
                title: $("#titleinput").val(),
                body: $("#bodyinput").val()
            }
        })
        .then(function (data) {
            console.log(data);
            $("#notes").empty();
        });
        $("#titleinput").val("");
        $("#bodyinput").val("");
    });

})