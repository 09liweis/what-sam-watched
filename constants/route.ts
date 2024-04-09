export const SAM:string = 'sam';

type ROUTE = {
  to: string,
  nm: string,
  subRoutes?:{
    [key:string]: ROUTE
  }
}

type ROUTES_TYPE = {
  [key:string]: ROUTE
}

export const ROUTES:ROUTES_TYPE = {
  sam:{to:'/',nm:'Sam'},
  douban:{
    to:'/movies/douban?nm=in_theatre',
    nm:'Douban',
    subRoutes:{
      'in_theatre':{to:'/movies/douban?nm=in_theatre',nm:'In theatre'},
      'comming':{to:'/movies/douban?nm=comming',nm:'In comming'},
      'popular':{to:'/movies/douban?nm=popular',nm:'Popular'}
    }
  },
  cineplex:{to:'/movies/cineplex',nm:'Cineplex'},
  hongkong: {
    to:'/movies/hongkong?nm=hongkong/showing',nm:'Hongkong',
    subRoutes:{
      'showing':{to:'/movies/hongkong?nm=hongkong/showing',nm:'In theatre'},
      'coming':{to:'/movies/hongkong?nm=hongkong/coming',nm:'In comming'}
    }
  },
  taiwan: {to:'/movies/taiwan',nm:'Taiwan'},
  imdb_boxoffice: {to:'/movies/imdb_boxoffice',nm:'IMDB Box Office'}
}

export const getSubroutes = (name:string):ROUTES_TYPE|null => {
  return ROUTES[name]?.subRoutes || null;
}