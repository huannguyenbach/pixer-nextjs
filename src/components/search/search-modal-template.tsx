import React from "react";
import Link from "@/components/ui/link";
import Image from '@/components/ui/image';

const SearchModalItem = ({ hit }) => {
  return (
    <>
    <Link
      href={hit.link}
      className="w-full h-full"
    >
      <div className="flex items-start gap-4">
        <div className="relative aspect-[4/5] w-14 flex-shrink-0 border border-light-300 sm:w-16 md:w-18">
          <Image
            alt="PDF ebook"
            fill
            quality={100}
            src={hit.img_url}
            className="object-cover rounded-lg"
          />
        </div>
        <div className="sm:flex-start flex flex-1 flex-col gap-3 sm:justify-between md:gap-0">
          <div className="font-medium text-dark sm:mb-1.5 hover:text-blue-600 hover:underline">
            <h2 className="text-base">{hit.title}</h2>
          </div>
          <h3 className="anime-genre">Genres: {hit.genre}</h3>
        </div>
      </div>
    </Link>
    </>
  );
};
export default SearchModalItem;