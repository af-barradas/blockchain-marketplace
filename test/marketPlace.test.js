const MarketPlace = artifacts.require('MarketPlace')

require('chai')
    .use(require('chai-as-promised'))
    .should()

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

            await marketPlace.createProduct('', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected
            await marketPlace.createProduct('Samsung M12 Sky Blue', 0, { from: seller }).should.be.rejected
        })

        it('last product saved successfully', async () => {
            product = await marketPlace.products(productCount)
            assert.equal(product.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(product.name, 'Samsung M12 Sky Blue', 'name is correct')
            assert.equal(product.price, web3.utils.toWei('1', 'Ether'), 'price is correct')
            assert.equal(product.owner, seller, 'owner is correct')
            assert.equal(product.isAvailable, true, 'isAvailable is correct')
        })

        it('purchased product successfully', async () => {
            let oldSellerBalance = await web3.eth.getBalance(seller)
            oldSellerBalance = new web3.utils.BN(oldSellerBalance)

            result = await marketPlace.purchaseProduct(productCount, {
                from: buyer, value: web3.utils.toWei('1', 'Ether')
            })
            let event = result.logs[0].args
            assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(event.name, 'Samsung M12 Sky Blue', 'name is correct')
            assert.equal(event.price, web3.utils.toWei('1', 'Ether'), 'price is correct')
            assert.equal(event.owner, buyer, 'owner is correct')
            assert.equal(event.isAvailable, false, 'isAvailable is correct')

            let newSellerBalance = await web3.eth.getBalance(seller)
            newSellerBalance = new web3.utils.BN(newSellerBalance)
            let price = web3.utils.toWei('1', 'Ether')
            price = new web3.utils.BN(price)
            console.log(oldSellerBalance, newSellerBalance, price)
        })
    })
})