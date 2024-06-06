import type { NextPageWithLayout } from '@/types';
import type { GetStaticProps } from 'next';
import ExploreLayout from '@/layouts/_explore_layout';
import Seo from '@/layouts/_seo';
import routes from '@/config/routes';
import { dehydrate, QueryClient } from 'react-query';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

//Typesense
import { typesenseInstantsearchAdapter } from '@/config/typesenseConfig';
import ResultTemplate from "@/components/search/instant-search-result";
import TypesenseFilter from '@/components/search/typesense-filter-sidebar';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
  Pagination,
} from "react-instantsearch";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  if (!locale) {
    throw new Error('Locale is undefined');
  }
  const translations = await serverSideTranslations(locale, ['common']);
  return {
    props: {
      ...translations,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60, // In seconds
  };
};

const Explore: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        title="UI Design Resources, UI Kits, Wireframes, Icons and More"
        description="Fastest digital download template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        url={routes.home}
      />
      
      <div className="search-header flex w-full h-full top-20 -mx-0.5 bg-light-100 pt-8">
        <InstantSearch
            indexName="animes"
            searchClient={typesenseInstantsearchAdapter.searchClient}
          >
            <Configure hitsPerPage={12} />
            <div className="search-container">
              <div className="lg:block hidden bottom-0 h-full flex-col justify-between overflow-y-auto border-r border-light-400 bg-light-100 text-dark-900">
                <TypesenseFilter />
              </div>
              <div className="flex w-full h-full flex-col justify-between ltr:sm:pl-[25px] pb-5">
                <div className="flex w-full flex-col">
                  <SearchBox
                    translations={{
                      placeholder: 'Search books by title, author, or ISBN',
                    }}
                  />
                  <div className="searchbox-gap"></div>
                  <Hits hitComponent={ResultTemplate} />      
                </div>
                <div className="pt-5 w-full flex justify-center">
                  <Pagination />
                </div>
              </div>
            </div>
          </InstantSearch>
        </div>
        
    </>
  );
};

Explore.getLayout = function getLayout(page) {
  return <ExploreLayout>{page}</ExploreLayout>;
};

export default Explore;
