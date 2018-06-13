export const admin = ['administration', 'administration.log', 'administration.clients',
  'administration.users', 'administration.settings', 'administration.general']
export const bids = ['bids', 'bids.inbox', 'bids.active', 'bids.history', 'bids.details']
export const settings = ['dataSettings',
  'categories', 'category', 'category.general', 'category.gallery',
  'brands', 'brand', 'brand.general', 'brand.gallery',
  'partners', 'partner', 'partner.general', 'partner.gallery',
  'userAgreement', 'currencies', 'units', 'display']
export const catalog = ['catalogs',
  'product', 'product.general', 'product.gallery', 'product.recommendation', 'product.reviews']

export const getRoutes = function (types) {
  let names = []
  if (types.requests_route_access) {
    names = names.concat(bids)
  }
  if (types.catalog_route_access) {
    names = names.concat(catalog)
  }
  if (types.admin_route_access) {
    names = names.concat(admin)
  }
  if (types.data_settings_route_access) {
    names = names.concat(settings)
  }
  names.push('dashboard')
  return names
}
