$(function () {
  $(".dropdown-menu a").click(function () {
    $("#dropdownMenuButton").text($(this).text()).val($(this).text());
  });
});
