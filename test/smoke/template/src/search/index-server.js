'use strict'

// import React from 'react'
// import './search.less'
// import Logo from './images/logo.png'
// import '../../common/index.js'

const React = require('react')
const Logo = require('./images/logo.png')
require('./search.less')
const axios = require('axios')

class Search extends React.Component {
    constructor() {
        super(...arguments);

        this.state = {
            Text: null,
            initialData: []
        }
    }

    loadComponent() {
        import('./text.js').then( (Text) => {
            this.setState({
                Text: Text.default
            })
        })
    }
    

    render() {
        const { Text, initialData } = this.state;

        return (
            <div className="search-text">
                { 
                    Text ? <Text /> : null
                }
                <span>搜索页text</span>
                <img src={ Logo } onClick={ this.loadComponent.bind(this) } />
                {/* {
                    initialData.map( item => {
                        return (
                            <li>{item.link}</li>
                        )
                    })
                } */}
            </div>
        )
    }
}

// 服务端不支持
// ReactDOM.render(
//     <Search />,
//     document.getElementById('root')
// )

// 支持commonJS语法
module.exports = <Search />