//pass in any type of model and populate with any field
const advancedResult = (model, populate) => async (req, res, next) => {
  //fields to exclude
  let query;
  const reqQuery = { ...req.query };
  const removeFields = ["select", "sort", "page", "limit"];
  removeFields.forEach((param) => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  //finding ressources
  query = model.find(JSON.parse(queryStr));

  if (populate) {
    query.populate(populate);
  }
  //select fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  //sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(fields);
  } else {
    //sorted by rating as default
    query = query.sort({ averageRating: -1 });
  }

  //pagination
  const page = parseInt(req.query.page) || 1; // Current page number, default is 1
  const limit = parseInt(req.query.limit) || 10; // Number of items per page, default is 10
  const startIndex = (page - 1) * limit; // Calculate number of documents to skip (ex:  20 documents to get to page 3 )
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  //execute query
  const results = await query;

  //creat pagination object with prev and next and limit per page

  const pagination = {};
  if (endIndex < total) {
    pagination.next = { page: page + 1, limit };
  }
  if (startIndex > 0) {
    pagination.prev = { page: page - 1, limit };
  }

  //return result object
  res.advancedResult = {
    success: true,
    data: results,
  };

  next();
};

module.exports = advancedResult;
