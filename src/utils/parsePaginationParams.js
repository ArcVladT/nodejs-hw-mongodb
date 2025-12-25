const parseNumber = (number, defaultValue) => {
  const parsedNumber = parseInt(number);
  if (!Number.isNaN(parsedNumber)) {
    return parsedNumber;
  }
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page);
  const parsedPerPage = parseNumber(perPage);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
