import { jsxs, jsx } from "react/jsx-runtime";
import { Outlet } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { c as currentWeatherQueryOptions } from "./router-ty2Aayz4.js";
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
  return /* @__PURE__ */ jsxs("div", { className: "p-2 flex gap-2 ", children: [
    /* @__PURE__ */ jsxs("h1", { children: [
      "Текущая погода по состоянию на ",
      (/* @__PURE__ */ new Date()).toLocaleString("ru"),
      " "
    ] }),
    /* @__PURE__ */ jsx("hr", {}),
    /* @__PURE__ */ jsx("div", { className: "font-bold text-lg", children: /* @__PURE__ */ jsxs("ul", { className: "list-disc pl-4", children: [
      /* @__PURE__ */ jsxs("li", { className: "whitespace-nowrap", children: [
        "Температура: ",
        temperature,
        "°C"
      ] }, "1"),
      /* @__PURE__ */ jsxs("li", { className: "whitespace-nowrap", children: [
        "Направление ветра: ",
        windDirection,
        "°"
      ] }, "2"),
      /* @__PURE__ */ jsxs("li", { className: "whitespace-nowrap", children: [
        "Скорость ветра: ",
        windSpeed,
        "м/с"
      ] }, "3"),
      /* @__PURE__ */ jsxs("li", { className: "whitespace-nowrap", children: [
        "Относительная влажность: ",
        humidity,
        "%"
      ] }, "4")
    ] }) }),
    /* @__PURE__ */ jsx("hr", {}),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
}
export {
  RouteComponent as component
};
