import React, { Component } from 'react';
import './About.css'
import Footer from './Footer'
import './Testing.css'

class Testing extends Component {

    constructor(props) {
        super(props);


        this.state = {
        }
    }

    componentDidMount = () => {
        const searchParams = new URLSearchParams(window.location.search);
        const info = Object.fromEntries(searchParams.entries())
        console.log(info);
        this.changePic();
    }

    changePic() {
        console.log("jim");
    }


    render() {
        return (
            <div className='contact-main' style={{ textAlign: 'center', paddingTop: '3rem' }}>
                <div className="pic-ctn">
                    <img src="./1.png" alt="" className="pic" onClick={()=>this.changePic()}/>
                    <img src="./2.png" alt="" className="pic" />
                    <img src="./3.png" alt="" className="pic" />
                </div>
                <div className='about-footer-container'>
                    <Footer />
                </div>
            </div>

        )
    }
}

export default Testing;
