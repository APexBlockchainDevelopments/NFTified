import React, { Component } from 'react';
import './Home.css'
import Footer from './Footer';
import './IPFSUpload.css'
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

class IPFSUpload extends Component {

    constructor(props) {
        super(props);

        this.state = {
            statusCode: 0, //0 not loading, 1 loading, 2 error, 3 done loading
            errorMessage: null,
            showcaptcha: true
        }

    }


    componentDidMount() {

    }

    uploadFile = async (e) => {
        e.preventDefault();

        //creating form data object and append file into that form data
        let formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        const file = formProps.fileupload;
        this.setState({ name: file.name })

        if (file.size === 0) {
            this.setState({ errorMessage: "No file." })
            return;
        }

        if (file.size > 50000000) {
            alert("File Must not exceed 50MB")
            this.setState({ errorMessage: "File too large." })
            return;
        }


        this.setState({ loading: true });

        const projectId = '';
        const projectSecret = '';
        const auth =
            'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

        const ipfs = create({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
            headers: {
                authorization: auth
            }
        })


        const { cid } = await ipfs.add(formProps.fileupload)

        //if successful reset error code to null
        console.log(cid.string);

        this.setState({ errorMessage: null })
        this.setState({ cid: cid.string })
        const link = 'https://ipfs.io/ipfs/' + cid.string;
        this.setState({ link: link });
        this.setState({ loading: false });

        this.Tweet();


        const formDataEmail = new FormData();
        formDataEmail.append('api', '2EjMKS9P');
        formDataEmail.append("email", formProps['email']);
        axios.post('https://db1.zdev9.com/NFTified/emailLead1.php', formDataEmail).then(response => {
            console.log(response);
        });

        //upload json
        // social media link, twitter. site, youtube
    }


    async Tweet() {
        const json = JSON.stringify({
            "api": 'G8grAHjm',
            "IPFSFileName": this.state.name,
            "link": this.state.link
        })


        await axios.post('', json).then(response => {
            console.log(response.statusCode);
        });

        //NFT name was just minted using NFTified.org! (link) #theta #tfuel #nfts #crypto #web3 #nftified
    }

    async captcha() {
        setTimeout(() => {
            this.setState({ showcaptcha: false })
        }, 1000);
    }


    render() {
        return (
            <div className='ipfs-upload-home'>
                <h1>IPFS File Upload</h1>
                <form onSubmit={(e) => this.uploadFile(e)}>
                    <label>Chose File:</label>
                    <input id="fileupload" type="file" name="fileupload" />
                    <br />
                    <label>Email: </label>
                    <input type='email' id='email' name='email' placeholder="Email" required ></input>
                    <br />
                    {
                        this.state.showcaptcha &&
                        <div className='captcha-container'>
                            <ReCAPTCHA
                                className='ipfs-captcha'
                                sitekey=""
                                onChange={() => this.captcha()}
                            />
                        </div>
                    }
                    {
                        (!this.state.loading && !this.state.showcaptcha) &&
                        <button id="upload-button" onSubmit={(e) => this.uploadFile(e)}> Upload file </button>
                    }
                    {
                        this.state.loading &&
                        <h1>Loading...</h1>
                    }
                </form>
                {
                    this.state.errorMessage &&
                    <h2>{this.state.errorMessage}</h2>
                }
                {
                    this.state.cid &&
                    <a href={this.state.link} target='_blank'>
                        <p>{this.state.cid}</p>
                    </a>
                }
                <div className='home-footer-container'>
                    <Footer />
                </div>
            </div>

        )
    }
}

export default IPFSUpload;
