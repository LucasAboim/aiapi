export default defineEventHandler((event) => {
    setResponseHeaders(event, {
        'Access-Control-Allow-Origin': '*', // or your specific origin
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });

    if (getMethod(event) === 'OPTIONS') {
        return new Response(null, { status: 204 });
    }
});