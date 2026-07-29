import { jsxDEV } from "react/jsx-dev-runtime";
import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { b as Route, e as postQueryOptions } from "./router-CqzerLW7.js";
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
function PostComponent() {
  const {
    postId
  } = Route.useParams();
  const postQuery = useSuspenseQuery(postQueryOptions(postId));
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxDEV("h4", { className: "text-xl font-bold underline", children: postQuery.data.title }, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/posts.$postId.tsx?tsr-split=component",
      lineNumber: 11,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "text-sm", children: postQuery.data.body }, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/posts.$postId.tsx?tsr-split=component",
      lineNumber: 12,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(Link, { to: "/posts/$postId/deep", params: {
      postId: postQuery.data.id
    }, activeProps: {
      className: "text-black font-bold"
    }, className: "inline-block py-1 text-blue-800 hover:text-blue-600", children: "Deep View" }, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/posts.$postId.tsx?tsr-split=component",
      lineNumber: 13,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/posts.$postId.tsx?tsr-split=component",
    lineNumber: 10,
    columnNumber: 10
  }, this);
}
export {
  PostComponent as component
};
