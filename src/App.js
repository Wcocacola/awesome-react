/**
 * Created by Allan on 2017/5/31.
 */

import React, { Component, PropTypes, cloneElement } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from './action/index'
import Navbar from './components/Header/Navbar'
//import Footer from './Component/Footer';

class App extends Component {
    render() {
        let layout = ''
        // this.props.children表示组件的所有子节点
        const childrenWithProps = React.Children.map(this.props.children,
            (child) => cloneElement(child, {   // cloneElement给所有子元素添加属性
                actions: this.props.actions,
                results: this.props.results
            })
        )

        let pathname = this.props.location.pathname

        if (pathname === '/programmer' || pathname==='/'){
            layout = <div className='container'>
                {childrenWithProps}
            </div>
        }else if (pathname === '/topics/new'){
            layout = <div>
                {childrenWithProps}
            </div>
        }else {
            layout = <div className='container'>
                <div className='row margin-xs'>
                    <div className='col-md-9 no-padding-xs'>
                        {childrenWithProps}
                    </div>
                    <div className='col-md-3 no-padding-xs'>
                        
                    </div>
                </div>
            </div>
        }

        return (
            <div>
                <Navbar path={this.props.location.pathname}/>
                { layout }
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

const mapStateToProps = state => {
    const { postsByReddit } = state
    let replies = [], topics = [], topic = {}, results = postsByReddit['results']
    if (results) {
        switch (results.type) {
            case actions.TOPIC:
                topic = results.topic
                replies = results.replies
                break
            case actions.TOPICS:
                topics = results.topics
                break
            default:
            {}
        }
    }
    return {
        results: {
            replies,
            topics,
            topic
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
