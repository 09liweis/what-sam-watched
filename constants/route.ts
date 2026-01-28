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

export const ROUTES: ROUTES_TYPE = {
  sam: { to: "/", nm: "Sam" },
  quiz: { to: "/quiz", nm: "Quiz" },
  douban: {
    to: "/lists/douban?nm=in_theatre",
    nm: "Douban",
    subRoutes: {
      in_theatre: { to: "/lists/douban?nm=in_theatre", nm: "In theatre" },
      comming: { to: "/lists/douban?nm=comming", nm: "In comming" },
      popular: { to: "/lists/douban?nm=popular", nm: "Popular" },
      chart: { to: "/lists/douban?nm=chart", nm: "Chart" },
      alltime_boxoffice: {
        to: "/lists/douban?nm=alltime_boxoffice",
        nm: "All Boxoffice",
      },
    },
  },
  maoyan: { to: "/lists/maoyan", nm: "Maoyan" },
  cineplex: { to: "/lists/cineplex", nm: "Canada Cineplex" },
  hongkong: {
    to: "/lists/hongkong?nm=showing",
    nm: "China Hongkong",
    subRoutes: {
      showing: { to: "/lists/hongkong?nm=showing", nm: "In theatre" },
      coming: { to: "/lists/hongkong?nm=coming", nm: "In comming" },
    },
  },
  taiwan: {
    to: "/lists/taiwan?nm=showing",
    nm: "China Taiwan",
    subRoutes: {
      showing: { to: "/lists/taiwan?nm=showing", nm: "In theatre" },
      coming: { to: "/lists/taiwan?nm=coming", nm: "In comming" },
    },
  },
  imdb: { to: "/lists/imdb?nm=boxoffice", nm: "IMDB" },
};

export const getSubroutes = (name: string): ROUTES_TYPE | null => {
  return ROUTES[name]?.subRoutes || null;
};
