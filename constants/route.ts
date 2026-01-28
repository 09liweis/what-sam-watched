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

export const ROUTES: ROUTES_TYPE = {
  sam: { to: "/", nm: "Sam" },
  quiz: { to: "/quiz", nm: "Quiz" },
  douban: {
    to: getListsUrl("douban?nm=in_theatre"),
    nm: "Douban",
    subRoutes: {
      in_theatre: { to: getListsUrl("douban?nm=in_theatre"), nm: "In theatre" },
      comming: { to: getListsUrl("douban?nm=comming"), nm: "In comming" },
      popular: { to: getListsUrl("douban?nm=popular"), nm: "Popular" },
      chart: { to: getListsUrl("douban?nm=chart"), nm: "Chart" },
      alltime_boxoffice: {
        to: getListsUrl("douban?nm=alltime_boxoffice"),
        nm: "All Boxoffice",
      },
    },
  },
  maoyan: { to: getListsUrl("maoyan"), nm: "Maoyan" },
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
  imdb: { to: getListsUrl("imdb?nm=boxoffice"), nm: "IMDB" },
};

export const getSubroutes = (name: string): ROUTES_TYPE | null => {
  return ROUTES[name]?.subRoutes || null;
};
