import { jsxDEV } from "react/jsx-dev-runtime";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Outlet } from "@tanstack/react-router";
import { s as stationsQueryOptions } from "./router-CqzerLW7.js";
import "@tanstack/react-router-ssr-query";
import "@tanstack/react-query-devtools";
import "@tanstack/react-router-devtools";
import "redaxios";
import "../server.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
function StationsComponent() {
  const stationsQuery = useSuspenseQuery(stationsQueryOptions());
  console.log(JSON.stringify(stationsQuery.data));
  return /* @__PURE__ */ jsxDEV("div", { className: "p-2 flex gap-2", children: [
    /* @__PURE__ */ jsxDEV("ul", { className: "list-disc pl-4", children: [...stationsQuery.data].map((station) => {
      return /* @__PURE__ */ jsxDEV("li", { className: "whitespace-nowrap", children: /* @__PURE__ */ jsxDEV("div", { children: [
        station.sindex,
        " ",
        station.station_name
      ] }, void 0, true, {
        fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/stations.route.tsx?tsr-split=component",
        lineNumber: 11,
        columnNumber: 15
      }, this) }, station.sindex, false, {
        fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/stations.route.tsx?tsr-split=component",
        lineNumber: 10,
        columnNumber: 16
      }, this);
    }) }, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/stations.route.tsx?tsr-split=component",
      lineNumber: 8,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("hr", {}, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/stations.route.tsx?tsr-split=component",
      lineNumber: 15,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(Outlet, {}, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/stations.route.tsx?tsr-split=component",
      lineNumber: 16,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/stations.route.tsx?tsr-split=component",
    lineNumber: 7,
    columnNumber: 10
  }, this);
}
export {
  StationsComponent as component
};
