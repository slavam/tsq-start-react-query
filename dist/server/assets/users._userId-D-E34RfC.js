import { jsxs, jsx } from "react/jsx-runtime";
import { useSuspenseQuery } from "@tanstack/react-query";
import { b as Route, e as userQueryOptions } from "./router-ty2Aayz4.js";
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
import "@tanstack/react-router/ssr/server";
function UserComponent() {
  const params = Route.useParams();
  const userQuery = useSuspenseQuery(userQueryOptions(params.userId));
  const user = userQuery.data;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold underline", children: user.name }),
    /* @__PURE__ */ jsx("div", { className: "text-sm", children: user.email })
  ] });
}
export {
  UserComponent as component
};
