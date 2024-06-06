import type { Product } from '@/types';
import Router from 'next/router';
import { motion } from 'framer-motion';
import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { useModalAction } from '@/components/modal-views/context';
import routes from '@/config/routes';
import { PreviewIcon } from '@/components/icons/preview-icon';
import { DetailsIcon } from '@/components/icons/details-icon';
import placeholder from '@/assets/images/placeholders/product.svg';
import { fadeInBottomWithScaleX } from '@/lib/framer-motion/fade-in-bottom';
import { useTranslation } from 'next-i18next';

// truncate function to cut words
function truncate(str: string | undefined, num: number) {
  if (!str) {
    return '';
  }

  const words = str.split(' ');
  return words.length > num ? words.slice(0, num).join(' ') + "..." : str;
}

export default function Card({ product }: { product: Product }) {
  const { name, slug, image, author, publisher, edition, year } = product ?? {};
  const { openModal } = useModalAction();
  const goToDetailsPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    Router.push(routes.productUrl(slug));
  };
  const { t } = useTranslation('common');
  return (
    <motion.div variants={fadeInBottomWithScaleX()} title={name} className='shadow-lg rounded-md bg-light-100'>
      <div className="group relative flex aspect-[4/5] w-full justify-center overflow-hidden rounded-tl-md rounded-tr-md">
        
        <Image
          alt={name}
          fill
          quality={100}
          src={image ?? placeholder}
          className="bg-light-500 object-cover dark:bg-dark-400"
          sizes="(max-width: 768px) 50vw,
              (max-width: 1200px) 33vw,
              25vw"
        />
        <div
          onClick={() => {
            openModal('PRODUCT_DETAILS', { slug });
            // history.pushState(null, '', routes.productUrl(slug));
          }}
          className="absolute left-0 top-0 z-10 flex h-full w-full cursor-pointer items-center justify-center gap-9 bg-dark/60 p-4 opacity-0 backdrop-blur-sm transition-all group-hover:gap-5 group-hover:opacity-100"
        >
          <button
            className="text-center font-medium text-light text-xs"
          >
            <div
              className="mb-2 flex items-center h-11 w-11 justify-center rounded-full bg-dark-800 text-light backdrop-blur-sm transition-all hover:bg-brand"
            >
              <PreviewIcon className="h-4 w-4"/>
            </div>
            {t('text-preview')}
          </button>
          <button
            onClick={goToDetailsPage}
            className="relative z-[11] text-center font-medium text-light text-xs"
          >
            <div
              className="mb-2 flex items-center h-11 w-11 justify-center rounded-full bg-dark-800 text-light backdrop-blur-sm transition-all hover:bg-brand"
            >
              <DetailsIcon className="h-4 w-4"/>
            </div>
            {t('text-details')}
          </button>
        </div>
      </div>
      <div className="pt-3.5 px-3 pb-5">
        
        <h3 
          title={name}
          className="text-sm w-full mr-auto mb-0.5 font-medium text-dark-100"
        >
          <AnchorLink href={routes.productUrl(slug)}>{truncate(name, 7)}</AnchorLink>
        </h3>
        <div className='flex pt-2 text-gray text-sm'>
          {edition && (   
            <div>
              {edition}
            </div>
          )}
          {year && (   
            <div className="pl-2">
              ({year})
            </div>
          )}
        </div>   
        {author && (   
          <div className="flex pt-1">
            <span>by:</span>
            {/* split used to split the author name by comma or semicolon, 
            get the first author */}
            <div className="text-sm text-gray pl-2">
            {author.split(/[,;]/).length > 1 ? `${author.split(/[,;]/)[0]}...` : author.split(/[,;]/)[0]}
            </div>
          </div>
        )}
        
      </div>
    </motion.div>
  );
}
