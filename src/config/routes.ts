const routes = {
  home: '/',
  advancedsearch: '/explore',
  authors: '/authors',
  explore: '/explore',
  popularProducts: '/popular-products',
  about: '/about-us',
  contact: '/contact-us',
  purchases: '/purchases',
  wishlists: '/account/mylist',
  reports: '/reports',
  questions: '/questions',
  profile: '/account/profile',
  checkout: '/checkout',
  help: '/help',
  licensing: '/licensing',
  refund: '/refund',
  terms: '/terms',
  privacy: '/privacy',
  password: '/password',
  feed: '/feed',
  wallet: '/wallet',
  followedShop: '/followed-authors',
  orderUrl: (tracking_number: string) =>
    `/orders/${encodeURIComponent(tracking_number)}`,
  productUrl: (slug: string) => `/products/${slug}`,
  tagUrl: (slug: string) => `/products/tags/${slug}`,
  shopUrl: (slug: string) => `/authors/${slug}`,
  product: (slug: string) => {
    return `/products/${encodeURIComponent(slug)}`;
  },
  cards: '/cards',
};
export default routes;
