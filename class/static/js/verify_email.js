/*
    Created by: Javier Díaz.
    https://javier.ie
*/

function verify(username, token) {
    $.ajax({
        type: "POST",
        url: "/api/verify",
        data: JSON.stringify({
            username: username,
            token: token
        }),
        success: function(data) {
            if (data == "success") {
                $("#signup-error").removeClass().addClass("right");
                $("#signup-error").html("Email verified! Please login.");
            } else {
                $("#signup-error").removeClass().addClass("error");
                $("#signup-error").html(data);
            }
        }
    });
}