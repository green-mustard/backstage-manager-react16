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
    const {
      thData,
      tbData,
      tabData,
      titleField,
      studentCount,
      imgField,
      idField,
      desc,
      onCrawlAction,
      onClickStatusBtn,
    } = this.props
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
                {(item[idField] || item.cid) !== undefined ? (
                  <td className="id">{item[idField] || item.cid}</td>
                ) : null}
                {item[titleField || 'title'] !== undefined ? (
                  <td className="course-title">
                    {/* 创建可点击的课程标题链接 */}
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item[titleField || 'title']}
                    </a>
                  </td>
                ) : null}
                {(item.teacherImgKey || item.imgKey) !== undefined ? (
                  <td className="image">
                    {/* 创建可点击的课程图片链接 */}
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className={imgField}
                        src={`http://greenmustard0086.cn/${
                          item.teacherImgKey || item.imgKey
                        }`}
                        alt={item.title}
                      />
                    </a>
                  </td>
                ) : null}
                {item.price ? (
                  <td className="course-price">{item.price}</td>
                ) : null}
                {item.courseCount !== undefined ? (
                  <td className="course-count">{item.courseCount}</td>
                ) : null}
                {item.studentCount !== undefined || item.studentsNumber ? (
                  <td className="count">
                    {item[studentCount || 'studentCount']}
                  </td>
                ) : null}
                {tabData ? (
                  <td className="select-container">
                    <TableSelect
                      tabData={tabData}
                      selectIndex={index}
                      cid={item.cid}
                      defaultValue={item.fieldTitle}
                      onSelectChange={this.onSelectChange}
                    />
                  </td>
                ) : null}
                {item.teacherDescription ? (
                  <td className={desc}>{item.teacherDescription}</td>
                ) : null}
                {item.feedbackRate ? <td>{item.feedbackRate}</td> : null}
                {item.status !== undefined ? (
                  <td className="boutton">
                    {/* 根据item.status生成不同状态的按钮 */}
                    <button
                      className={`btn ${
                        item.status ? 'btn-danger' : 'btn-success'
                      }`}
                      onClick={() =>
                        onClickStatusBtn(item[idField] || item.cid)
                      }
                    >
                      {item.status ? '下架' : '上架'}
                    </button>
                  </td>
                ) : null}
                {item.description ? <td>{item.description}</td> : null}
                {item.operation ? (
                  <td>
                    <button
                      className={`btn crawl ${
                        item.loading ? 'btn-warning' : 'btn-info'
                      }`}
                      disabled={item.loading ? 'disabled' : ''}
                      onClick={() => onCrawlAction(item.apiName, index)}
                    >
                      {item.loading ? '数据爬取中' : item.operation}
                    </button>
                  </td>
                ) : null}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}
