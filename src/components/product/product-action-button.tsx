import { CartIcon } from '@/components/icons/cart-icon';
import { Product } from '@/types';
import Link from '@/components/ui/link';

interface ProductActionButtonProps {
    product: Product;
  }

export default function ProductActionButton({ product }: ProductActionButtonProps) {
    return (
        <div className="w-full p-6 mx-auto border border-t-4 border-gray-300 border-t-blue-500 rounded-lg">
            <h2 className="text-base pb-3 flex item-center space-x-1 justify-center">
                <span className="font-semibold shrink-0">Best Price</span>
                <span>from</span>
                <Link
                    href="#"
                    className="text-blue-500 underline font-semibold flex item-center"
                >
                    <span>ebookstore.com</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"/>
                    </svg>
                </Link>
            </h2>
            <div className="flex flex-col w-full py-2 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-700">Price:</span>
                    <span className="font-semibold text-red-500 text-base">$39.99</span>
                </div>
                <div className="flex justify-between py-2">
                    <span className="text-gray-700">Format:</span>
                    <span className="bg-green-100 text-green-800 text-md px-2.5 py-0.5 rounded border border-green-400 font-semibold">Downloadable PDF</span>
                </div>
            </div>
            <button type="button" className="inline-flex items-center justify-center w-full mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-3 shadow-lg">
                <CartIcon className="w-4 h-4 mr-2"/> 
                Buy it Now
            </button>
            <div className="text-center text-[12px]">
                <span className="text-gray-700">We may earn commission from your purchase.</span>
            </div>
        </div>
    );
}