import { jsx } from "react/jsx-runtime";
import { N as NotFound } from "./router-ty2Aayz4.js";
import "@tanstack/react-query";
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
const SplitNotFoundComponent = () => {
  return /* @__PURE__ */ jsx(NotFound, { children: "User not found" });
};
export {
  SplitNotFoundComponent as notFoundComponent
};
