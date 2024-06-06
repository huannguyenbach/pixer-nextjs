import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { atom, useAtom } from 'jotai';
import { motion, AnimatePresence } from 'framer-motion';
import { useLockBodyScroll } from '@/lib/hooks/use-lock-body-scroll';
import { CloseIcon } from '@/components/icons/close-icon';
import { fadeInOut } from '@/lib/framer-motion/fade-in-out';
//Typesense
import { typesenseInstantsearchAdapter } from '@/config/typesenseConfig';
import SearchModalItem from "./search-modal-template";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
} from "react-instantsearch";

const searchAtom = atom(false);
export function useSearch() {
  const [isOpen, setIsOpen] = useAtom(searchAtom);
  function openSearch() {
    setIsOpen(true);
  }
  function closeSearch() {
    setIsOpen(false);
  }
  return {
    isOpen,
    openSearch,
    closeSearch,
  };
}

export default function SearchView() {
  const router = useRouter();
  const { isOpen, closeSearch } = useSearch();
  useLockBodyScroll(isOpen);
  useEffect(() => {
    // close search modal when route change
    router.events.on('routeChangeStart', closeSearch);
    return () => {
      router.events.off('routeChangeStart', closeSearch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="exit"
          animate="enter"
          exit="exit"
          variants={fadeInOut()}
          className="search-popup search-container fixed inset-0 z-50 h-screen w-full overflow-hidden bg-dark bg-opacity-60 p-5 py-0 sm:px-6 md:px-8 lg:px-10 xl:px-12 3xl:px-14 backdrop-blur opacity-100"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeSearch();
            }
          }}
        >
          <div className="absolute top-5 right-5 -m-2 p-2">
            <button
              type="button"
              className="w-7 h-7 bg-light-100 text-center justify-center rounded-full text-dark-900 outline-none transition-all hover:text-dark right-0 xl:top-6"
              onClick={closeSearch}
            >
              <span className="sr-only">Close</span>
              <CloseIcon className="h-4 w-4 focus-visible:outline-none lg:h-[18px] lg:w-[18px] mx-auto" />
            </button>
          </div>      
          <div className="search-header overflow-hidden relative w-full lg:max-w-3xl h-4/5 mx-auto bg-light-100 mt-12 z-20 mb-3 pb-1.5 pt-10 py-5 rounded-2xl">
            <h1 className="super-title text-2xl font-bold text-center text-black-500 pb-5">
              Quick search for millions of books by title, author, or ISBN
            </h1>
            {/* Show Search Box */}
            <InstantSearch
              indexName="animes"
              searchClient={typesenseInstantsearchAdapter.searchClient}
            >
              <Configure hitsPerPage={12} />
              <div className="w-full">
                <main>
                <div className="w-full px-5">
                  <SearchBox
                    translations={{
                      placeholder: 'Search books by title, author, or ISBN',
                    }}
                  />
                </div>
                  <div className="searchbox-gap"></div>
                  <div className="w-full pl-5">
                    <Hits hitComponent={SearchModalItem} />
                  </div>
                </main>                 
              </div>
            </InstantSearch>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
