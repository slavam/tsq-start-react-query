import { jsxDEV } from "react/jsx-dev-runtime";
import { useSuspenseQuery } from "@tanstack/react-query";
import { R as Route, a as userQueryOptions } from "./router-CqzerLW7.js";
import "@tanstack/react-router";
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
function UserComponent() {
  const params = Route.useParams();
  const userQuery = useSuspenseQuery(userQueryOptions(params.userId));
  const user = userQuery.data;
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxDEV("h4", { className: "text-xl font-bold underline", children: user.name }, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/users.$userId.tsx?tsr-split=component",
      lineNumber: 9,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "text-sm", children: user.email }, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/users.$userId.tsx?tsr-split=component",
      lineNumber: 10,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/users.$userId.tsx?tsr-split=component",
    lineNumber: 8,
    columnNumber: 10
  }, this);
}
export {
  UserComponent as component
};
