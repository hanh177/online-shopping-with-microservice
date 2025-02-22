"use strict";
const _ = require("lodash");
const { Types } = require("mongoose");

const pickObjectData = (object = {}, fields = []) => {
  return _.pick(object, fields);
};

const toMongoObjectId = (id) => new Types.ObjectId(id);
module.exports = { pickObjectData, toMongoObjectId };
