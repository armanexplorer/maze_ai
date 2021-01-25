function Iterative_Deepening(array) {
  let result = {
    available: true,
    search_cost: 0,
    node_number: 0,
    array: [],
  };

  //for testing:
  result.status = false;
  result.array = array;

  return result;
}
