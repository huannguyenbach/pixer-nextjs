import { Product } from '@/types';
import BookDetails from '@/components/product/book-details'
import RelatebyAuthor from '@/components/product/related-by-author';
import ProductSidebar from '@/components/product/product-sidebar';
import Breadcrumb from '@/components/product/breadcrumbs';
import { useEffect } from 'react';
import CompareRetailerPrice from '@/components/product/compare-retailer-price';

type SingleProps = {
  product: Product;
};

const Single: React.FC<SingleProps> = ({ product }) => {
  const {
    name, slug, image, author, publisher, edition, year, description, print_isbn, etext_isbn, id
  } = product;

  // Track view and send to /api/track-view
  useEffect(() => {
    if (!sessionStorage.getItem(id)) {

      fetch('/api/track-view', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: id }),
      });

      // Mark this id as viewed in this session
      sessionStorage.setItem(id, 'viewed');
    }
  }, [id]);

  const firstAuthor = author.split(/[,;]/)[0]; //get the first author
  return (
    <div className="relative">
      <div className="w-full min-h-screen bg-light flex pt-10">
        <div className="h-full justify-center pb-6 flex-1 xl:w-auto xl:flex-grow">
          <div className="lg:mx-auto">
            <div className="w-full px-8 xl:px-16">
              <Breadcrumb product_isbn={print_isbn}/>
            </div>
            <div className="w-full lg:flex xl:px-8">
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
            </div>
            <div className="mb-10 px-8 xl:px-8">
              <div className="flex flex-col md:flex-row w-full xl:w-[70%]">
                <div className="hidden xl:w-[160px] xl:block"></div>
                <div className="w-full xl:flex-1 xl:ml-8">
                  <CompareRetailerPrice />
                </div>
              </div>
            </div>
            <div className="w-full xs:max-w-[430px] sm:max-w-[550px] md:max-w-[600px] lg:max-w-[960px] xl:max-w-[1100px] 3xl:max-w-[1155px]">
              <RelatebyAuthor author={firstAuthor} currentProductId={id} target="_self"/>
            </div>
            
          </div>
        </div>
        <aside className="xl:w-[300px] p-4 xl:p-8 h-full border-l border-light-200 xl:block hidden">
          <ProductSidebar />
        </aside>
      </div>
    </div>
  );
};

export default Single;
