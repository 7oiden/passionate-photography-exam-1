export function assignCategory(category) {
  switch (category) {
    case 5:
      categoryName = "Black & white";
      break;
    case 4:
      categoryName = "Portrait";
      break;
    case 3:
      categoryName = "Landscape";
      break;
    case 2:
      categoryName = "Street";
      break;
    case 1:
      categoryName = "Uncategorized";
      break;
  }

  return categoryName;
}
