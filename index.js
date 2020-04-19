addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
  const apiUrls = await requestUrls();
  const resUrl = apiUrls[getRandomIndex(apiUrls.length)];
  const doc = await load(resUrl);
  return new Response(doc, { headers: { "Content-Type": "text/html" } });
}

/*
 * Fetch response from url resolving with text
 * @param {String} URL
 */
async function load(url) {
  const res = await fetch(url);
  const html = await res.text();
  return html;
}

/*
 * Get two URLs from API
 */
async function requestUrls() {
  const apiUrl = "https://cfw-takehome.developers.workers.dev/api/variants";
  const res = await fetch(apiUrl);
  const json = await res.json();
  return [...json.variants];
}

/*
 * Return random integer from 0 to max
 * @param {Number} max integer not inclusive
 */
function getRandomIndex(maxInt) {
  return Math.floor(Math.random() * Math.floor(maxInt));
}
