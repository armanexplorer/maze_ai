function Breadth_First(array) {
  let result = {
    available: true,
    search_cost: 0,
    node_number: 0,
    array: [],
  };

  //for testing:
  let road_number = 20;
  while (road_number > 0) {
    let x = Math.floor(Math.random() * 1000) % 20;
    let y = Math.floor(Math.random() * 1000) % 20;
    if (array[x][y] != 1 && array[x][y] != "S" && array[x][y] != "E") {
      array[x][y] = "R";
      road_number--;
    }
  }
  result.search_cost = 20;
  result.node_number = 10;
  result.array = array;

  return result;
}
