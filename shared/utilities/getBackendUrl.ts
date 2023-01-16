export const getBackendUrl = (endpoint: string = '') => {
   return process.env.NEXT_PUBLIC_BACKEND_HOST + endpoint || 'http://localhost:3080' + endpoint;
}
