export default defineEventHandler((event) => {
    if (event.node.req.url.startsWith('/api/')) return;
    console.log('New request: ' + getRequestURL(event));
});