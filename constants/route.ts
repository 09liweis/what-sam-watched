export const SAM: string = "sam";

type ROUTE = {
  to: string;
  nm: string;
  subRoutes?: {
    [key: string]: ROUTE;
  };
};

type ROUTES_TYPE = {
  [key: string]: ROUTE;
};

const getListsUrl = (path: string) => {
  return `/lists/${path}`;
};

const getDoubanListsUrl = (path: string) => {
  return getListsUrl(`douban?nm=${path}`);
};

const getIMDBListsUrl = (path: string) => {
  return getListsUrl(`imdb${path}`);
};

export const ROUTES: ROUTES_TYPE = {
  sam: { to: "/", nm: "Sam" },
  quiz: { to: "/quiz", nm: "Quiz" },
  douban: {
    to: getDoubanListsUrl("in_theatre"),
    nm: "Douban",
    subRoutes: {
      in_theatre: { to: getDoubanListsUrl("in_theatre"), nm: "In theatre" },
      comming: { to: getDoubanListsUrl("comming"), nm: "In comming" },
      popular: { to: getDoubanListsUrl("popular"), nm: "Popular" },
      chart: { to: getDoubanListsUrl("chart"), nm: "Chart" },
      alltime_boxoffice: {
        to: getDoubanListsUrl("alltime_boxoffice"),
        nm: "All Boxoffice",
      },
    },
  },
  // maoyan: { to: getListsUrl("maoyan"), nm: "Maoyan" },
  cineplex: { to: getListsUrl("cineplex"), nm: "Canada Cineplex" },
  hongkong: {
    to: getListsUrl("hongkong?nm=showing"),
    nm: "China Hongkong",
    subRoutes: {
      showing: { to: getListsUrl("hongkong?nm=showing"), nm: "In theatre" },
      coming: { to: getListsUrl("hongkong?nm=coming"), nm: "In comming" },
    },
  },
  taiwan: {
    to: getListsUrl("taiwan?nm=showing"),
    nm: "China Taiwan",
    subRoutes: {
      showing: { to: getListsUrl("taiwan?nm=showing"), nm: "In theatre" },
      coming: { to: getListsUrl("taiwan?nm=coming"), nm: "In comming" },
    },
  },
  // imdb: {
  //   to: getIMDBListsUrl("?nm=boxoffice"),
  //   nm: "IMDB",
  //   subRoutes: {
  //     boxoffice: { to: getIMDBListsUrl("?nm=boxoffice"), nm: "BoxOffice" },
  //     popular: { to: getIMDBListsUrl("?nm=popular"), nm: "Popular" },
  //     calendar: { to: getIMDBListsUrl("?nm=calendar"), nm: "Comming" },
  //   },
  // },
};

export const getSubroutes = (name: string): ROUTES_TYPE | null => {
  return ROUTES[name]?.subRoutes || null;
};
