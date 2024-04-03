export const getFilterCssClass = (cur:string, val:string):string => {
  let cssClass = 'movie-filter ';
  if (cur === val) {
    cssClass += 'active';
  }
  return cssClass;
}