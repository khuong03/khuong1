"use client";
import { useState, useEffect } from "react";
import Trailer from "@/component/Trailer";

export default function Page({ params }: { params: { id: string } }) {
  const [movieData, setMovieData] = useState(null);
  const [movieData1, setMovieData1] = useState(null);
  const [movieData2, setMovieData2] = useState(null);
  const [movieData3, setMovieData3] = useState(null);
  


  const [nut, setNut] = useState(1);

  const nutbam = (nut: number) => {
    setNut(nut);
  }
  
  useEffect(() => {
  fetchData();
  fetchData1();
  fetchData2();
  fetchData3();
    
  }, [params.id]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=21b460812f19e8a02cd5c1ffba3d113d&language=vi-VN`
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

  const fetchData1 = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=21b460812f19e8a02cd5c1ffba3d113d`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMovieData1(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData2 = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}/reviews?api_key=21b460812f19e8a02cd5c1ffba3d113d`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMovieData2(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchData3 = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=21b460812f19e8a02cd5c1ffba3d113d`
      );
      console.log(response);
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMovieData3(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 
  return (
<div>
<div>My Post: {params.id}</div>
<div>
          {['Tổng quan', 'Diễn viên', 'Đánh giá'].map((label, index) => (
            <button className={`mr-4 ${nut === index + 1 ? 'text-[red]' : ''}`} key={index} onClick={() => nutbam(index + 1)}>
          {label}
            </button>
          ))}
        </div>
      {nut === 1 && (
         <div>
         {movieData && (
           <div>
             <h1>Tên Phim: {movieData?.original_title}</h1>
           </div>
         )
         } 
       </div>

      )}
    {nut === 2 && (
      <div>
      {movieData1 && (
        <div>
          {movieData1.cast.slice(0 , 4).map((dienvien : any) =>(
            <div key = {dienvien.id}>
              <p>diễn viên : {dienvien?.name}</p>
            </div>
          ))}
        </div>
      )
      } 
  
    </div>
    )}
     {nut === 3 && (
      <div>
      {movieData2 && (
        <div>
          {movieData2.results.slice(0 , 4).map((binhluan : any) =>(
            <div key = {binhluan.id}>
              <p>Tên : {binhluan?.author}</p>
              <p>comment : {binhluan?.content}</p>

            </div>
          ))}

        </div>
      )
      } 
  
    </div>
     )}

     <div>
     {movieData3 && (
        <div>
          {movieData3.results.slice(0 , 2).map((results : any) =>(
            <div key = {results.id}>
             <Trailer videoId= {results.key} name = {results.name} />
            </div>
          ))}
        </div>
      )
      } 
     </div>
    

</div>
  );
}
