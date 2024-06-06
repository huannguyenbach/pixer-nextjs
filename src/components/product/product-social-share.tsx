import { Fragment} from 'react';
import routes from '@/config/routes';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  EmailIcon,
  EmailShareButton,
  WhatsappShareButton,
  WhatsappIcon,

} from 'react-share';
import { SendIcon} from '@/components/icons/send-icon';
import { useTranslation } from 'next-i18next';
import { Menu, Transition } from '@headlessui/react';

interface Props {
  productSlug: string;
  className?: string;
}
const sharebuttonclass = "text-md h-8 w-8 transition-all mx-1";

export default function ProductSocialShare({ productSlug }: Props) {
  const { t } = useTranslation('common');
  const productUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${routes.productUrl(
    productSlug
  )}`;
  return (
    <div className="mt-4">
      <div className="top-16 w-full text-center">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex items-center justify-center border border-slate-300 w-full px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 bg-light-200 rounded-xl hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              Share this book
              <SendIcon
                className="-mr-1 ml-2 h-4 w-4"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 flex">
                <Menu.Item>
                    <FacebookShareButton url={productUrl}>
                      <FacebookIcon round className={sharebuttonclass} />
                    </FacebookShareButton>
                </Menu.Item>
                <Menu.Item>
                    <TwitterShareButton url={productUrl}>
                      <TwitterIcon round className={sharebuttonclass} />
                    </TwitterShareButton>
                </Menu.Item>
                <Menu.Item>
                    <TelegramShareButton url={productUrl}>
                      <TelegramIcon round className={sharebuttonclass} />
                    </TelegramShareButton>
                </Menu.Item>
                <Menu.Item>
                    <EmailShareButton url={productUrl}>
                      <EmailIcon round className={sharebuttonclass} />
                    </EmailShareButton>
                </Menu.Item>
                <Menu.Item>
                    <WhatsappShareButton url={productUrl}>
                      <WhatsappIcon round className={sharebuttonclass} />
                    </WhatsappShareButton>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
