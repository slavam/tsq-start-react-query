import { jsxDEV } from "react/jsx-dev-runtime";
import { Outlet } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { c as currentWeatherQueryOptions } from "./router-CqzerLW7.js";
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
let temperature;
let windDirection;
let windSpeed;
let humidity;
function RouteComponent() {
  const absoluteZero = 273.15;
  const currentWeatherQuery = useSuspenseQuery(currentWeatherQueryOptions());
  currentWeatherQuery.data.map((data) => {
    let measurement = data.meas_hash;
    switch (measurement) {
      case 1451382247:
        temperature = (+data.value - absoluteZero).toFixed(1);
        break;
      case -789901366:
        windDirection = data.value;
        break;
      case 1345858116:
        windSpeed = data.value;
        break;
      case -996973625:
        humidity = data.value;
        break;
    }
  });
  return /* @__PURE__ */ jsxDEV("div", { className: "p-2 flex gap-2 ", children: [
    /* @__PURE__ */ jsxDEV("h1", { children: [
      "Текущая погода по состоянию на ",
      (/* @__PURE__ */ new Date()).toLocaleString("ru"),
      " "
    ] }, void 0, true, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/currentWeather.route.tsx?tsr-split=component",
      lineNumber: 31,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("hr", {}, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/currentWeather.route.tsx?tsr-split=component",
      lineNumber: 32,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-lg", children: /* @__PURE__ */ jsxDEV("ul", { className: "list-disc pl-4", children: [
      /* @__PURE__ */ jsxDEV("li", { className: "whitespace-nowrap", children: [
        "Температура: ",
        temperature,
        "°C"
      ] }, "1", true, {
        fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/currentWeather.route.tsx?tsr-split=component",
        lineNumber: 35,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("li", { className: "whitespace-nowrap", children: [
        "Направление ветра: ",
        windDirection,
        "°"
      ] }, "2", true, {
        fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/currentWeather.route.tsx?tsr-split=component",
        lineNumber: 38,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("li", { className: "whitespace-nowrap", children: [
        "Скорость ветра: ",
        windSpeed,
        "м/с"
      ] }, "3", true, {
        fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/currentWeather.route.tsx?tsr-split=component",
        lineNumber: 41,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("li", { className: "whitespace-nowrap", children: [
        "Относительная влажность: ",
        humidity,
        "%"
      ] }, "4", true, {
        fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/currentWeather.route.tsx?tsr-split=component",
        lineNumber: 44,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/currentWeather.route.tsx?tsr-split=component",
      lineNumber: 34,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/currentWeather.route.tsx?tsr-split=component",
      lineNumber: 33,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("hr", {}, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/currentWeather.route.tsx?tsr-split=component",
      lineNumber: 49,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(Outlet, {}, void 0, false, {
      fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/currentWeather.route.tsx?tsr-split=component",
      lineNumber: 50,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/slavam22/sites/start-basic-react-query/src/routes/currentWeather.route.tsx?tsr-split=component",
    lineNumber: 30,
    columnNumber: 10
  }, this);
}
export {
  RouteComponent as component
};
