import React, { Component } from 'react'
import TableSelect from '../TableSelect'

import './index.scss'

/**
 * 表格组件，用于展示带有头部的表格数据。
 *
 * @extends Component React组件
 */
export default class Table extends Component {
  /**
   * 渲染方法，生成表格的HTML结构。
   *
   * @returns {React.Element} 表格元素
   */
  onSelectChange = (item, selectIndex, cid) => {
    this.props.onSelectChange(item, selectIndex, cid)
  }

  render() {
    // 解构获取传入的表头和表格数据
    const { thData, tbData, tabData } = this.props
    // 确保tbData是数组且不为空，否则设为空数组
    const safeTbData = Array.isArray(tbData) && tbData.length > 0 ? tbData : []

    return (
      // 定义表格类名为“list-table”
      <table className="list-table">
        <thead>
          <tr>
            {/* 遍历thData生成表头单元格 */}
            {thData.map((item, index) => {
              return <th key={index}>{item}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {/* 遍历safeTbData生成表格行 */}
          {safeTbData.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.cid}</td>
                <td className="course-title">
                  {/* 创建可点击的课程标题链接 */}
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </td>
                <td>
                  {/* 创建可点击的课程图片链接 */}
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    <img
                      src={`http://greenmustard0086.cn/${item.imgKey}`}
                      alt={item.title}
                    />
                  </a>
                </td>
                <td className="course-price">{item.price}</td>
                <td>{item.studentCount}</td>
                <td className="select-container">
                  <TableSelect
                    tabData={tabData}
                    selectIndex={index}
                    cid={item.cid}
                    defaultValue={item.fieldTitle}
                    onSelectChange={this.onSelectChange}
                  />
                </td>
                <td>
                  {/* 根据item.status生成不同状态的按钮 */}
                  <button
                    className={`btn ${
                      item.status ? 'btn-danger' : 'btn-success'
                    }`}
                  >
                    {item.status ? '上架' : '下架'}
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}
