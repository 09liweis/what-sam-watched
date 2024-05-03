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
      'popular':{to:'/movies/douban?nm=popular',nm:'Popular'},
      'chart':{to:'/movies/douban?nm=chart',nm:'Chart'},
      'alltime_boxoffice':{to:'/movies/douban?nm=alltime_boxoffice',nm:'All Boxoffice'}
    }
  },
  cineplex:{to:'/movies/cineplex',nm:'Cineplex'},
  hongkong: {
    to:'/movies/hongkong?nm=showing',nm:'Hongkong',
    subRoutes:{
      'showing':{to:'/movies/hongkong?nm=showing',nm:'In theatre'},
      'coming':{to:'/movies/hongkong?nm=coming',nm:'In comming'}
    }
  },
  taiwan: {to:'/movies/taiwan?nm=showing',nm:'Taiwan',
    subRoutes:{
      'showing':{to:'/movies/taiwan?nm=showing',nm:'In theatre'},
      'coming':{to:'/movies/taiwan?nm=coming',nm:'In comming'}
    }
  },
  imdb: {to:'/movies/imdb?nm=boxoffice',nm:'IMDB'}
}

export const getSubroutes = (name:string):ROUTES_TYPE|null => {
  return ROUTES[name]?.subRoutes || null;
}