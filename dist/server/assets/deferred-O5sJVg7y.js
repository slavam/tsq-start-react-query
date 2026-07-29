import { jsxDEV } from "react/jsx-dev-runtime";
import { d as deferredQueryOptions } from "./router-CqzerLW7.js";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState, Suspense } from "react";
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
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
function Deferred() {
  const [count, setCount] = useState(0);
  return /* @__PURE__ */ jsxDEV("div", { className: "p-2", children: [
    /* @__PURE__ */ jsxDEV(Suspense, { fallback: "Loading Middleman...", children: /* @__PURE__ */ jsxDEV(DeferredQuery, {}, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/deferred.tsx?tsr-split=component",
      lineNumber: 9,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/deferred.tsx?tsr-split=component",
      lineNumber: 8,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { children: [
      "Count: ",
      count
    ] }, void 0, true, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/deferred.tsx?tsr-split=component",
      lineNumber: 11,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV("button", { onClick: () => setCount(count + 1), children: "Increment" }, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/deferred.tsx?tsr-split=component",
      lineNumber: 13,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/deferred.tsx?tsr-split=component",
      lineNumber: 12,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/deferred.tsx?tsr-split=component",
    lineNumber: 7,
    columnNumber: 10
  }, this);
}
function DeferredQuery() {
  const deferredQuery = useSuspenseQuery(deferredQueryOptions());
  return /* @__PURE__ */ jsxDEV("div", { children: [
    /* @__PURE__ */ jsxDEV("h1", { children: "Deferred Query" }, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/deferred.tsx?tsr-split=component",
      lineNumber: 20,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { children: [
      "Status: ",
      deferredQuery.data.status
    ] }, void 0, true, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/deferred.tsx?tsr-split=component",
      lineNumber: 21,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { children: [
      "Message: ",
      deferredQuery.data.message
    ] }, void 0, true, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/deferred.tsx?tsr-split=component",
      lineNumber: 22,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { children: [
      "Time: ",
      deferredQuery.data.time.toISOString()
    ] }, void 0, true, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/deferred.tsx?tsr-split=component",
      lineNumber: 23,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/deferred.tsx?tsr-split=component",
    lineNumber: 19,
    columnNumber: 10
  }, this);
}
export {
  Deferred as component
};
