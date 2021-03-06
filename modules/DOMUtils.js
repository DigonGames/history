export function addEventListener(node, event, listener) {
  if (node.addEventListener) {
    node.addEventListener(event, listener, false)
  } else {
    node.attachEvent('on' + event, listener)
  }
}

export function removeEventListener(node, event, listener) {
  if (node.removeEventListener) {
    node.removeEventListener(event, listener, false)
  } else {
    node.detachEvent('on' + event, listener)
  }
}

export function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  return window.location.href.split('#')[1] || ''
}

export function replaceHashPath(path) {
  window.location.replace(
    window.location.pathname + window.location.search + '#' + path
  )
}

export function getWindowPath() {
  return window.location.pathname + window.location.search + window.location.hash
}

export function go(n) {
  if (n)
    window.history.go(n)
}

export function getUserConfirmation(message, callback) {
  callback(window.confirm(message))
}

/**
 * Returns true if the HTML5 history API is supported. Taken from modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
 */
export function supportsHistory() {
  let ua = navigator.userAgent
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false
  }
  return window.history && 'pushState' in window.history
}

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */
export function supportsGoWithoutReloadUsingHash() {
  let ua = navigator.userAgent
  return ua.indexOf('Firefox') === -1
}
