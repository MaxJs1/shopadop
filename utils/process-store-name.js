export default store => !store?.includes('.')
  ? `${store}.myshopify.com`
  : store
