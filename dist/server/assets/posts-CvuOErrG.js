import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "../server.js";
import { notFound } from "@tanstack/react-router";
import axios from "redaxios";
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
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const fetchPosts_createServerFn_handler = createServerRpc({
  id: "cbb8ca69048418e62742f2c511faa56326b80ace384144a35bb3e0bf5e8124be",
  name: "fetchPosts",
  filename: "src/utils/posts.tsx"
}, (opts) => fetchPosts.__executeServer(opts));
const fetchPosts = createServerFn({
  method: "GET"
}).handler(fetchPosts_createServerFn_handler, async () => {
  console.info("Fetching posts...");
  return axios.get("https://jsonplaceholder.typicode.com/posts").then((r) => r.data.slice(0, 10));
});
const fetchPost_createServerFn_handler = createServerRpc({
  id: "0029094260fc8f554fa3ac223696de0e9591567ec6420250e896c91244c812c5",
  name: "fetchPost",
  filename: "src/utils/posts.tsx"
}, (opts) => fetchPost.__executeServer(opts));
const fetchPost = createServerFn({
  method: "GET"
}).inputValidator((d) => d).handler(fetchPost_createServerFn_handler, async ({
  data
}) => {
  console.info(`Fetching post with id ${data}...`);
  const post = await axios.get(`https://jsonplaceholder.typicode.com/posts/${data}`).then((r) => r.data).catch((err) => {
    console.error(err);
    if (err.status === 404) {
      throw notFound();
    }
    throw err;
  });
  return post;
});
export {
  fetchPost_createServerFn_handler,
  fetchPosts_createServerFn_handler
};
