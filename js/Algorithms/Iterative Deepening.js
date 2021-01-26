function Iterative_Deepening(array, sx, sy, ex, ey) {
  START_X = sx;
  START_Y = sy;
  END_X = ex;
  END_Y = ey;
  TARGET_ID = END_X * ROW_NUM + END_Y;

  // let result = iterative_deeping_algo(array);
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
      // alert(depth);
      return res;
    }
    depth++;
  }
}

function DLS_algo(arr, depth_limit) {
  let visited = new Array(MAX_ID + 1);
  visited.fill(999999);
  let path = [];
  let extend_count = 0;

  let cur_id;
  let xy;
  let adj_cell;
  let cur_depth;
  let cutoff_flag = false;

  path.push(get_id(START_X, START_Y));
  console.log(START_X, START_Y);
  console.log(END_X, END_Y);
  while (path.length != 0) {
    // console.log(get_xy_path(path));
    cur_depth = path.length - 1;
    cur_id = path[cur_depth];
    if (visited[cur_id] < cur_depth) {
      path.pop();
      extend_count++; // actually it doesn't extend but in theory it does
      continue;
    }
    visited[cur_id] = cur_depth;
    if (cur_id == TARGET_ID) {
      return {
        path: path,
        node_number: extend_count,
        search_cost: 0,
        success: true,
        cutoff: false,
      };
    }
    if (cur_depth === depth_limit) {
      cutoff_flag = true;
      path.pop();
      extend_count++;
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
  }
  return {
    path: [],
    node_number: extend_count,
    search_cost: 0,
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
  // console.log(
  //   `the adj selected for [${cur_xy[0]},${cur_xy[1]}] is: ${get_xy(child_id)}`
  // );
  // console.log("********************************************************");
  return child_id;
}
