import { jsxDEV } from "react/jsx-dev-runtime";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, Outlet } from "@tanstack/react-router";
import { p as postsQueryOptions } from "./router-CqzerLW7.js";
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
function PostsComponent() {
  const postsQuery = useSuspenseQuery(postsQueryOptions());
  return /* @__PURE__ */ jsxDEV("div", { className: "p-2 flex gap-2", children: [
    /* @__PURE__ */ jsxDEV("ul", { className: "list-disc pl-4", children: [...postsQuery.data, {
      id: "i-do-not-exist",
      title: "Non-existent Post"
    }].map((post) => {
      return /* @__PURE__ */ jsxDEV("li", { className: "whitespace-nowrap", children: /* @__PURE__ */ jsxDEV(Link, { to: "/posts/$postId", params: {
        postId: post.id
      }, className: "block py-1 text-blue-800 hover:text-blue-600", activeProps: {
        className: "text-black font-bold"
      }, children: /* @__PURE__ */ jsxDEV("div", { children: post.title.substring(0, 20) }, void 0, false, {
        fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/posts.route.tsx?tsr-split=component",
        lineNumber: 18,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/posts.route.tsx?tsr-split=component",
        lineNumber: 13,
        columnNumber: 15
      }, this) }, post.id, false, {
        fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/posts.route.tsx?tsr-split=component",
        lineNumber: 12,
        columnNumber: 16
      }, this);
    }) }, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/posts.route.tsx?tsr-split=component",
      lineNumber: 7,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("hr", {}, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/posts.route.tsx?tsr-split=component",
      lineNumber: 23,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(Outlet, {}, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/posts.route.tsx?tsr-split=component",
      lineNumber: 24,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/posts.route.tsx?tsr-split=component",
    lineNumber: 6,
    columnNumber: 10
  }, this);
}
export {
  PostsComponent as component
};
