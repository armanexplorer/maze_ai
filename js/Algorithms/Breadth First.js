function Breadth_First(array, START_X, START_Y, END_X, END_Y) {
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

function BFS_algo(arr) {
  let frontier = [];
  let visited = new Set();
  let extend_count = 0;

  let cur_id;
  let xy;
  let adjs;
  let cur_path;
  let new_path;
  let search_cost = 0;

  frontier.push([get_id(START_X, START_Y)]);
  while (frontier.length != 0) {
    cur_path = frontier.shift();
    search_cost++;
    cur_id = cur_path[cur_path.length - 1];
    if (visited.has(cur_id)) continue;
    visited.add(cur_id);
    if (cur_id == TARGET_ID) {
      return {
        path: cur_path,
        node_number: extend_count,
        search_cost: search_cost,
        success: true,
      };
    }
    xy = get_xy(cur_id);
    adjs = get_adjs(xy[0], xy[1]);
    for (let i = 0; i < adjs.length; i++) {
      xy = get_xy(adjs[i]);
      if (!visited.has(adjs[i]) && arr[xy[0]][xy[1]] !== 1) {
        new_path = cur_path.slice();
        new_path.push(adjs[i]);
        frontier.push(new_path);
      }
    }
    extend_count++;
  }
  return {
    path: [],
    node_number: extend_count,
    search_cost: search_cost,
    success: false,
  };
}
