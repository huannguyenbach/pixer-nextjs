import { useState } from 'react';

export default function CompareRetailerPrice() {


  return (
      <div className="bg-white shadow rounded border border-light-400">
        <div className="flex item-center text-center w-full bg-light-200 py-2 px-8">
          <h2 className="text-lg font-bold">Compare Retailer Price</h2>

        </div>
        <div className="divide-y divide-gray-200 px-8 transition-transform duration-1000 ease-in-out origin-top transform">
            <div className="grid grid-cols-4 gap-4 py-3 text-[14px]">
              <div className="flex items-center">
                <img src="https://via.placeholder.com/50" className="w-6 h-6 mr-2" />
                <span className="font-semibold shrink-0">ebookStore.com</span>
              </div>
              <div className="flex text-center items-center justify-center">
                <span className="font-medium">PDF ebook</span>
              </div>
              <div className="flex items-center justify-center text-red-500 font-semibold">
                <span>$44.98</span>
              </div>
              <div className="flex items-center justify-end text-blue-600 font-semibold">
                <button className="pr-1 py-2 underline hover:font-bold hover:no-underline">Shop Now</button>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"/>
                </svg>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 py-3 text-[14px]">
              <div className="flex items-center">
                <img src="https://via.placeholder.com/50" className="w-6 h-6 mr-2" />
                <span className="font-semibold shrink-0">abebooks.com</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="font-medium">New/Used</span>
              </div>
              <div className="flex items-center justify-center text-red-500 font-semibold">
                <span>$44.98</span>
              </div>
              <div className="flex items-center justify-end text-blue-600 font-semibold">
                <button className="pr-1 py-2 underline hover:font-bold hover:no-underline">Shop Now</button>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"/>
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 py-3 text-[14px]">
              <div className="flex items-center">
                <img src="https://via.placeholder.com/50" className="w-6 h-6 mr-2" />
                <span className="font-semibold shrink-0">TextbookRush.com</span>
              </div>
              <div className="flex items-center justify-center">
              <span className="font-medium">Buy/Rent</span>
              </div>
              <div className="flex items-center justify-center text-red-500 font-semibold">
                <span>$44.98</span>
              </div>
              <div className="flex items-center justify-end text-blue-600 font-semibold">
                <button className="pr-1 py-2 underline hover:font-bold hover:no-underline">Shop Now</button>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"/>
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 py-3 text-[14px]">
              <div className="flex items-center">
                <img src="https://via.placeholder.com/50" className="w-6 h-6 mr-2" />
                <span className="font-semibold shrink-0">amazon.com</span>
              </div>
              <div className="flex items-center justify-center">
              <span className="font-medium">-</span>
              </div>
              <div className="flex items-center justify-center text-red-500 font-semibold">
                <span>$44.98</span>
              </div>
              <div className="flex items-center justify-end text-blue-600 font-semibold">
                <button className="pr-1 py-2 underline hover:font-bold hover:no-underline">Shop Now</button>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"/>
                </svg>
              </div>
            </div>
        </div>
      </div>
    );
}