const HDWalletProvider = require("@truffle/hdwallet-provider");
const privateKeys = [
  '',// theta private key
  '' // rinkeby private key
]

require('babel-register');
require('babel-polyfill');


module.exports = {
  mocha: {
    enableTimeouts: false,
    before_timeout: 480000
  },

  networks: {

    theta_testnet: {
      provider: () => {

        // Replace the private key below with the private key of the deployer wallet. 
        // Make sure the deployer wallet has a sufficient amount of TFuel, e.g. 100 TFuel
        var deployerPrivateKey = '';

        return new HDWalletProvider({
          privateKeys: [deployerPrivateKey],
          providerOrUrl: 'https://eth-rpc-api-testnet.thetatoken.org/rpc',
        });
      },
      network_id: 365,
      gasPrice: 4000000000000,
    },

    theta_mainnet: {
      provider: () => {

        // Replace the private key below with the private key of the deployer wallet. 
        // Make sure the deployer wallet has a sufficient amount of TFuel, e.g. 100 TFuel
        var deployerPrivateKey = '12345';

        return new HDWalletProvider({
          privateKeys: [deployerPrivateKey],
          providerOrUrl: 'https://eth-rpc-api.thetatoken.org/rpc',
        });
      },
      network_id: 361,
      gasPrice: 4000000000000,
    }
  },
  contracts_directory: './src/contracts',
    contracts_build_directory: './src/truffle_abis',
    compilers: {
        solc: {
            version: '^0.6.2',
            optimizer: true,
            runs: 200
        },
    }
};
