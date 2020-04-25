$(document).ready(function () {
  setTimeout(function () {
    $("#loader").animate(
      {
        left: "+=100vw",
      },
      1500,
      function () {
        $("#loader").hide();
      }
    );
  }, 500);

  // $('#loader').hide();
  $(".links").click(function (e) {
    e.preventDefault();
    var href = $(this).attr("href");
    $("#loader").css({ left: "-100vw" }).show();
    // $('#loader').fadeIn("slow");

    $("#loader").animate(
      {
        left: "+=100vw",
      },
      1500,
      function () {
        window.location.href = href;
      }
    );
  });
});
