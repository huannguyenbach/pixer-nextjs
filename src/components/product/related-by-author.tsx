import { Swiper, SwiperSlide, Navigation } from '@/components/ui/slider';
import Image from '@/components/ui/image';
import { ChevronLeft } from '@/components/icons/chevron-left';
import { ChevronRight } from '@/components/icons/chevron-right';
import placeholder from '@/assets/images/placeholders/product.svg';
import supabase from '@/utils/supabase/supabaseClient';
import { useQuery } from 'react-query';
import { API_ENDPOINTS } from '@/data/client/endpoints';
import AnchorLink from '@/components/ui/links/anchor-link';
import {Product} from '@/types';
import routes from '@/config/routes';

function truncate(str: string, num: number) {
  const words = str.split(' ');
  return words.length > num ? words.slice(0, num).join(' ') + "..." : str;
}

interface RelateSliderProps {
  author: string;
  currentProductId: string;
  target: string;
  } 

const carouselBreakpoints = {
  1024: {
    slidesPerView: 6,
    spaceBetween: 24,
  },
};

export default function RelatebyAuthor({ author, currentProductId, target }: RelateSliderProps) {
    
    async function sameAuthorProducts() {
        const { data: products, error } = await supabase
        .from(API_ENDPOINTS.MAIN_SUPABASE_COLUMN)
        .select('*')
        .eq('year', '2019')
        // .ilike('author', `%${author}%`)
        .limit(10);
        if (error) throw error;
        return products;
    }
   
   const { data: products, isLoading, error } = useQuery('products', sameAuthorProducts);
   if (isLoading) return 'Loading related products...';
   if (error) return null;
   
   //Filter curent product from related products
   const relatedbyAuthor = products?.filter((product: Product) => product.id !== currentProductId);
   if (!relatedbyAuthor || relatedbyAuthor.length === 0) {
     return (
        <div className="w-full h-20 flex items-center justify-center bg-light-200">
          No more books, use our <a target='_blank' href={routes.advancedsearch} className="underline text-blue-500 ml-2">advanced search</a>
        </div>
      );
    }; // If products is null, return null

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center justify-between mb-5 md:pl-6 lg:pl-7 3xl:pl-8">
        <div className="-mt-1.5 mb-0 text-base xl:leading-8 font-bold">
            More books from <span>{author}</span>
        </div>     
      </div>
      <div className="relative py-4 px-8">
        <Swiper
          id=""
          speed={400}
          spaceBetween={20}
          slidesPerView={1.2}
          allowTouchMove={true}
          modules={[Navigation]}
          breakpoints={carouselBreakpoints}
          navigation={{
            nextEl: '.next',
            prevEl: '.prev',
          }}
        >
          {/* Only get related products, exclude the current product */}
          {relatedbyAuthor.map(
            (product: Product, index: number) =>
              product?.image && (
                <SwiperSlide
                  key={`popup-slider-key-${index}`}
                  className="relative mb-5 aspect-[3/5] w-full shadow-lg rounded-lg bg-light-100 2xl:mb-6 items-center"
                >
                  <AnchorLink href={routes.productUrl(product.slug)} target={target}>
                    <div className="bg-light-100 w-full rounded-lg">
                      <Image
                        alt={product.name ?? placeholder}
                        src={product?.image}
                        width={200}
                        height={250}
                        className="mx-auto w-full"
                      />
                      <div className="px-3 py-3">
                        <h3 className="text-xs text-dark-100 font-medium mt-2">
                          {truncate(product.name, 5)}
                        </h3>
                        {product.edition && ( 
                          <div className="text-xs text-dark-200 mt-1">
                            {product.edition}
                          </div>
                        )}
                        {product.year && ( 
                          <div className="text-xs text-dark-200 mt-1">
                            {product.year}
                          </div>
                        )}
                      </div>
                    </div>
                  </AnchorLink>
                </SwiperSlide>
              )
          )}
        </Swiper>
        <div className="absolute left-0 top-2/4 z-10 flex w-full items-center justify-between pl-1 pr-4 sm:pr-6 md:pl-2.5">
          <button className="prev flex h-8 w-8 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full border border-light-400 bg-light text-dark-100 shadow-xl hover:bg-light-200 focus:outline-none rtl:rotate-180 dark:border-dark-400 dark:bg-dark-400 dark:text-white hover:dark:bg-dark-300 xl:h-9 xl:w-9">
            <ChevronLeft className="h-4 w-4 xl:h-[18px] xl:w-[18px]" />
          </button>
          <button className="next flex h-8 w-8 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full border border-light-400 bg-light text-dark-100 shadow-xl hover:bg-light-200 focus:outline-none rtl:rotate-180 dark:border-dark-400 dark:bg-dark-400 dark:text-white hover:dark:bg-dark-300 xl:h-9 xl:w-9">
            <ChevronRight className="h-4 w-4 xl:h-[18px] xl:w-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
