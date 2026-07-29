import { jsxDEV } from "react/jsx-dev-runtime";
import { queryOptions, QueryClient } from "@tanstack/react-query";
import { useRouter, useMatch, rootRouteId, ErrorComponent, Link, createRootRouteWithContext, Outlet, HeadContent, Scripts, createFileRoute, redirect, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import axios from "redaxios";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, c as createServerFn } from "../server.js";
import { json } from "@tanstack/router-core/ssr/client";
function DefaultCatchBoundary({ error }) {
  const router2 = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId
  });
  console.error(error);
  return /* @__PURE__ */ jsxDEV("div", { className: "min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6", children: [
    /* @__PURE__ */ jsxDEV(ErrorComponent, { error }, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/components/DefaultCatchBoundary.tsx",
      lineNumber: 21,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2 items-center flex-wrap", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => {
            router2.invalidate();
          },
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          children: "Try Again"
        },
        void 0,
        false,
        {
          fileName: "/home/slavam22/sites/start-basic-react-query/src/components/DefaultCatchBoundary.tsx",
          lineNumber: 23,
          columnNumber: 9
        },
        this
      ),
      isRoot ? /* @__PURE__ */ jsxDEV(
        Link,
        {
          to: "/",
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          children: "Home"
        },
        void 0,
        false,
        {
          fileName: "/home/slavam22/sites/start-basic-react-query/src/components/DefaultCatchBoundary.tsx",
          lineNumber: 32,
          columnNumber: 11
        },
        this
      ) : /* @__PURE__ */ jsxDEV(
        Link,
        {
          to: "/",
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          onClick: (e) => {
            e.preventDefault();
            window.history.back();
          },
          children: "Go Back"
        },
        void 0,
        false,
        {
          fileName: "/home/slavam22/sites/start-basic-react-query/src/components/DefaultCatchBoundary.tsx",
          lineNumber: 39,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/components/DefaultCatchBoundary.tsx",
      lineNumber: 22,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/slavam22/sites/start-basic-react-query/src/components/DefaultCatchBoundary.tsx",
    lineNumber: 20,
    columnNumber: 5
  }, this);
}
function NotFound({ children }) {
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 p-2", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "text-gray-600 dark:text-gray-400", children: children || /* @__PURE__ */ jsxDEV("p", { children: "The page you are looking for does not exist." }, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/components/NotFound.tsx",
      lineNumber: 7,
      columnNumber: 22
    }, this) }, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/components/NotFound.tsx",
      lineNumber: 6,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("p", { className: "flex items-center gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => window.history.back(),
          className: "bg-emerald-500 text-white px-2 py-1 rounded-sm uppercase font-black text-sm",
          children: "Go back"
        },
        void 0,
        false,
        {
          fileName: "/home/slavam22/sites/start-basic-react-query/src/components/NotFound.tsx",
          lineNumber: 10,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        Link,
        {
          to: "/",
          className: "bg-cyan-600 text-white px-2 py-1 rounded-sm uppercase font-black text-sm",
          children: "Start Over"
        },
        void 0,
        false,
        {
          fileName: "/home/slavam22/sites/start-basic-react-query/src/components/NotFound.tsx",
          lineNumber: 16,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/components/NotFound.tsx",
      lineNumber: 9,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/slavam22/sites/start-basic-react-query/src/components/NotFound.tsx",
    lineNumber: 5,
    columnNumber: 5
  }, this);
}
const appCss = "/assets/app-DNxud1cR.css";
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
const Route$l = createRootRouteWithContext()({
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
    return /* @__PURE__ */ jsxDEV(RootDocument, { children: /* @__PURE__ */ jsxDEV(DefaultCatchBoundary, { ...props }, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/__root.tsx",
      lineNumber: 62,
      columnNumber: 9
    }, void 0) }, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/__root.tsx",
      lineNumber: 61,
      columnNumber: 7
    }, void 0);
  },
  notFoundComponent: () => /* @__PURE__ */ jsxDEV(NotFound, {}, void 0, false, {
    fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/__root.tsx",
    lineNumber: 66,
    columnNumber: 28
  }, void 0),
  component: RootComponent
});
function RootComponent() {
  return /* @__PURE__ */ jsxDEV(RootDocument, { children: /* @__PURE__ */ jsxDEV(Outlet, {}, void 0, false, {
    fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/__root.tsx",
    lineNumber: 73,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/__root.tsx",
    lineNumber: 72,
    columnNumber: 5
  }, this);
}
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxDEV("html", { children: [
    /* @__PURE__ */ jsxDEV("head", { children: /* @__PURE__ */ jsxDEV(HeadContent, {}, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/__root.tsx",
      lineNumber: 82,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/__root.tsx",
      lineNumber: 81,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("body", { children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-2 flex gap-2 text-lg", children: [
        /* @__PURE__ */ jsxDEV(
          Link,
          {
            to: "/",
            activeProps: {
              className: "font-bold"
            },
            activeOptions: { exact: true },
            children: "Home"
          },
          void 0,
          false,
          {
            fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/__root.tsx",
            lineNumber: 86,
            columnNumber: 11
          },
          this
        ),
        " ",
        /* @__PURE__ */ jsxDEV(
          Link,
          {
            to: "/posts",
            activeProps: {
              className: "font-bold"
            },
            children: "Posts"
          },
          void 0,
          false,
          {
            fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/__root.tsx",
            lineNumber: 95,
            columnNumber: 11
          },
          this
        ),
        " ",
        /* @__PURE__ */ jsxDEV(
          Link,
          {
            to: "/users",
            activeProps: {
              className: "font-bold"
            },
            children: "Users"
          },
          void 0,
          false,
          {
            fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/__root.tsx",
            lineNumber: 103,
            columnNumber: 11
          },
          this
        ),
        " ",
        /* @__PURE__ */ jsxDEV(
          Link,
          {
            to: "/stations",
            activeProps: {
              className: "font-bold"
            },
            children: "Станции/посты"
          },
          void 0,
          false,
          {
            fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/__root.tsx",
            lineNumber: 111,
            columnNumber: 11
          },
          this
        ),
        " ",
        /* @__PURE__ */ jsxDEV(
          Link,
          {
            to: "/currentWeather",
            activeProps: {
              className: "font-bold"
            },
            children: "Текущая погода"
          },
          void 0,
          false,
          {
            fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/__root.tsx",
            lineNumber: 119,
            columnNumber: 11
          },
          this
        ),
        " ",
        /* @__PURE__ */ jsxDEV(
          Link,
          {
            to: "/route-a",
            activeProps: {
              className: "font-bold"
            },
            children: "Pathless Layout"
          },
          void 0,
          false,
          {
            fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/__root.tsx",
            lineNumber: 127,
            columnNumber: 11
          },
          this
        ),
        " ",
        /* @__PURE__ */ jsxDEV(
          Link,
          {
            to: "/deferred",
            activeProps: {
              className: "font-bold"
            },
            children: "Deferred"
          },
          void 0,
          false,
          {
            fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/__root.tsx",
            lineNumber: 135,
            columnNumber: 11
          },
          this
        ),
        " ",
        /* @__PURE__ */ jsxDEV(
          Link,
          {
            to: "/this-route-does-not-exist",
            activeProps: {
              className: "font-bold"
            },
            children: "This Route Does Not Exist"
          },
          void 0,
          false,
          {
            fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/__root.tsx",
            lineNumber: 143,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/__root.tsx",
        lineNumber: 85,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("hr", {}, void 0, false, {
        fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/__root.tsx",
        lineNumber: 153,
        columnNumber: 9
      }, this),
      children,
      /* @__PURE__ */ jsxDEV(TanStackRouterDevtools, { position: "bottom-right" }, void 0, false, {
        fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/__root.tsx",
        lineNumber: 155,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(ReactQueryDevtools, { buttonPosition: "bottom-left" }, void 0, false, {
        fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/__root.tsx",
        lineNumber: 156,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(Scripts, {}, void 0, false, {
        fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/__root.tsx",
        lineNumber: 157,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/__root.tsx",
      lineNumber: 84,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/__root.tsx",
    lineNumber: 80,
    columnNumber: 5
  }, this);
}
const Route$k = createFileRoute("/redirect")({
  beforeLoad: async () => {
    throw redirect({
      to: "/posts"
    });
  }
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
const $$splitComponentImporter$f = () => import("./deferred-O5sJVg7y.js");
const Route$j = createFileRoute("/deferred")({
  loader: ({
    context
  }) => {
    context.queryClient.prefetchQuery(deferredQueryOptions());
  },
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./_pathlessLayout-BW8gLd3X.js");
const Route$i = createFileRoute("/_pathlessLayout")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const DEPLOY_URL$2 = "http://localhost:3000";
const usersQueryOptions = () => queryOptions({
  queryKey: ["users"],
  queryFn: () => axios.get(DEPLOY_URL$2 + "/api/users").then((ms) => ms.data).catch(() => {
    throw new Error("Failed to fetch users");
  })
});
const userQueryOptions = (id) => queryOptions({
  queryKey: ["users", id],
  queryFn: () => axios.get(DEPLOY_URL$2 + "/api/users/" + id).then((r) => r.data).catch(() => {
    throw new Error("Failed to fetch user");
  })
});
const $$splitComponentImporter$d = () => import("./users.route-CNBmrXoJ.js");
const Route$h = createFileRoute("/users")({
  loader: async ({
    context
  }) => {
    await context.queryClient.ensureQueryData(usersQueryOptions());
  },
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const DEPLOY_URL$1 = "http://localhost:3000";
const stationsQueryOptions = () => queryOptions({
  queryKey: ["stations"],
  queryFn: () => axios.get(DEPLOY_URL$1 + "/api/stations").then((s) => s.data).catch(() => {
    throw new Error("Failed to fetch stations");
  })
});
const $$splitComponentImporter$c = () => import("./stations.route-DSfk_c90.js");
const Route$g = createFileRoute("/stations")({
  loader: async ({
    context
  }) => {
    await context.queryClient.ensureQueryData(stationsQueryOptions());
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
const $$splitComponentImporter$b = () => import("./posts.route-2DzWNK-1.js");
const Route$f = createFileRoute("/posts")({
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
const DEPLOY_URL = "http://localhost:3000";
const currentWeatherQueryOptions = () => queryOptions({
  queryKey: ["currentWeather"],
  queryFn: () => axios.get(DEPLOY_URL + "/api/currentweather").then((s) => s.data).catch(() => {
    throw new Error("Failed to fetch weather");
  })
});
const observedAt = () => {
  let s = (/* @__PURE__ */ new Date()).toISOString().slice(0, 15).replace("T", " ") + "0:00";
  return new Date(s).getTime() / 1e3;
};
const $$splitComponentImporter$a = () => import("./currentWeather.route-DHWT6P_K.js");
const Route$e = createFileRoute("/currentWeather")({
  loader: async ({
    context
  }) => {
    await context.queryClient.ensureQueryData(currentWeatherQueryOptions());
  },
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./index-iis_4VJZ.js");
const Route$d = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./users.index-CLx6tbsu.js");
const Route$c = createFileRoute("/users/")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./stations.index-BhOEza2l.js");
const Route$b = createFileRoute("/stations/")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./posts.index-DXbP-NXx.js");
const Route$a = createFileRoute("/posts/")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
console.warn('[tanstack-router] These exports from "/home/slavam22/sites/start-basic-react-query/src/routes/users.$userId.tsx" will not be code-split and will increase your bundle size:\n- UserErrorComponent\nFor the best optimization, these items should either have their export statements removed, or be imported from another location that is not a route file.');
const $$splitNotFoundComponentImporter$1 = () => import("./users._userId-BedtN461.js");
const $$splitComponentImporter$5 = () => import("./users._userId-BGhDuFN7.js");
const Route$9 = createFileRoute("/users/$userId")({
  loader: async ({
    context,
    params: {
      userId
    }
  }) => {
    await context.queryClient.ensureQueryData(userQueryOptions(userId));
  },
  errorComponent: UserErrorComponent,
  component: lazyRouteComponent($$splitComponentImporter$5, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent")
});
function UserErrorComponent({
  error
}) {
  return /* @__PURE__ */ jsxDEV(ErrorComponent, { error }, void 0, false, {
    fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/users.$userId.tsx",
    lineNumber: 23,
    columnNumber: 10
  }, this);
}
console.warn('[tanstack-router] These exports from "/home/slavam22/sites/start-basic-react-query/src/routes/posts.$postId.tsx" will not be code-split and will increase your bundle size:\n- PostErrorComponent\nFor the best optimization, these items should either have their export statements removed, or be imported from another location that is not a route file.');
const $$splitComponentImporter$4 = () => import("./posts._postId-Dxymci2d.js");
const $$splitNotFoundComponentImporter = () => import("./posts._postId--Z500xGT.js");
const Route$8 = createFileRoute("/posts/$postId")({
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
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
function PostErrorComponent({
  error
}) {
  return /* @__PURE__ */ jsxDEV(ErrorComponent, { error }, void 0, false, {
    fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/posts.$postId.tsx",
    lineNumber: 33,
    columnNumber: 10
  }, this);
}
const Route$7 = createFileRoute("/api/users")({
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
const Route$6 = createFileRoute("/api/stations")({
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
const Route$5 = createFileRoute("/api/currentWeather")({
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
const $$splitComponentImporter$3 = () => import("./_nested-layout-BgLVaYpN.js");
const Route$4 = createFileRoute("/_pathlessLayout/_nested-layout")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./posts_._postId.deep-DL1BCG_r.js");
const $$splitErrorComponentImporter = () => import("./posts_._postId.deep-cGdlp3fA.js");
const Route$3 = createFileRoute("/posts_/$postId/deep")({
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
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const Route$2 = createFileRoute("/api/users/$id")({
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
const $$splitComponentImporter$1 = () => import("./route-b-B9g3p9Bd.js");
const Route$1 = createFileRoute("/_pathlessLayout/_nested-layout/route-b")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./route-a-Bsuuxn3l.js");
const Route = createFileRoute("/_pathlessLayout/_nested-layout/route-a")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const RedirectRoute = Route$k.update({
  id: "/redirect",
  path: "/redirect",
  getParentRoute: () => Route$l
});
const DeferredRoute = Route$j.update({
  id: "/deferred",
  path: "/deferred",
  getParentRoute: () => Route$l
});
const PathlessLayoutRoute = Route$i.update({
  id: "/_pathlessLayout",
  getParentRoute: () => Route$l
});
const UsersRouteRoute = Route$h.update({
  id: "/users",
  path: "/users",
  getParentRoute: () => Route$l
});
const StationsRouteRoute = Route$g.update({
  id: "/stations",
  path: "/stations",
  getParentRoute: () => Route$l
});
const PostsRouteRoute = Route$f.update({
  id: "/posts",
  path: "/posts",
  getParentRoute: () => Route$l
});
const CurrentWeatherRouteRoute = Route$e.update({
  id: "/currentWeather",
  path: "/currentWeather",
  getParentRoute: () => Route$l
});
const IndexRoute = Route$d.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$l
});
const UsersIndexRoute = Route$c.update({
  id: "/",
  path: "/",
  getParentRoute: () => UsersRouteRoute
});
const StationsIndexRoute = Route$b.update({
  id: "/",
  path: "/",
  getParentRoute: () => StationsRouteRoute
});
const PostsIndexRoute = Route$a.update({
  id: "/",
  path: "/",
  getParentRoute: () => PostsRouteRoute
});
const UsersUserIdRoute = Route$9.update({
  id: "/$userId",
  path: "/$userId",
  getParentRoute: () => UsersRouteRoute
});
const PostsPostIdRoute = Route$8.update({
  id: "/$postId",
  path: "/$postId",
  getParentRoute: () => PostsRouteRoute
});
const ApiUsersRoute = Route$7.update({
  id: "/api/users",
  path: "/api/users",
  getParentRoute: () => Route$l
});
const ApiStationsRoute = Route$6.update({
  id: "/api/stations",
  path: "/api/stations",
  getParentRoute: () => Route$l
});
const ApiCurrentWeatherRoute = Route$5.update({
  id: "/api/currentWeather",
  path: "/api/currentWeather",
  getParentRoute: () => Route$l
});
const PathlessLayoutNestedLayoutRoute = Route$4.update({
  id: "/_nested-layout",
  getParentRoute: () => PathlessLayoutRoute
});
const PostsPostIdDeepRoute = Route$3.update({
  id: "/posts_/$postId/deep",
  path: "/posts/$postId/deep",
  getParentRoute: () => Route$l
});
const ApiUsersIdRoute = Route$2.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => ApiUsersRoute
});
const PathlessLayoutNestedLayoutRouteBRoute = Route$1.update({
  id: "/route-b",
  path: "/route-b",
  getParentRoute: () => PathlessLayoutNestedLayoutRoute
});
const PathlessLayoutNestedLayoutRouteARoute = Route.update({
  id: "/route-a",
  path: "/route-a",
  getParentRoute: () => PathlessLayoutNestedLayoutRoute
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
  PostsPostIdDeepRoute
};
const routeTree = Route$l._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => /* @__PURE__ */ jsxDEV(NotFound, {}, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/router.tsx",
      lineNumber: 16,
      columnNumber: 37
    }, this)
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
  Route$9 as R,
  userQueryOptions as a,
  Route$8 as b,
  currentWeatherQueryOptions as c,
  deferredQueryOptions as d,
  postQueryOptions as e,
  Route$3 as f,
  postsQueryOptions as p,
  router as r,
  stationsQueryOptions as s,
  usersQueryOptions as u
};
