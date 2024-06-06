
import { useModalState } from '@/components/modal-views/context';
import { useProduct } from '@/data/product';
import ProductPopupLoader from '@/components/product/product-popup-loader';
import { useTranslation } from 'next-i18next';
import RelatebyAuthor from '@/components/product/related-by-author';
import BookDetails from '@/components/product/book-details';

export default function ProductPopupDetails() {

  const { data } = useModalState();
  const { t } = useTranslation('common');
  const { product, isLoading } = useProduct(data.slug);
  if (!product && isLoading) return <ProductPopupLoader />;
  if (!product) return <div className="bg-white">{t('text-not-found')}</div>;
  
  const {id, name, description, slug, image, year, 
    edition, author, publisher, etext_isbn, print_isbn,
  } = product ?? {};

  const firstAuthor = author.split(/[,;]/)[0]; //get the first author
  
  return (
    <div className="flex max-w-full flex-col bg-light text-left xs:max-w-[430px] sm:max-w-[550px] md:max-w-[600px] lg:max-w-[960px] xl:max-w-[1100px] 3xl:max-w-[1155px]">
      <BookDetails
          product={product}
          id={id}
          name={name}
          description={description}
          author={author}
          print_isbn={print_isbn}
          etext_isbn={etext_isbn}
          publisher={publisher}
          edition={edition}
          image={image}
          year={year}
          slug={slug}
        />
      <RelatebyAuthor author={firstAuthor} currentProductId={id} target="_blank"/>
    </div>
  );
}
