import { jsxs, jsx } from "react/jsx-runtime";
import { queryOptions, useSuspenseQuery, QueryClient } from "@tanstack/react-query";
import { useRouter, useMatch, rootRouteId, ErrorComponent, Link, createRootRouteWithContext, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, redirect, useSearch, createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import axios from "redaxios";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, c as createServerFn } from "../server.js";
import { json } from "@tanstack/router-core/ssr/client";
import { Suspense } from "react";
function DefaultCatchBoundary({ error }) {
  const router2 = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId
  });
  console.error(error);
  return /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6", children: [
    /* @__PURE__ */ jsx(ErrorComponent, { error }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center flex-wrap", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
          },
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          children: "Try Again"
        }
      ),
      isRoot ? /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          children: "Home"
        }
      ) : /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          onClick: (e) => {
            e.preventDefault();
            window.history.back();
          },
          children: "Go Back"
        }
      )
    ] })
  ] });
}
function NotFound({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2 p-2", children: [
    /* @__PURE__ */ jsx("div", { className: "text-gray-600 dark:text-gray-400", children: children || /* @__PURE__ */ jsx("p", { children: "The page you are looking for does not exist." }) }),
    /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => window.history.back(),
          className: "bg-emerald-500 text-white px-2 py-1 rounded-sm uppercase font-black text-sm",
          children: "Go back"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "bg-cyan-600 text-white px-2 py-1 rounded-sm uppercase font-black text-sm",
          children: "Start Over"
        }
      )
    ] })
  ] });
}
const appCss = "/assets/app-IV37BnX2.css";
const seo = ({
  title,
  description,
  keywords,
  image
}) => {
  const tags = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: "@tannerlinsley" },
    { name: "twitter:site", content: "@tannerlinsley" },
    { name: "og:type", content: "website" },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    ...image ? [
      { name: "twitter:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "og:image", content: image }
    ] : []
  ];
  return tags;
};
const Route$m = createRootRouteWithContext()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      ...seo({
        title: "TanStack Start | Type-Safe, Client-First, Full-Stack React Framework",
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `
      })
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" }
    ]
  }),
  errorComponent: (props) => {
    return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(DefaultCatchBoundary, { ...props }) });
  },
  notFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {}),
  component: RootComponent
});
function RootComponent() {
  return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsxs("div", { className: "p-2 flex gap-2 text-lg", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/",
            activeProps: {
              className: "font-bold"
            },
            activeOptions: { exact: true },
            children: "Home"
          }
        ),
        " ",
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/posts",
            activeProps: {
              className: "font-bold"
            },
            children: "Posts"
          }
        ),
        " ",
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/users",
            activeProps: {
              className: "font-bold"
            },
            children: "Users"
          }
        ),
        " ",
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/stations",
            activeProps: {
              className: "font-bold"
            },
            children: "Станции/посты"
          }
        ),
        " ",
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/currentWeather",
            activeProps: {
              className: "font-bold"
            },
            children: "Текущая погода"
          }
        ),
        " ",
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/forecastWeatherApi",
            activeProps: {
              className: "font-bold"
            },
            children: "Прогноз погоды от Weather API"
          }
        ),
        " ",
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/route-a",
            activeProps: {
              className: "font-bold"
            },
            children: "Pathless Layout"
          }
        ),
        " ",
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/deferred",
            activeProps: {
              className: "font-bold"
            },
            children: "Deferred"
          }
        ),
        " ",
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/this-route-does-not-exist",
            activeProps: {
              className: "font-bold"
            },
            children: "This Route Does Not Exist"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("hr", {}),
      children,
      /* @__PURE__ */ jsx(TanStackRouterDevtools, { position: "bottom-right" }),
      /* @__PURE__ */ jsx(ReactQueryDevtools, { buttonPosition: "bottom-left" }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$f = () => import("./index-BwMT9QHg.js");
const Route$l = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./_pathlessLayout-BKuQagRO.js");
const Route$k = createFileRoute("/_pathlessLayout")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const DEPLOY_URL$2 = "http://localhost:3000";
const currentWeatherQueryOptions = () => queryOptions({
  queryKey: ["currentWeather"],
  queryFn: () => axios.get(DEPLOY_URL$2 + "/api/currentweather").then((s) => s.data).catch(() => {
    throw new Error("Failed to fetch weather");
  })
});
const observedAt = () => {
  let s = (/* @__PURE__ */ new Date()).toISOString().slice(0, 15).replace("T", " ") + "0:00";
  return new Date(s).getTime() / 1e3;
};
const $$splitComponentImporter$d = () => import("./currentWeather.route-BP_yPvZM.js");
const Route$j = createFileRoute("/currentWeather")({
  loader: async ({
    context
  }) => {
    await context.queryClient.ensureQueryData(currentWeatherQueryOptions());
  },
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const deferredQueryOptions = () => queryOptions({
  queryKey: ["deferred"],
  queryFn: async () => {
    await new Promise((r) => setTimeout(r, 3e3));
    return {
      message: `Hello deferred from the server!`,
      status: "success",
      time: /* @__PURE__ */ new Date()
    };
  }
});
const $$splitComponentImporter$c = () => import("./deferred-CR331Wqp.js");
const Route$i = createFileRoute("/deferred")({
  loader: ({
    context
  }) => {
    context.queryClient.prefetchQuery(deferredQueryOptions());
  },
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const fetchPosts = createServerFn({
  method: "GET"
}).handler(createSsrRpc("cbb8ca69048418e62742f2c511faa56326b80ace384144a35bb3e0bf5e8124be"));
const postsQueryOptions = () => queryOptions({
  queryKey: ["posts"],
  queryFn: () => fetchPosts()
});
const fetchPost = createServerFn({
  method: "GET"
}).inputValidator((d) => d).handler(createSsrRpc("0029094260fc8f554fa3ac223696de0e9591567ec6420250e896c91244c812c5"));
const postQueryOptions = (postId) => queryOptions({
  queryKey: ["post", postId],
  queryFn: () => fetchPost({
    data: postId
  })
});
const $$splitComponentImporter$b = () => import("./posts.route-D_5URvXK.js");
const Route$h = createFileRoute("/posts")({
  loader: async ({
    context
  }) => {
    await context.queryClient.ensureQueryData(postsQueryOptions());
  },
  head: () => ({
    meta: [{
      title: "Posts"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const Route$g = createFileRoute("/redirect")({
  beforeLoad: async () => {
    throw redirect({
      to: "/posts"
    });
  }
});
const DEPLOY_URL$1 = "http://localhost:3000";
const stationsQueryOptions = () => queryOptions({
  queryKey: ["stations"],
  queryFn: () => axios.get(DEPLOY_URL$1 + "/api/stations").then((s) => s.data).catch(() => {
    throw new Error("Failed to fetch stations");
  })
});
const $$splitComponentImporter$a = () => import("./stations.route-CcfBkY_m.js");
const Route$f = createFileRoute("/stations")({
  loader: async ({
    context
  }) => {
    await context.queryClient.ensureQueryData(stationsQueryOptions());
  },
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const DEPLOY_URL = "http://localhost:3000";
const usersQueryOptions = () => queryOptions({
  queryKey: ["users"],
  queryFn: () => axios.get(DEPLOY_URL + "/api/users").then((ms) => ms.data).catch(() => {
    throw new Error("Failed to fetch users");
  })
});
const userQueryOptions = (id) => queryOptions({
  queryKey: ["users", id],
  queryFn: () => axios.get(DEPLOY_URL + "/api/users/" + id).then((r) => r.data).catch(() => {
    throw new Error("Failed to fetch user");
  })
});
const $$splitComponentImporter$9 = () => import("./users.route-CnNG1II4.js");
const Route$e = createFileRoute("/users")({
  loader: async ({
    context
  }) => {
    await context.queryClient.ensureQueryData(usersQueryOptions());
  },
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./_nested-layout-CzbpeJPs.js");
const Route$d = createFileRoute("/_pathlessLayout/_nested-layout")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const Route$c = createFileRoute("/api/currentWeather")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        console.info("Fetching current weather... @", request.url);
        let query = `http://10.54.1.30:8640/get?limit=100&stations=34519&notbefore=${observedAt() + 3600 * 3}&streams=1&source=10202`;
        const res = await axios.get(
          query
        );
        const list = res.data;
        console.log(query, list.length);
        return json(
          list.length > 0 ? list.map((s) => ({ id: s.id, station: s.station, value: s.value, meas_hash: s.meas_hash })) : null
        );
      }
    }
  }
});
const Route$b = createFileRoute("/api/stations")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        console.info("Fetching stations... @", request.url);
        const res = await axios.get(
          "http://10.54.1.30:8640/stations.json"
        );
        const list = res.data;
        return json(
          list.map((s) => ({ sindex: s.sindex, station_name: s.station_name }))
        );
      }
    }
  }
});
const Route$a = createFileRoute("/api/users")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        console.info("Fetching users... @", request.url);
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        const list = res.data.slice(0, 10);
        return json(
          list.map((u) => ({ id: u.id, name: u.name, email: u.email }))
        );
      }
    }
  }
});
function ForecastLinks() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 my-4", children: [
    /* @__PURE__ */ jsx(
      Link,
      {
        to: "/forecastWeatherApi",
        search: { i_day: 0 },
        className: "px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors",
        children: "Сегодня"
      }
    ),
    /* @__PURE__ */ jsx(
      Link,
      {
        to: "/forecastWeatherApi",
        search: { i_day: 1 },
        className: "px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors",
        children: "Завтра"
      }
    ),
    /* @__PURE__ */ jsx(
      Link,
      {
        to: "/forecastWeatherApi",
        search: { i_day: 2 },
        className: "px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors",
        children: "Послезавтра"
      }
    )
  ] });
}
function ForecastTable({ forecastData, iDay }) {
  const forecastDay = forecastData.forecast.forecastday[iDay] || forecastData.forecast.forecastday[0];
  const todayForecast = forecastDay.day;
  const totalPrecip = todayForecast.totalprecip_mm;
  const maxTemp = todayForecast.maxtemp_c;
  const minTemp = todayForecast.mintemp_c;
  const sunrise = forecastDay.astro.sunrise.slice(0, 5);
  const sunset = forecastDay.astro.sunset.slice(0, 5);
  const maxWind = (todayForecast.maxwind_kph * 1e3 / 3600).toFixed(1);
  const currentHour = (/* @__PURE__ */ new Date()).getHours();
  const hours = [];
  for (let i = currentHour; i < 24; i++) {
    const data = forecastDay.hour[i];
    hours.push({
      hour: i,
      icon: data.condition.icon,
      condition: data.condition.text,
      temp: data.temp_c,
      chance: data.chance_of_rain === 0 && data.chance_of_snow === 0 ? 0 : Math.max(data.chance_of_rain, data.chance_of_snow)
    });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx("table", { className: "w-full table-auto border-collapse text-sm", children: /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-700 text-white", style: { height: "80px" }, children: [
      /* @__PURE__ */ jsxs("th", { className: "p-2", style: { width: "150px" }, children: [
        "Восход: ",
        sunrise,
        /* @__PURE__ */ jsx("br", {}),
        "Закат: ",
        sunset
      ] }),
      /* @__PURE__ */ jsxs("th", { className: "p-2", style: { width: "150px" }, children: [
        "Max:",
        /* @__PURE__ */ jsx("br", {}),
        maxTemp,
        " °C"
      ] }),
      /* @__PURE__ */ jsxs("th", { className: "p-2", style: { width: "150px" }, children: [
        "Min:",
        /* @__PURE__ */ jsx("br", {}),
        minTemp,
        " °C"
      ] }),
      /* @__PURE__ */ jsxs("th", { className: "p-2", style: { width: "150px" }, children: [
        "Осадки:",
        /* @__PURE__ */ jsx("br", {}),
        totalPrecip,
        " mm"
      ] }),
      /* @__PURE__ */ jsxs("th", { className: "p-2", style: { width: "150px" }, children: [
        "Скорость ветра:",
        /* @__PURE__ */ jsx("br", {}),
        maxWind,
        " м/сек"
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold", children: "Почасовой прогноз" }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsx("table", { className: "w-full table-auto border-collapse text-sm", children: /* @__PURE__ */ jsxs("thead", { children: [
      /* @__PURE__ */ jsxs("tr", { className: "bg-gray-600 text-white", children: [
        /* @__PURE__ */ jsx("th", { className: "p-2 bg-gray-600", style: { minWidth: "100px" } }),
        hours.map((h) => /* @__PURE__ */ jsx("th", { className: "p-2 text-center", style: { minWidth: "80px" }, children: `${h.hour}:00` }, h.hour))
      ] }),
      /* @__PURE__ */ jsxs("tr", { className: "bg-gray-700 text-white", children: [
        /* @__PURE__ */ jsx("th", { className: "p-2 bg-gray-600", children: "Погода" }),
        hours.map((h) => /* @__PURE__ */ jsx("th", { className: "p-2 text-center", children: /* @__PURE__ */ jsx(
          "img",
          {
            className: "mx-auto w-12 h-12",
            src: h.icon,
            alt: h.condition,
            title: h.condition
          }
        ) }, h.hour))
      ] }),
      /* @__PURE__ */ jsxs("tr", { className: "bg-gray-700 text-white", children: [
        /* @__PURE__ */ jsx("th", { className: "p-2 bg-gray-600", children: "Температура °C" }),
        hours.map((h) => /* @__PURE__ */ jsx("th", { className: "p-2 text-center", children: h.temp }, h.hour))
      ] }),
      /* @__PURE__ */ jsxs("tr", { className: "bg-gray-700 text-white", children: [
        /* @__PURE__ */ jsx("th", { className: "p-2 bg-gray-600", children: "Вероятность осадков %" }),
        hours.map((h) => /* @__PURE__ */ jsx("th", { className: "p-2 text-center", children: h.chance }, h.hour))
      ] })
    ] }) }) })
  ] });
}
const API_KEY = "2ca6be9004a34fcbadf72634241608";
const BASE_URL = "https://api.weatherapi.com/v1";
async function fetchWeatherForecast(days = 3) {
  const query = `${BASE_URL}/forecast.json?key=${API_KEY}&q=id:2495932&days=${days}`;
  try {
    const response = await fetch(query);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("WeatherAPI Error:", error);
    throw error;
  }
}
const weatherKeys = {
  all: ["weather"],
  forecast: (days = 3) => [...weatherKeys.all, "forecast", days]
};
function useWeatherForecast(days = 3) {
  return useSuspenseQuery({
    queryKey: weatherKeys.forecast(days),
    queryFn: () => fetchWeatherForecast(days),
    staleTime: 1e3 * 60 * 5,
    // 5 минут
    refetchOnWindowFocus: false
  });
}
function ForecastPage() {
  const search = useSearch({ from: "/forecastWeatherApi/" });
  const iDay = search.i_day || 0;
  const { data: forecastData } = useWeatherForecast(3);
  const todayTime = Date.now();
  const targetDate = new Date(todayTime + iDay * 24 * 3600 * 1e3);
  const dateString = targetDate.toLocaleDateString("ru", {
    month: "long",
    day: "numeric"
  });
  return /* @__PURE__ */ jsxs("div", { className: "w-full p-4", children: [
    /* @__PURE__ */ jsx("div", { className: "flex w-full items-center justify-between", children: /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold", children: [
      "Прогноз погоды в г. Донецк на ",
      dateString
    ] }) }),
    /* @__PURE__ */ jsx(ForecastLinks, {}),
    /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "p-4", children: "Загрузка прогноза..." }), children: /* @__PURE__ */ jsx(ForecastTable, { forecastData, iDay }) }, iDay),
    /* @__PURE__ */ jsx("div", { className: "footer-bottom text-center pb-5 mt-8", children: /* @__PURE__ */ jsxs("small", { className: "copyright", children: [
      "Copyright ©",
      " ",
      /* @__PURE__ */ jsx("a", { href: "https://www.weatherapi.com", title: "Weather API", children: "Weather API" })
    ] }) })
  ] });
}
const Route$9 = createFileRoute("/forecastWeatherApi/")({
  component: ForecastPage
});
const $$splitComponentImporter$7 = () => import("./posts.index-DU8oxB5n.js");
const Route$8 = createFileRoute("/posts/")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./posts._postId-DV35_CNP.js");
const $$splitNotFoundComponentImporter$1 = () => import("./posts._postId-D6E2HruA.js");
const Route$7 = createFileRoute("/posts/$postId")({
  loader: async ({
    params: {
      postId
    },
    context
  }) => {
    const data = await context.queryClient.ensureQueryData(postQueryOptions(postId));
    return {
      title: data.title
    };
  },
  head: ({
    loaderData
  }) => ({
    meta: loaderData ? [{
      title: loaderData.title
    }] : void 0
  }),
  errorComponent: PostErrorComponent,
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
function PostErrorComponent({
  error
}) {
  return /* @__PURE__ */ jsx(ErrorComponent, { error });
}
const $$splitComponentImporter$5 = () => import("./stations.index-hLcSgweW.js");
const Route$6 = createFileRoute("/stations/")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./users.index-D5GT_T1K.js");
const Route$5 = createFileRoute("/users/")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitNotFoundComponentImporter = () => import("./users._userId-Djr6YhrQ.js");
const $$splitComponentImporter$3 = () => import("./users._userId-D-E34RfC.js");
const Route$4 = createFileRoute("/users/$userId")({
  loader: async ({
    context,
    params: {
      userId
    }
  }) => {
    await context.queryClient.ensureQueryData(userQueryOptions(userId));
  },
  errorComponent: UserErrorComponent,
  component: lazyRouteComponent($$splitComponentImporter$3, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
function UserErrorComponent({
  error
}) {
  return /* @__PURE__ */ jsx(ErrorComponent, { error });
}
const $$splitComponentImporter$2 = () => import("./route-a-xd-e2Wm0.js");
const Route$3 = createFileRoute("/_pathlessLayout/_nested-layout/route-a")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./route-b-CsHX6n6-.js");
const Route$2 = createFileRoute("/_pathlessLayout/_nested-layout/route-b")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const Route$1 = createFileRoute("/api/users/$id")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        console.info(`Fetching users by id=${params.id}... @`, request.url);
        try {
          const res = await axios.get(
            "https://jsonplaceholder.typicode.com/users/" + params.id
          );
          return json({
            id: res.data.id,
            name: res.data.name,
            email: res.data.email
          });
        } catch (e) {
          console.error(e);
          return json({ error: "User not found" }, { status: 404 });
        }
      }
    }
  }
});
const $$splitComponentImporter = () => import("./posts_._postId.deep-BP4MrJzh.js");
const $$splitErrorComponentImporter = () => import("./posts_._postId.deep-CziAb-E8.js");
const Route = createFileRoute("/posts_/$postId/deep")({
  loader: async ({
    params: {
      postId
    },
    context
  }) => {
    const data = await context.queryClient.ensureQueryData(postQueryOptions(postId));
    return {
      title: data.title
    };
  },
  head: ({
    loaderData
  }) => ({
    meta: loaderData ? [{
      title: loaderData.title
    }] : void 0
  }),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route$l.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$m
});
const PathlessLayoutRoute = Route$k.update({
  id: "/_pathlessLayout",
  getParentRoute: () => Route$m
});
const CurrentWeatherRouteRoute = Route$j.update({
  id: "/currentWeather",
  path: "/currentWeather",
  getParentRoute: () => Route$m
});
const DeferredRoute = Route$i.update({
  id: "/deferred",
  path: "/deferred",
  getParentRoute: () => Route$m
});
const PostsRouteRoute = Route$h.update({
  id: "/posts",
  path: "/posts",
  getParentRoute: () => Route$m
});
const RedirectRoute = Route$g.update({
  id: "/redirect",
  path: "/redirect",
  getParentRoute: () => Route$m
});
const StationsRouteRoute = Route$f.update({
  id: "/stations",
  path: "/stations",
  getParentRoute: () => Route$m
});
const UsersRouteRoute = Route$e.update({
  id: "/users",
  path: "/users",
  getParentRoute: () => Route$m
});
const PathlessLayoutNestedLayoutRoute = Route$d.update({
  id: "/_nested-layout",
  getParentRoute: () => PathlessLayoutRoute
});
const ApiCurrentWeatherRoute = Route$c.update({
  id: "/api/currentWeather",
  path: "/api/currentWeather",
  getParentRoute: () => Route$m
});
const ApiStationsRoute = Route$b.update({
  id: "/api/stations",
  path: "/api/stations",
  getParentRoute: () => Route$m
});
const ApiUsersRoute = Route$a.update({
  id: "/api/users",
  path: "/api/users",
  getParentRoute: () => Route$m
});
const ForecastWeatherApiIndexRoute = Route$9.update({
  id: "/forecastWeatherApi/",
  path: "/forecastWeatherApi/",
  getParentRoute: () => Route$m
});
const PostsIndexRoute = Route$8.update({
  id: "/",
  path: "/",
  getParentRoute: () => PostsRouteRoute
});
const PostsPostIdRoute = Route$7.update({
  id: "/$postId",
  path: "/$postId",
  getParentRoute: () => PostsRouteRoute
});
const StationsIndexRoute = Route$6.update({
  id: "/",
  path: "/",
  getParentRoute: () => StationsRouteRoute
});
const UsersIndexRoute = Route$5.update({
  id: "/",
  path: "/",
  getParentRoute: () => UsersRouteRoute
});
const UsersUserIdRoute = Route$4.update({
  id: "/$userId",
  path: "/$userId",
  getParentRoute: () => UsersRouteRoute
});
const PathlessLayoutNestedLayoutRouteARoute = Route$3.update({
  id: "/route-a",
  path: "/route-a",
  getParentRoute: () => PathlessLayoutNestedLayoutRoute
});
const PathlessLayoutNestedLayoutRouteBRoute = Route$2.update({
  id: "/route-b",
  path: "/route-b",
  getParentRoute: () => PathlessLayoutNestedLayoutRoute
});
const ApiUsersIdRoute = Route$1.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => ApiUsersRoute
});
const PostsPostIdDeepRoute = Route.update({
  id: "/posts_/$postId/deep",
  path: "/posts/$postId/deep",
  getParentRoute: () => Route$m
});
const PostsRouteRouteChildren = {
  PostsPostIdRoute,
  PostsIndexRoute
};
const PostsRouteRouteWithChildren = PostsRouteRoute._addFileChildren(
  PostsRouteRouteChildren
);
const StationsRouteRouteChildren = {
  StationsIndexRoute
};
const StationsRouteRouteWithChildren = StationsRouteRoute._addFileChildren(
  StationsRouteRouteChildren
);
const UsersRouteRouteChildren = {
  UsersUserIdRoute,
  UsersIndexRoute
};
const UsersRouteRouteWithChildren = UsersRouteRoute._addFileChildren(
  UsersRouteRouteChildren
);
const PathlessLayoutNestedLayoutRouteChildren = {
  PathlessLayoutNestedLayoutRouteARoute,
  PathlessLayoutNestedLayoutRouteBRoute
};
const PathlessLayoutNestedLayoutRouteWithChildren = PathlessLayoutNestedLayoutRoute._addFileChildren(
  PathlessLayoutNestedLayoutRouteChildren
);
const PathlessLayoutRouteChildren = {
  PathlessLayoutNestedLayoutRoute: PathlessLayoutNestedLayoutRouteWithChildren
};
const PathlessLayoutRouteWithChildren = PathlessLayoutRoute._addFileChildren(
  PathlessLayoutRouteChildren
);
const ApiUsersRouteChildren = {
  ApiUsersIdRoute
};
const ApiUsersRouteWithChildren = ApiUsersRoute._addFileChildren(
  ApiUsersRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  CurrentWeatherRouteRoute,
  PostsRouteRoute: PostsRouteRouteWithChildren,
  StationsRouteRoute: StationsRouteRouteWithChildren,
  UsersRouteRoute: UsersRouteRouteWithChildren,
  PathlessLayoutRoute: PathlessLayoutRouteWithChildren,
  DeferredRoute,
  RedirectRoute,
  ApiCurrentWeatherRoute,
  ApiStationsRoute,
  ApiUsersRoute: ApiUsersRouteWithChildren,
  ForecastWeatherApiIndexRoute,
  PostsPostIdDeepRoute
};
const routeTree = Route$m._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {})
  });
  setupRouterSsrQueryIntegration({
    router: router2,
    queryClient
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  NotFound as N,
  PostErrorComponent as P,
  Route$7 as R,
  postQueryOptions as a,
  Route$4 as b,
  currentWeatherQueryOptions as c,
  deferredQueryOptions as d,
  userQueryOptions as e,
  Route as f,
  postsQueryOptions as p,
  router as r,
  stationsQueryOptions as s,
  usersQueryOptions as u
};
