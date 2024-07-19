import React, { Component } from 'react'

import './index.scss'

export default class Table extends Component {
  render() {
    const { thData } = this.props
    return (
      <table className="list-table">
        <thead>
          <tr>
            {thData.map((item, index) => {
              return <th key={index}>{item}</th>
            })}
          </tr>
        </thead>
      </table>
    )
  }
}
