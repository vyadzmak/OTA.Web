export const admin = ['administration', 'administration.log',
  'administration.clients', 'administration.client', 'administration.client.users',
  'administration.client.address', 'administration.client.info', 'administration.client.general',
  'administration.users', 'administration.settings', 'bids.cancelled', 'administration.general']
export const bids = ['bids', 'bids.inbox', 'bids.active', 'bids.history', 'bids.details']
export const settings = ['dataSettings',
  'categories', 'category', 'category.general', 'category.gallery',
  'brands', 'brand', 'brand.general', 'brand.gallery',
  'partners', 'partner', 'partner.general', 'partner.gallery',
  'userAgreement', 'currencies', 'units', 'display', 'areas', 'area']
export const catalog = ['catalogs',
  'product', 'product.general', 'product.gallery', 'product.recommendation', 'product.reviews']
export const messageRoutes = ['messages']
export const eventRoutes = ['events']

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
  if (types.messages_route_access) {
    names = names.concat(messageRoutes)
  }
  if (types.events_route_access) {
    names = names.concat(eventRoutes)
  }
  names = [...names]
  names.push('dashboard')
  return names
}
