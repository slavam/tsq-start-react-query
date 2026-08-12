import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { f as Route, a as postQueryOptions } from "./router-ty2Aayz4.js";
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
function PostDeepComponent() {
  const {
    postId
  } = Route.useParams();
  const postQuery = useSuspenseQuery(postQueryOptions(postId));
  return /* @__PURE__ */ jsxs("div", { className: "p-2 space-y-2", children: [
    /* @__PURE__ */ jsx(Link, { to: "/posts", className: "block py-1 text-blue-800 hover:text-blue-600", children: "← All Posts" }),
    /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold underline", children: postQuery.data.title }),
    /* @__PURE__ */ jsx("div", { className: "text-sm", children: postQuery.data.body })
  ] });
}
export {
  PostDeepComponent as component
};
