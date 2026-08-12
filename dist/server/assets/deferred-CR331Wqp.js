import { jsxs, jsx } from "react/jsx-runtime";
import { d as deferredQueryOptions } from "./router-ty2Aayz4.js";
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
import "@tanstack/react-router/ssr/server";
function Deferred() {
  const [count, setCount] = useState(0);
  return /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
    /* @__PURE__ */ jsx(Suspense, { fallback: "Loading Middleman...", children: /* @__PURE__ */ jsx(DeferredQuery, {}) }),
    /* @__PURE__ */ jsxs("div", { children: [
      "Count: ",
      count
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", { onClick: () => setCount(count + 1), children: "Increment" }) })
  ] });
}
function DeferredQuery() {
  const deferredQuery = useSuspenseQuery(deferredQueryOptions());
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Deferred Query" }),
    /* @__PURE__ */ jsxs("div", { children: [
      "Status: ",
      deferredQuery.data.status
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      "Message: ",
      deferredQuery.data.message
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      "Time: ",
      deferredQuery.data.time.toISOString()
    ] })
  ] });
}
export {
  Deferred as component
};
