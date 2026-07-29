import { jsxDEV } from "react/jsx-dev-runtime";
import { Link, Outlet } from "@tanstack/react-router";
function PathlessLayoutComponent() {
  return /* @__PURE__ */ jsxDEV("div", { children: [
    /* @__PURE__ */ jsxDEV("div", { children: "I'm a nested pathless layout" }, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/_pathlessLayout/_nested-layout.tsx?tsr-split=component",
      lineNumber: 4,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxDEV(Link, { to: "/route-a", activeProps: {
        className: "font-bold"
      }, children: "Go to route A" }, void 0, false, {
        fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/_pathlessLayout/_nested-layout.tsx?tsr-split=component",
        lineNumber: 6,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(Link, { to: "/route-b", activeProps: {
        className: "font-bold"
      }, children: "Go to route B" }, void 0, false, {
        fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/_pathlessLayout/_nested-layout.tsx?tsr-split=component",
        lineNumber: 11,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/_pathlessLayout/_nested-layout.tsx?tsr-split=component",
      lineNumber: 5,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV(Outlet, {}, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/_pathlessLayout/_nested-layout.tsx?tsr-split=component",
      lineNumber: 18,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/_pathlessLayout/_nested-layout.tsx?tsr-split=component",
      lineNumber: 17,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/_pathlessLayout/_nested-layout.tsx?tsr-split=component",
    lineNumber: 3,
    columnNumber: 10
  }, this);
}
export {
  PathlessLayoutComponent as component
};
