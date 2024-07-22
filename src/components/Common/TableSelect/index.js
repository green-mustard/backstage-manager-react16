import React, { Component } from 'react'

import './index.scss'

/**
 * 表格选择组件，用于在表格中进行选项选择。
 */
export default class TableSelect extends Component {
  /**
   * 构造函数，初始化组件状态。
   * @param {Object} props 组件属性，包含默认值和选择变更回调。
   */
  constructor(props) {
    super(props)
    this.state = {
      listShow: false, // 控制选项列表的显示与隐藏
      selectValue: '', // 当前选中的值
    }
  }

  /**
   * 显示或隐藏选项列表。
   * 通过切换listShow状态来实现选项列表的显示与隐藏。
   */
  showList = () => {
    this.setState({
      listShow: !this.state.listShow,
    })
  }

  /**
   * 处理选项选择变更。
   * @param {Object} item 被选中的选项项。
   * 更新组件状态以反映选择的变更，并调用父组件提供的回调函数通知选择变更。
   */
  onSelectChange = item => {
    this.setState({
      listShow: false, // 隐藏选项列表
      selectValue: item.tabName, // 更新选中值
    })
    this.props.onSelectChange(item, this.props.selectIndex, this.props.cid)
  }

  /**
   * 组件挂载后调用，用于初始化选中值。
   * 从props中获取默认值，并更新state中的selectValue。
   */
  componentDidMount() {
    this.setState({
      selectValue: this.props.defaultValue,
    })
  }

  /**
   * 渲染组件。
   * @returns {JSX.Element} 组件的JSX表示。
   * 根据当前状态和props渲染组件的UI，包括选中值显示和选项列表。
   */
  render() {
    const { tabData } = this.props
    const { listShow, selectValue } = this.state

    return (
      <div className="table-select">
        <div
          className="value-show"
          onClick={() => {
            this.showList()
          }}
        >
          {selectValue}
        </div>
        <ul className={`option-list ${listShow ? 'show' : ''}`}>
          <li
            className="option-item"
            onClick={() => this.onSelectChange({ id: 0, tabName: '未分类' })}
          >
            未分类
          </li>
          {tabData.map(item => {
            return (
              <li
                key={item.id}
                className="option-item"
                onClick={() => this.onSelectChange(item)}
              >
                {item.tabName}
              </li>
            )
          })}
        </ul>
        <i className="iconfont icon-arrow-down"></i>
      </div>
    )
  }
}
