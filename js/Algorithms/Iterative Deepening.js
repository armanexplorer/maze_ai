function Iterative_Deepening(array, START_X, START_Y, END_X, END_Y) {
  TARGET_ID = END_X * ROW_NUM + END_Y;
  let result = BFS_algo(array, START_X, START_Y, END_X, END_Y);
  let path = result.path;
  path.forEach((node_id) => {
    let xy = get_xy(node_id);
    array[xy[0]][xy[1]] = "R";
  });
  result.array = array;
  return result;
}

function DFS_algo(arr) {
  let visited = new Set();
  let path = [];
  let extend_count = 0;

  let cur_id;
  let xy;
  let adj_cell;

  path.push(get_id(START_X, START_Y));
  while (path.length != 0) {
    cur_id = path[path.length - 1];
    visited.add(cur_id);
    if (cur_id == TARGET_ID) {
      return {
        path: path,
        node_number: extend_count,
        search_cost: 0,
        success: true,
      };
    }

    xy = get_xy(cur_id);
    adj_cell = get_one_unvisited_adj(xy, visited, arr);
    if (adj_cell == -1) {
      path.pop();
      extend_count++;
      continue;
    }
    path.push(adj_cell);
  }
  return {
    path: [],
    node_number: extend_count,
    search_cost: 0,
    success: false,
  };
}

function get_one_unvisited_adj(cur_xy, visited, arr) {
  let adjs = get_adjs(cur_xy[0], cur_xy[1]);
  let child_id = -1;
  adjs.some((adj) => {
    let xy = get_xy(adj);
    if (arr[xy[0]][xy[1]] != 1 && !visited.has(adj)) {
      child_id = adj;
      return true;
    }
  });
  return child_id;
}
