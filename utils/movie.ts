export const getFilterCssClass = (cur:string, val:any):string => {
  let cssClass = 'movie-filter ';
  if (cur === val) {
    cssClass += 'active';
  }
  return cssClass;
}