module.exports.populateDbQuery = (query, options = {}) => {
  const match = {};
  (options.text || []).forEach((k) => {
    if (query[k]) {
      match[k] = { $regex: query[k].trim(), $options: "i" };
    }
  });

  (options.boolean || []).forEach((k) => {
    if (["false", "0"].indexOf(query[k]) > -1) {
      match[k] = false;
    } else if (query[k]) {
      match[k] = true;
    }
  });

  (options.equal || []).forEach((k) => {
    if (query[k]) {
      match[k] = query[k];
    }
  });

  (options.array || []).forEach((k) => {
    if (query[k]) {
      match[k] = { $in: query[k].split(",") };
    }
  });

  return match;
};

module.exports.populateDBSort = (
  query,
  defaultSort = "updatedAt",
  defaultSortType = -1
) => {
  const sort = {};
  if (query.sort) {
    sort[query.sort] = ["asc", "1"].indexOf(query.sortType) > -1 ? 1 : -1;
  } else {
    sort[defaultSort] = defaultSortType;
  }

  return sort;
};
