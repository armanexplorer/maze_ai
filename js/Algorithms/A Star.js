function A_Star(array, sx, sy, ex, ey) {
  START_X = sx;
  START_Y = sy;
  END_X = ex;
  END_Y = ey;
  TARGET_ID = END_X * ROW_NUM + END_Y;

  let result = a_star_algo(array);
  let path = result.path;
  path.forEach((node_id) => {
    let xy = get_xy(node_id);
    array[xy[0]][xy[1]] = "R";
  });
  result.array = array;
  return result;
}

function a_star_algo(arr) {
  let frontier = new PriorityQueue((a, b) => a[1] < b[1]);

  // let cost = Array(MAX_ID + 1);
  // cost.fill(99999);

  let visited = new Set();
  let cur_path = [];
  let cur_id;
  let adjs_cells;
  let xy;
  let cur_depth;
  let extend_count = 0;

  frontier.push([[get_id(START_X, START_Y)], h(START_X, START_Y)]);

  while (!frontier.isEmpty()) {
    // console.log(frontier.pop()[0]);
    cur_path = frontier.pop()[0];
    // console.log(cur_path);
    cur_depth = cur_path.length - 1;
    cur_id = cur_path[cur_depth];
    // console.log(cur_id);
    visited.add(cur_id);
    // new_cost = cur_depth + h(xy[0], xy[1]);
    // if (new_cost >= cost[cur_id]) {
    //   continue;
    // }
    if (cur_id == TARGET_ID) {
      return {
        path: cur_path,
        node_number: extend_count,
        search_cost: 0,
        success: true,
      };
    }
    xy = get_xy(cur_id);
    // console.log(xy);
    adjs_cells = get_adjs(xy[0], xy[1]);
    for (let i = 0; i < adjs_cells.length; i++) {
      xy = get_xy(adjs_cells[i]);

      if (!visited.has(adjs_cells[i]) && arr[xy[0]][xy[1]] !== 1) {
        new_path = cur_path.slice();
        new_path.push(adjs_cells[i]);
        // console.log(new_path);
        frontier.push([new_path, cur_depth + h(xy[0], xy[1])]);
      }
    }
    extend_count++;
  }
  return {
    path: [],
    node_number: extend_count,
    search_cost: 0,
    success: false,
  };
  // console.log(frontier);
  // while (frontier.length != 0) {}
}

function h(x, y) {
  return Math.abs(x - END_X) + Math.abs(y - END_Y);
}
