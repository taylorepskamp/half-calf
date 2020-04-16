import React, { Component } from "react";



class Header extends Component{
    constructor(props) {
        super(props);
        window.addEventListener('load', function() {
            console.log('All assets are loaded')
        })
    }

    render(){
        var elements = document.querySelectorAll('.has-droupdown > a');
        for(var i in elements) {
            if(elements.hasOwnProperty(i)) {
                elements[i].onclick = function() {
                    this.parentElement.querySelector('.submenu').classList.toggle("active");
                    this.classList.toggle("open");
                }
            }
        }
        const { logo, color='default-color' } = this.props;
        let logoUrl = <img src="assets/images/logo/logo.png" alt="HalfCaff Logo" />;
        
        
        return(
            <header className={`header-area formobile-menu header--transparent ${color}`}>
                <div className="header-wrapper" id="header-wrapper">
                    <div className="header-left">
                        <div className="logo">
                            <a href="/">
                                {logoUrl}
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}
export default Header;