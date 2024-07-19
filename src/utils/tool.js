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

/**
 * 根据错误码和数据的存在情况，决定调用哪个回调函数。
 * 当错误码为0，且数据存在且非空时，调用第一个回调函数；否则调用第二个回调函数。
 *
 * @param {number} errorCode - 错误码，用于判断请求是否成功。
 * @param {Array} data - 请求返回的数据。
 * @param {Function} callback1 - 请求成功时调用的回调函数。
 * @param {Function} callback2 - 请求失败时调用的回调函数。
 */
function getData(errorCode, data, callback1, callback2) {
  if (errorCode === 0 && data && data.length > 0) {
    callback1()
  } else {
    callback2()
  }
}

export { trimSpace, debounce, getData }
