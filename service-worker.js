/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["bower_components/google-apis/google-maps-api.html","065df93d2f0bf4a8c51cb6b2f18456bf"],["bower_components/google-map/google-map-marker.html","434ea2f270075310a78cd3f227ba093d"],["bower_components/google-map/google-map.html","64f5a68f7e608d81604ce87b01a62c80"],["bower_components/iron-ajax/iron-ajax.html","0bab888954043281bece291260a9d25d"],["bower_components/iron-ajax/iron-request.html","cbc57949fe9482d36bacbc123ce2be18"],["bower_components/iron-jsonp-library/iron-jsonp-library.html","c57eaf7f2d9e9d2637d17f7e47d72b0d"],["bower_components/iron-resizable-behavior/iron-resizable-behavior.html","5ef7b898157920149481d0e13d86cc7f"],["bower_components/iron-selector/iron-multi-selectable.html","f06166dcb565e61962f06fcbc5e60629"],["bower_components/iron-selector/iron-selectable.html","c3665d80b36a5a038098dae832940722"],["bower_components/iron-selector/iron-selection.html","8fd1203a9ba7ee1cdcd22c191f8ba7c8"],["bower_components/iron-selector/iron-selector.html","99b40d21c4642e81c2dc295860e76ed3"],["bower_components/polymer/lib/elements/array-selector.html","89dda60f7b0136c2ed8eda9a690ffdfe"],["bower_components/polymer/lib/elements/custom-style.html","9924417a57b05f43be6d4456c0272de8"],["bower_components/polymer/lib/elements/dom-bind.html","6fb2ca5ab6af5a14031d3c081ad86130"],["bower_components/polymer/lib/elements/dom-if.html","50a30ab36ef2adcaece4368eee3c4bb7"],["bower_components/polymer/lib/elements/dom-module.html","ff7101dc5b037becb673fd313d47eb28"],["bower_components/polymer/lib/elements/dom-repeat.html","688105ad86a92e619cfe7fbedb73f08b"],["bower_components/polymer/lib/legacy/class.html","fe8f8bb167cd04bc0399c7b942065981"],["bower_components/polymer/lib/legacy/legacy-element-mixin.html","e8979fda4a1fca183c043e05b1f77971"],["bower_components/polymer/lib/legacy/mutable-data-behavior.html","7140745fa1c768b7a3db24fcb0e4ad52"],["bower_components/polymer/lib/legacy/polymer-fn.html","e073e7877ac4680afe7dabad5906d359"],["bower_components/polymer/lib/legacy/polymer.dom.html","9543d926840b319222c9eb12e8b557d7"],["bower_components/polymer/lib/legacy/templatizer-behavior.html","c152d7ebbc2790a842729d72d29b2126"],["bower_components/polymer/lib/mixins/element-mixin.html","f73292088c4e0371703cb4d1247caa30"],["bower_components/polymer/lib/mixins/gesture-event-listeners.html","3fe0288897497f1226284f296ac345d1"],["bower_components/polymer/lib/mixins/mutable-data.html","e256e0ebb1aa93a135aeb43784473943"],["bower_components/polymer/lib/mixins/property-accessors.html","7b8161e60dc8557c24ac9cad3be8b3ad"],["bower_components/polymer/lib/mixins/property-effects.html","23f7c9cc49d150c87b16037bde57931b"],["bower_components/polymer/lib/mixins/template-stamp.html","9d2b01907b95e9ac06536c496d8925f3"],["bower_components/polymer/lib/utils/array-splice.html","6f44297ff952e3c34b2bada5dcd04da7"],["bower_components/polymer/lib/utils/async.html","16db8592c7ca246f0d7ae821b2f8b7ed"],["bower_components/polymer/lib/utils/boot.html","3391dfa5a91291f9a24cc8b7ba090450"],["bower_components/polymer/lib/utils/case-map.html","64a92e8ff052e4e0eef6f91c2b377672"],["bower_components/polymer/lib/utils/debounce.html","356e336d5a023cf35f84821e37db5e5c"],["bower_components/polymer/lib/utils/flattened-nodes-observer.html","4253023747057133d1def0f068535270"],["bower_components/polymer/lib/utils/flush.html","ba27adf065d373f6b0e434d0d8ef6fd9"],["bower_components/polymer/lib/utils/gestures.html","1d76da1420992e89d8db73ba043446b1"],["bower_components/polymer/lib/utils/import-href.html","d8b6004a95ea428da210fb8ac176b583"],["bower_components/polymer/lib/utils/mixin.html","5bccee39c3ba7d9c298c9276ab7525ae"],["bower_components/polymer/lib/utils/path.html","15575ff2f79d923e6f9ed443a1ea98b2"],["bower_components/polymer/lib/utils/render-status.html","60fa263b678961716ff8fe7e948c8f4a"],["bower_components/polymer/lib/utils/resolve-url.html","dfc0c7635dbb36cb322720ca162c05ec"],["bower_components/polymer/lib/utils/settings.html","b21de5bb0358e46b2fea01cf630d546d"],["bower_components/polymer/lib/utils/style-gather.html","7d45441ee15bca54657d3b70defbfdae"],["bower_components/polymer/lib/utils/templatize.html","2c06921c872be4694b71b09c1c222ae5"],["bower_components/polymer/lib/utils/unresolved.html","2ed3277470301933b1af10d413d8c614"],["bower_components/polymer/polymer-element.html","73aec03da74de712e62c42623c10556a"],["bower_components/polymer/polymer.html","a3d5804a9137000c9cef7a1e8a875210"],["bower_components/shadycss/apply-shim.html","5b73ef5bfcac4955f6c24f55ea322eb1"],["bower_components/shadycss/apply-shim.min.js","d6b6a1b29b935e96c7026fffc732d24c"],["bower_components/shadycss/custom-style-interface.html","7e28230b85cdcc2488e87172c3395d52"],["bower_components/shadycss/custom-style-interface.min.js","d2ad616a453d414d7e98a8e688f7c541"],["index.html","e1584ae39f06e04f1d9264c766e014f0"],["src/wwg-map/wwg-map.html","c3efe97cc7d3a14b59a0048da54c0bb8"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["\\/[^\\/\\.]*(\\?|$)"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







