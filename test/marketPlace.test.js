const MarketPlace = artifacts.require('MarketPlace')

contract('MarketPlace', (accounts) => {
    let marketPlace

    before(async () => {
        marketPlace = await MarketPlace.deployed()
    })

    it('deployed successfully', async () => {
        let address = await marketPlace.address
        assert.notEqual(address, 0x0)
        assert.notEqual(address, '')
        assert.notEqual(address, null)
        assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
        let name = await marketPlace.name()
        assert.equal(name, 'Ethereum Marketplace')
    })
})