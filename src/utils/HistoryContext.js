/**
 * 导入React库和React Router DOM库的历史记录模块。
 * @import React 基础React库，用于创建组件和处理UI渲染。
 * @import { useHistory } from 'react-router-dom' React Router DOM库的历史记录钩子，用于访问浏览器的历史记录对象。
 */
import React, { createContext } from 'react'
import { useHistory } from 'react-router-dom'

/**
 * 创建一个名为HistoryContext的上下文，用于在组件之间共享历史记录对象。
 * 上下文提供了一个方法来访问和修改浏览器的历史记录。
 */
const HistoryContext = createContext()

/**
 * HistoryProvider组件是一个高阶组件（HOC），它提供了一个历史记录对象的上下文。
 * 任何被这个组件包裹的子组件都可以通过上下文访问到历史记录对象。
 * @param {Object} props 组件的属性对象，其中children属性是这个组件包裹的子组件。
 * @returns 返回一个上下文提供者组件，它包裹了传入的子组件，并向子组件提供历史记录对象。
 */
export const HistoryProvider = ({ children }) => {
  const history = useHistory()
  return (
    <HistoryContext.Provider value={history}>
      {children}
    </HistoryContext.Provider>
  )
}

/**
 * 导出HistoryContext上下文对象，供其他组件使用。
 * 其他组件可以通过订阅这个上下文来获取和使用历史记录对象。
 */
export default HistoryContext
