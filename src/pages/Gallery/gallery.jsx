import React, { useEffect } from "react";
import Card1 from "../../components/Card1/card1.jsx";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchImages } from "../../unsplash/unsplash.jsx";
import  Navbar2  from '../../components/NavbarV2/navbar2.jsx';
import { db } from "../../instantDB/instantdb";

const Gallery = () => {
  const { data, fetchNextPage, hasNextPage, isPending, isError, error } =
    useInfiniteQuery({
      queryKey: ["images"],
      queryFn: ({ pageParam = 1 }) => fetchImages(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
            return lastPage.length > 0 ? allPages.length + 1 : undefined;},
    });

  if (isPending) {
    return (
      <div className="flex items-center justify-center p-20">Loading...</div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center p-20">
        Error: {error.message}
      </div>
    );
  }

  return (
   <div>
    <Navbar2/>
    <div className="flex flex-col justify-center items-center mt-20">
      
      
      <div className="w-[60%] grid grid-cols-3 gap-5">
        {data?.pages?.map((page, i) => (
          <React.Fragment key={i}>
            {page.map((image) => (
              <Card1 key={image.id} image={image} />
            ))}
          </React.Fragment>
        ))}
      </div>

      {hasNextPage && (
        <button
          className="mt-6 border px-4 py-2 cursor-pointer mb-10"
          onClick={() => fetchNextPage()}
        >
          Load more
        </button>
      )}
      
    </div>
    </div>

  );
};

export default Gallery;
