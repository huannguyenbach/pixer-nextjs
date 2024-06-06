import React, { useState, useEffect } from 'react';
import Image from '@/components/ui/image';
import placeholder from '@/assets/images/placeholders/product.svg';
import { Product } from '@/types';
import ProductSocialShare from '@/components/product/product-social-share';
import FavoriteButton from '../favorite/favorite-button';
import Link from '@/components/ui/link';
import { Author } from '@/components/authors/author-detail-link';
import { ChevronUp } from '@/components/icons/chevron-up';
import { ChevronDown } from '@/components/icons/chevron-down';
import ProductActionButton from '@/components/product/product-action-button';

interface Props {
  product: Product;
  id: string;
  name: string;
  description: string;
  author: string;
  print_isbn: string;
  etext_isbn: string;
  publisher: string;
  edition: string;
  image: string;
  year: number;
  slug: string;
}

export default function BookDetails({
  product,
  id,
  name,
  description,
  author,
  print_isbn,
  etext_isbn,
  publisher,
  edition,
  image,
  year,
  slug,
}: Props) {
  const className = "text-sm leading-[1.9em]";
  const rowClass = "pr-5 py-1 font-medium whitespace-nowrap";
  const [showMore, setShowMore] = useState(false);
  
  useEffect(() => {
    setShowMore(false);

  }, [description]);

  return (
    // Show book details
      <div className="flex w-full flex-col lg:flex-row p-8 lg:space-x-8">
        <div className="flex flex-col md:flex-row md:space-x-8 lg:w-[70%]">
          <div className="items-center justify-center pb-5 md:w-[160px] shrink-0">
            <div className="pb-8">
              <Image
                src={image ?? placeholder}
                alt={name}
                width={200}
                height={250}
                className="mx-auto w-[200px] md:w-full drop-shadow-xl rounded-lg"
              />
            </div>
            <div className="max-w-[200px] mx-auto">
              <FavoriteButton product_id={product?.id} />
            </div>
          </div>
          
          {/* Show book information */}
          <div className="flex flex-col flex-grow justify-between text-13px">
            <div className="pb-5">
              <h2
                title={name}
                className="pb-5 text-base font-medium text-black md:text-lg g:pl-4 lg:pr-5 3xl:text-xl"
              >
                  {name}
              </h2>
              <div>
                <table className="text-left text-black">
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* author */}
                    {author && (
                      <Author author={author} className={className} rowClass={rowClass} />
                    )}
                    {/* Publisher */}
                    {publisher && (
                      <tr className={className}>
                        <td className={rowClass}>
                          {'Publisher'}:
                        </td>
                        <td>
                        <Link 
                          className="text-blue-700 underline hover:no-underline"
                          href={`/publisher/${publisher}`}
                        >
                          {publisher}
                        </Link>  
                        </td>
                      </tr>
                    )}
                    {/* print ISBNs */}
                    {print_isbn && (
                      <tr className={className}>
                        <td className={rowClass}>
                          {'Print ISBN'}:
                        </td>
                        <td>{print_isbn}</td>
                      </tr>
                    )}
                    {/* eText ISBN */}
                    {etext_isbn && (
                      <tr className={className}>
                        <td className={rowClass}>                 
                          {'eText ISBN'}:
                        </td>
                        <td>{etext_isbn}</td>
                      </tr>
                    )}
                    {/* Edition */}
                    {edition && (
                      <tr className={className}>
                        <td className={rowClass}>                 
                          {'Edition'}:
                        </td>
                        <td>{edition}</td>
                      </tr>
                    )}
                    {/* Copyright Year */}
                    {year && (
                      <tr className={className}>
                        <td className={rowClass}>                 
                          {'Copyright Year'}:
                        </td>
                        <td>{year}</td>
                      </tr>
                    )}
                    </tbody>
                </table>
                <div className="pt-5 leading-[1.9em] text-black">
                  <div className="text-lg pb-4 w-full font-medium">Description</div>
                  <div className="text-sm leading-[1.9em] w-full">
                    <div
                      style={{
                        maxHeight: showMore ? 'none' : '5.7em',
                        overflow: 'hidden',
                      }}
                    >
                      {description}
                    </div>
                    {description.length > 250 && (
                    <button 
                      onClick={() => setShowMore(!showMore)} 
                      className="text-blue-500 hover:bg-light-100 flex items-center"
                    >
                      {showMore ? 'Show Less' : 'Show More'}
                      {showMore ? <ChevronUp /> : <ChevronDown />}    
                    </button>
                    )}
                  </div>
                </div>    
              </div>
            </div>
          </div>
        </div>
        {/* show some action buttons */}
        <div className="flex flex-col flex-grow">
          <div className="w-full xs:gap-2.5 pb-4">
            <ProductActionButton product={product} />
          </div>
          <div className="w-full">
            <ProductSocialShare productSlug={slug} />
          </div>
        </div>
      </div>
  );
}
