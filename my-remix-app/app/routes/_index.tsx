import {LoaderFunctionArgs, MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import React from "react";
import Content from "~/components/content/Content";
import HeaderWithSearch from "~/components/header/header-with-search/HeaderWithSearch";

export const meta: MetaFunction = () => {
  return [
    { title: "Movie Tape" },
    { name: "description", content: "Welcome to Movie Tape!" },
  ];
};

export async function loader({request}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  const sort = url.searchParams.get("sort");
  const genre = url.searchParams.get("genre");

  const result = await fetch(`http://localhost:4000/movies?sortBy=${sort || ''}&sortOrder=asc&searchBy=title&search=${search || ''}&filter=${genre || ''}&limit=18`);

  if (!result) {
    throw new Response("Not Found", { status: 404 });
  }

  return result.json();
}

export default function _index() {
  const movieList = useLoaderData()?.data;

  const onMovieDelete = (id: number) => {
    console.log(`Movie ${id} is removed`);
  }

  return (
      <>
        <HeaderWithSearch/>
        <Content movieList={movieList} onMovieDelete={onMovieDelete}/>
      </>
  );
}
