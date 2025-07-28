// Pagination utility
const paginateResults = (data, page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const results = {};
  
  if (endIndex < data.length) {
    results.next = {
      page: page + 1,
      limit: limit
    };
  }
  
  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    };
  }
  
  results.results = data.slice(startIndex, endIndex);
  results.total = data.length;
  results.page = parseInt(page);
  results.limit = parseInt(limit);
  results.totalPages = Math.ceil(data.length / limit);
  
  return results;
};

module.exports = {
  paginateResults
}; 