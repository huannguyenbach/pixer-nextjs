import React from "react";
import Link from '@/components/ui/link';
import Image from '@/components/ui/image';

const ResultTemplate = ({ hit }) => {
  return (
    <>
      <div className="anime-container">

      <Link 
          href={hit.link}
          className="relative aspect-[4/5] w-28 flex-shrink-0 border border-light-300 sm:w-32 md:w-36">
          <Image
            alt="PDF ebook"
            fill
            quality={100}
            src={hit.img_url}
            className="anime-image bg-light-400 object-cover"
          />
        </Link>
        <a href={hit.link} target="_blank">
          <h2 className="anime-title">{hit.title}</h2>
        </a>
        <h3 className="anime-genre">Genres: {hit.genre}</h3>
        <p>{hit.synopsis}</p>
      </div>
    </>
  );
};
export default ResultTemplate;