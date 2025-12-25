const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return false;

  const allowed = ['work', 'personal', 'home'];

  if (allowed.includes(contactType)) return contactType;

  return 'personal';
};

const parseBoolaen = (value) => {
  const isString = typeof value === 'string';
  if (!isString) return false;

  const v = value.toLowerCase();

  if (v === 'true') return true;

  return false;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseBoolaen(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
