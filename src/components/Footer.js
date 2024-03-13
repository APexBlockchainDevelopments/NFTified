import React, { Component } from 'react';
import './Footer.css';
import packageJson from '../../package.json';

class Footer extends Component {


    render() {
        return (
            <div className='footer-main'>
                <div className='text-center' style={{textAlign:'center', margin:"auto"}}>
                    <p>Copyright @ 2022 All Rights Reserved</p>
                    <p style={{fontSize:'8px'}}>Site Version {packageJson.version}</p>
                </div>
            </div>

        )
    }
}

export default Footer;
