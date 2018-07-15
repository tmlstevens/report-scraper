$(document).ready(function () {

    $.getJSON("/reports", function (data) {

        for (var i = 0; i < data.length; i++) {
            $("#reports").append('<div class="report" data-id="' + data[i]._id + '"><h5><a href="' + data[i].url + '" target="_blank">' + data[i].lake + '</a></h5><p class="m-0">' + data[i].report + '</p><div data-id="' + data[i]._id + '"><button id="' + data[i]._id + '" class="pl-0 accord">Comments</button><div class="acc-div"><form data-id="' + data[i]._id + '"><input class="text-box" type="text" placeholder="Say something..."><input class="submit" type="submit"></form><span data-spanId="' + data[i]._id + '">View Comments</span><div class="comments"></div></div></div></div>');
        };

        var acc = $(".accord");
        for (var i = 0; i < acc.length; i++) {
            $(acc[i]).on("click", function () {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            })
        }
    });




    $(document).on('click', 'span', function() {

        var thisReportId = $(this).attr('data-spanId');
        var thisDiv = $(this).next();
        var comments = $(thisDiv).children();
        console.log(comments.length);
        var commentsArr = [];
        var commentData = [];

        $.getJSON("/comments/" + thisReportId, function(data) {

            var getComments = (function() {
                for (var a = 0; a < data.length; a++) {
                    $(thisDiv).append('<p data-id="' + data[a]._id + '"class="comment-container">' + data[a].commentBody + '</p>');
                    commentData.push(data[a]._id);
                }
                for (var a = 0; a < comments.length; a++) {
                    commentsArr.push(comments[a].attributes[0].nodeValue);
                }
            })();
            console.log(commentsArr);

            // for (var b = 0; b < data.length; b++) {
            //     console.log('hi2');

            //     for (var c = 0; c < commentsArr.length; c++) {
                    
            //         if ( data[b]._id != commentsArr[c] ) {
            //             $(thisDiv).append('<p data-id="' + data[i]._id + '"class="comment-container">' + data[i].commentBody + '</p>');
            //             // commentData.push(data[i]._id)
            //         } else {
            //             console.log('hi')
            //             // b++
            //         }
            //     }
            // };


        })

        // console.log('commentData '+commentData);
        // console.log('commentsArr '+commentsArr);

        // var getComments = (function() {
        //     for (var i = 0; i < data.length; i++) {
        //         $(thisDiv).append('<p data-id="' + data[i]._id + '"class="comment-container">' + data[i].commentBody + '</p>');
        //     }
        // })();
            
    })




    $(document).on("click", ".submit", function () {
        event.preventDefault()
        var thisId = $(this).parent().attr("data-id");

        $.ajax({
            method: "POST",
            url: "/comments/" + thisId,
            data: {
                commentBody: $(".text-box").val()
            }
        })
        .then(function (data) {
            console.log(data);
            $(".text-box").val("")
        })
    });




    
})