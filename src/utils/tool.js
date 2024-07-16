// 去除字符串空格的回调函数
function trimSpace(str) {
  return str.replace(/\s+/g, '')
}

/**
 * 防抖函数生成器。
 *
 * 该函数用于装饰其他函数，以限制其调用频率。当被装饰的函数频繁调用时，防抖函数会推迟其执行，
 * 直到调用间隔超过指定的延迟时间。这在处理高频率事件（如窗口resize或输入框keyup）时非常有用，
 * 可以减少不必要的计算或调用，提高应用的性能。
 *
 * @param {Function} fn 被装饰的函数。
 * @param {number} delay 延迟时间，单位为毫秒。
 * @returns {Function} 返回一个新的防抖函数。
 */
function debounce(fn, delay) {
  let timeoutId = null
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
export { trimSpace, debounce }
