const MyToken = artifacts.require('myToken')

contract('MyToken', (accounts) => {
    before(async () => {
        myToken = await MyToken.deployed()
    })

    it('gives the owner of the token 100 tokens', async () => {
        let balance = await myToken.balanceOf(accounts[0])
        console.log(balance = web3.utils.fromWei(balance, 'Ether'))
        assert.equal(balance, '100', "Balance should be 100.")
    })

    it('can transfer tokens between accounts', async () => {
        let amount = web3.utils.toWei('10', 'Ether')
        await myToken.transfer(accounts[1], amount, { from: accounts[0] })
        let balance = await myToken.balanceOf(accounts[1])
        console.log(balance = web3.utils.fromWei(balance, 'Ether'))
        assert.equal(balance, '10', "Balance should be 10.")
    })
})