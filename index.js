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
  let doc = await load(resUrl);
  doc = modifyVariants(doc);
  return new Response(doc, { headers: { "Content-Type": "text/html" } });
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

/*
 * Fetch response from url resolving with text
 * @param {String} URL
 */
async function load(url) {
  const res = await fetch(url);
  const html = await res.text();
  return html;
}

function modifyVariants(htmlText) {
  // Text replacement, had trouble implementing HTMLRewriter API, will learn more when I'm less busy :)
  let newHTML = htmlText;
  const replacePairs = [
    [/Variant/, "Magic Link"],
    [
      /!/,
      `. The text you see here is creative use of regular expressions, which I 
      think is hilarious. Check out my <a class="text-blue-500 font-bold" 
      href="https://github.com/emtes">GitHub</a> 
      or blog posts on <a class="text-blue-500 font-bold" 
      href="https://dev.to/emtes">DEV</a>!`,
    ],
    [/https:\/\/cloudflare.com/, "https://dev.to/emtes/so-linux-3i9k"],
    [/Return to cloudflare.com/, "Check out my latest blog post"],
  ];

  replacePairs.forEach((pair) => {
    newHTML = newHTML.replace(pair[0], pair[1]);
  });

  return newHTML;
}
