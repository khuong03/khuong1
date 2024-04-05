"use client";
import { useState, useEffect } from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import Link from 'next/link'

export default function Page() {
  const [movieData, setMovieData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=21b460812f19e8a02cd5c1ffba3d113d&language=vi-VN&page=${currentPage}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMovieData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onChange: PaginationProps["onChange"] = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="bg-red-500 h-[5vh]"></div>
      <div className="container mx-auto"></div>
      {movieData ? (
        <div className="grid grid-cols-5">
          {movieData.results.map((movie, index) => (
            <div key={index} className="border border-gray-100 p-2 rounded-lg">
             <Link href={`/movie/${movie?.id}`}>
             <img
                className="rounded"
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
              />
              <h1 className="font-bold mt-2">{movie.title}</h1></Link>
             
             
            </div>
          ))}

         
        </div>
      ) : (
        <p>Loading...</p>
      )}
       <Pagination
            current={currentPage}
            onChange={onChange}
            total={movieData?.total_pages}
          />
    </div>
  );
}
