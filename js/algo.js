const COL_NUM = 20;
const ROW_NUM = 20;
// const MAX_BLOCK_CELL_NUM = 100; // The random cells can be duplicate

const MAX_ID = (ROW_NUM - 1) * COL_NUM + (COL_NUM - 1);

function get_adjs(x, y) {
  let adjs = Array();
  let adj_id;

  adj_id = get_id(x, y + 1);
  if (adj_id != -1) adjs.push(adj_id);

  adj_id = get_id(x, y - 1);
  if (adj_id != -1) adjs.push(adj_id);

  adj_id = get_id(x + 1, y);
  if (adj_id != -1) adjs.push(adj_id);

  adj_id = get_id(x - 1, y);
  if (adj_id != -1) adjs.push(adj_id);

  return adjs;
}

function get_id(x, y) {
  if (x >= ROW_NUM || y >= COL_NUM || x < 0 || y < 0) return -1;
  return x * ROW_NUM + y;
}
function get_xy(id) {
  return [Math.floor(id / ROW_NUM), id % COL_NUM];
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function get_xy_path(p) {
  let res_xy = [];
  p.forEach((element) => {
    res_xy.push(get_xy(element));
  });
  return res_xy;
}
