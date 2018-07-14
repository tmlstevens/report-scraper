$(document).ready(function () {

    $.getJSON("/reports", function (data) {

        for (var i = 0; i < data.length; i++) {
            $("#reports").append('<div class="report" data-id="' + data[i]._id + '"><h5><a href="' + data[i].url + '" target="_blank">' + data[i].lake + '</a></h5><p class="m-0">' + data[i].report + '</p><div data-id="' + data[i]._id + '"><button class="pl-0 accord">View Comments</button><div class="acc-div"><form data-id="'+ data[i]._id + '"><input class="text-box" type=text placeholder="comment on this report""><input class="submit" type="submit"></div></div><div id="cmt' + data[i]._id + '"></div></div>');
        };

        var acc = document.getElementsByClassName("accord");
        var i;
        // for (i = 0; i < acc.length; i++) {
            $('.accord').on("click", function () {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                };
                var reportId = $(this).parent().attr("data-id");
                // console.log(reportId);

                $.ajax({
                    method: 'GET',
                    url: '/comments/' + reportId
                })
                .then(function(commentData){

                    for (var i = 0; i < commentData.length; i++) {
                        
                        $('cmt' + data[i]._id).append("<p>" + commentData[i].commentBody + "</p>")


                        // var commentsDiv = $('.comments');
                        // var comment = commentData[i].commentBody;
                        // var P = $("<p>");
                        // var commentP = P.append(comment);
                        // commentsDiv.append(commentP);
                        // console.log(comment)

                    }
                    // console.log(commentData)
                
                });

            })
        // }
    });

    // $(document).on("click", "p", function () {
    //     // Empty the notes from the note section
    //     $("#notes").empty();
    //     // Save the id from the p tag
    //     var thisId = $(this).attr("data-id");

    //     $.ajax({
    //         method: "GET",
    //         url: "/reports/" + thisId
    //     })
    //         // With that done, add the note information to the page
    //         .then(function (data) {
    //             console.log(data);
    //             $("#notes").append("<h2>" + data.title + "</h2>");
    //             // An input to enter a new title
    //             $("#notes").append("<input id='titleinput' name='title' >");
    //             $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
    //             // A button to submit a new note, with the id of the article saved to it
    //             $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

    //             // If there's a note in the article
    //             if (data.note) {
    //                 $("#titleinput").val(data.note.title);
    //                 $("#bodyinput").val(data.note.body);
    //             }
    //         })
    // });

    $(document).on("click", ".submit", function () {
        event.preventDefault()
        var thisId = $(this).parent().attr("data-id");
        // console.log(thisId);

        $.ajax({
            method: "POST",
            url: "/comments/" + thisId,
            data: {
                commentBody: $(".text-box").val()
            }
        })
        .then(function (data) {
            console.log(data);
            // $("input").empty();
            $(".text-box").val("")
        });
    });

    // $(document).on("click", "#savenote", function () {
    //     // Grab the id associated with the article from the submit button
    //     var thisId = $(this).attr("data-id");

    //     $.ajax({
    //         method: "POST",
    //         url: "/reports/" + thisId,
    //         data: {
    //             title: $("#titleinput").val(),
    //             body: $("#bodyinput").val()
    //         }
    //     })
    //         .then(function (data) {
    //             console.log(data);
    //             $("#notes").empty();
    //         });
    //     $("#titleinput").val("");
    //     $("#bodyinput").val("");
    // });



})