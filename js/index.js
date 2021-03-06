let RAND_1 = 50;
let RAND_2 = 70;
let ROW_NUMBER = 20;
let COL_NUMBER = 20;
$().ready(function () {});
let Current_Algorithm = "";
let START_X, START_Y, END_X, END_Y;
$(function () {
  $(".dropdown-menu a").click(function () {
    let item_selected = $(this).text();
    Current_Algorithm = item_selected;
    $("#dropdownMenuButton").text(item_selected).val(item_selected);
  });
});
let result;
let q = [];
$("#new_game").click(function () {
  random_bit_array = create_random_bit_array();
  do_coloring(random_bit_array);
});
$("#show_result").click(function () {
  if (Current_Algorithm === "") {
    alert("Please select one of Algorithms!");
    return;
  }
  $("html,body").animate(
    {
      scrollTop: $("#faq").offset().top + 60,
    },
    "slow"
  );

  if (Current_Algorithm == "Breadth First") {
    let new_arr = [];
    for (let i = 0; i < random_bit_array.length; i++)
      new_arr[i] = random_bit_array[i].slice();
    result = Breadth_First(new_arr, START_X, START_Y, END_X, END_Y);
    console.log(random_bit_array);
  } else if (Current_Algorithm === "Iterative Deepening") {
    let new_arr = [];
    for (let i = 0; i < random_bit_array.length; i++)
      new_arr[i] = random_bit_array[i].slice();
    result = Iterative_Deepening(new_arr, START_X, START_Y, END_X, END_Y);
  } else if (Current_Algorithm === "A Star") {
    let new_arr = [];
    for (let i = 0; i < random_bit_array.length; i++)
      new_arr[i] = random_bit_array[i].slice();
    result = A_Star(new_arr, START_X, START_Y, END_X, END_Y);
  }
  do_coloring(result.array);
  show_answer(result);
});

let big_square = document.getElementById("my_square");
let table_td, table_tr;
for (let i = ROW_NUMBER - 1; i >= 0; i--) {
  table_tr = document.createElement("div");
  table_tr.className = "div-tr";
  big_square.appendChild(table_tr);
  table_tr.id = `tr${i}}`;

  for (let j = 0; j < COL_NUMBER; j++) {
    table_td = document.createElement("div");
    table_td.className = "square";
    table_tr.appendChild(table_td);
    table_td.id = `x${j}y${i}`;
  }
}

let random_bit_array = create_random_bit_array();
do_coloring(random_bit_array);

function Random(n) {
  return Math.floor(Math.random() * 1000) % n;
}
function create_random_bit_array() {
  let arr = [];
  let fill_cell_number = Random(RAND_1) + RAND_2;
  for (let i = 0; i < COL_NUMBER; i++) {
    arr[i] = [];
    for (let j = 0; j < COL_NUMBER; j++) {
      arr[i][j] = 0;
    }
  }
  while (fill_cell_number > 0) {
    let random_x = Random(20);
    let random_y = Random(20);
    if (arr[random_x][random_y] != 1) {
      arr[random_x][random_y] = 1;
      fill_cell_number--;
    }
  }
  while (true) {
    let start_x = Random(20),
      start_y = Random(20);
    if (arr[start_x][start_y] != 1) {
      arr[start_x][start_y] = "S";
      START_X = start_x;
      START_Y = start_y;
      break;
    }
  }
  while (true) {
    let end_x = Random(20),
      end_y = Random(20);
    if (arr[end_x][end_y] != 1 && arr[end_x][end_y] != "S") {
      arr[end_x][end_y] = "E";
      END_X = end_x;
      END_Y = end_y;
      break;
    }
  }
  return arr;
}

let square_colors = ["grey", "blue"];

function do_coloring(random_bit_array) {
  for (let i = ROW_NUMBER - 1; i >= 0; i--) {
    for (let j = 0; j < COL_NUMBER; j++) {
      $(`#x${j}y${i}`)
        .removeClass("blue")
        .removeClass("start")
        .removeClass("end")
        .removeClass("road");
      if (random_bit_array[j][i] === 1) $(`#x${j}y${i}`).addClass("blue");
      else if (random_bit_array[j][i] === "R")
        $(`#x${j}y${i}`).addClass("road");
    }
  }
  $(`#x${START_X}y${START_Y}`).addClass("start").removeClass("road");
  $(`#x${END_X}y${END_Y}`).addClass("end").removeClass("road");
}
function show_answer(result) {
  $("#success").text(result.success);
  $("#search_cost").text(result.search_cost);
  $("#node_number").text(result.node_number);
}
// function new_game() {}
// function show_result(result) {}
