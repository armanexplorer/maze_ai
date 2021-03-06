function Iterative_Deepening(array, sx, sy, ex, ey) {
  START_X = sx;
  START_Y = sy;
  END_X = ex;
  END_Y = ey;
  TARGET_ID = END_X * ROW_NUM + END_Y;
  extend_count = 0;
  search_cost = 0;

  let result = iterative_deeping_algo(array);
  let path = result.path;
  path.forEach((node_id) => {
    let xy = get_xy(node_id);
    array[xy[0]][xy[1]] = "R";
  });
  result.array = array;
  return result;
}

function iterative_deeping_algo(arr) {
  let depth = 0;
  let res;
  while (true) {
    res = DLS_algo(arr, depth);
    if (res.cutoff === false) {
      return res;
    }
    depth++;
  }
}

function DLS_algo(arr, depth_limit) {
  let visited = new Array(MAX_ID + 1);
  visited.fill(999999);
  let path = [];

  let cur_id;
  let xy;
  let adj_cell;
  let cur_depth;
  let cutoff_flag = false;

  path.push(get_id(START_X, START_Y));
  while (path.length != 0) {
    cur_depth = path.length - 1;
    cur_id = path[cur_depth];
    if (visited[cur_id] < cur_depth) {
      path.pop();
      continue;
    }
    visited[cur_id] = cur_depth;
    if (cur_id == TARGET_ID) {
      return {
        path: path,
        node_number: extend_count,
        search_cost: search_cost,
        success: true,
        cutoff: false,
      };
    }
    if (cur_depth === depth_limit) {
      cutoff_flag = true;
      path.pop();
      continue;
    }
    xy = get_xy(cur_id);
    adj_cell = get_one_unvisited_adj(xy, cur_depth, visited, arr);
    if (adj_cell == -1) {
      path.pop();
      extend_count++;
      continue;
    }
    path.push(adj_cell);
    search_cost++;
  }
  return {
    path: [],
    node_number: extend_count,
    search_cost: search_cost,
    success: false,
    cutoff: cutoff_flag,
  };
}

function get_one_unvisited_adj(cur_xy, cur_depth, visited, arr) {
  let adjs = get_adjs(cur_xy[0], cur_xy[1]);
  let child_id = -1;
  adjs.some((adj) => {
    let xy = get_xy(adj);
    if (arr[xy[0]][xy[1]] != 1 && cur_depth + 1 < visited[adj]) {
      child_id = adj;
      return true;
    }
  });
  return child_id;
}
