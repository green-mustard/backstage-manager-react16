import React, { Component } from 'react'

import './index.scss'

export default class TableSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listShow: false,
      selectValue: '',
    }
  }

  showList = () => {
    this.setState({
      listShow: !this.state.listShow,
    })
  }
  onSelectChange = (item, tabIndex) => {
    this.setState({
      listShow: false,
      selectValue: item.tabName,
    })
    console.log(item, tabIndex, this.props.selecIndex)
    this.props.onSelectChange(item, tabIndex, this.props.selecIndex)
  }

  componentDidMount() {
    this.setState({
      selectValue: this.props.defaultValue,
    })
  }
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
          {tabData.map((item, index) => {
            return (
              <li
                key={item.id}
                className="option-item"
                onClick={() => this.onSelectChange(item, index)}
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
