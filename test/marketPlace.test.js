const MarketPlace = artifacts.require('MarketPlace')

contract('MarketPlace', ([deployer, seller, buyer]) => {
    let marketPlace

    before(async () => {
        marketPlace = await MarketPlace.deployed()
    })

    describe('deployment', async () => {
        it('deployed successfully', async () => {
            let address = await marketPlace.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has correct name', async () => {
            let name = await marketPlace.name()
            assert.equal(name, 'Ethereum Marketplace')
        })
    })

    describe('products', async () => {
        let result, productCount

        before(async () => {
            result = await marketPlace.createProduct('Samsung M12 Sky Blue', web3.utils.toWei('1', 'Ether'), { from: seller })
            productCount = await marketPlace.productCount()
        })

        it('created product successfully', async () => {
            assert.equal(productCount, 1)
            let event = result.logs[0].args
            assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(event.name, 'Samsung M12 Sky Blue', 'name is correct')
            assert.equal(event.price, web3.utils.toWei('1', 'Ether'), 'price is correct')
            assert.equal(event.owner, seller, 'owner is correct')
            assert.equal(event.isAvailable, true, 'isAvailable is correct')
        })
    })
})