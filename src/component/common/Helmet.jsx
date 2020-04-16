import React, { Component } from "react";
import {Helmet} from 'react-helmet'

class PageHelmet extends Component{
    render(){
        return(
            <React.Fragment>
                <Helmet>
                    <title>{this.props.pageTitle} || Chart Caffeine's Half-Life </title>
                    <meta name="description" content="Study how long caffeine takes to metabolize on average." />
                </Helmet>
            </React.Fragment>
        )
    }
}


export default PageHelmet;
