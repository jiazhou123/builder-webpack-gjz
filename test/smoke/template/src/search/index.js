'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import './search.less'
import Logo from './images/logo.png'
import '../../common/index.js'
import largeNumber from 'large-number-gjz'

class Search extends React.Component {
    constructor() {
        super(...arguments);

        this.state = {
            Text: null
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
        const { Text } = this.state;
        const result = largeNumber('999', '1');

        return (
            <div className="search-text">
                { 
                    Text ? <Text /> : null
                }
                <span>搜索页textaa </span>
                <img src={ Logo } onClick={ this.loadComponent.bind(this) } />
                <span>{ result }</span>
            </div>
        )
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)