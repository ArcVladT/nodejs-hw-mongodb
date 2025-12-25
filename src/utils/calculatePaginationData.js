export const calculatePaginationData = (count, page, perPage) => {
  const totalPages = Math.ceil(count / perPage);

  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviosPage: page > 1,
  };
};
