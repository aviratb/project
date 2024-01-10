const Web3 = require('web3');
const User = require('../build/contracts/User.json');

const { PROVIDER_URL, PRIVATE_KEY } = process.env;
const provider = new Web3.providers.HttpProvider(PROVIDER_URL);
const web3 = new Web3(provider);


async function fetchUserContract() {
    const networkId = await web3.eth.net.getId();
    const contractAddress = User.networks[networkId].address;
    const contract = new web3.eth.Contract(User.abi, contractAddress);
    return { contract: contract }
}

const sendTx = async (firstName, lastName, mobile, email, age) => {
    const networkId = await web3.eth.net.getId();
    const contractAddress = User.networks[networkId].address;
    const contract = new web3.eth.Contract(User.abi, contractAddress);
    let txReceipt;

    const accounts = await web3.eth.getAccounts();
    const _from = accounts[1]

    const tx = {
        from: _from,
        to: contractAddress,
        gas: 1000000,
        data: contract.methods.addUser(firstName, lastName, mobile, email, age).encodeABI()
    }

    const signature = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)

    await web3.eth.sendSignedTransaction(signature.rawTransaction)
        .on('receipt', (receipt) => {
            txReceipt = receipt
        })
        .on('error', err => {
            console.error('Error sending transaction:', err);
        })
    return txReceipt
}


module.exports = {
    fetchUserContract,
    sendTx
}