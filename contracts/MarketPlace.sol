// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MarketPlace {
    string public name;

    mapping(uint256 => Product) public products;
    uint256 public productCount = 0;

    struct Product {
        uint256 id;
        string name;
        uint256 price;
        address payable owner;
        bool isAvailable;
    }

    event ProductCreated(
        uint256 id,
        string name,
        uint256 price,
        address owner,
        bool isAvailable
    );

    event ProductPurchased(
        uint256 id,
        string name,
        uint256 price,
        address owner,
        bool isAvailable
    );

    constructor() {
        name = "Ethereum Marketplace";
    }

    function createProduct(string memory _name, uint256 _price) public {
        require(bytes(_name).length > 0);
        require(_price > 0);

        productCount++;

        products[productCount] = Product(
            productCount,
            _name,
            _price,
            payable(msg.sender),
            true
        );

        emit ProductCreated(productCount, _name, _price, msg.sender, true);
    }

    function purchaseProduct(uint256 _id) public payable {
        Product memory product = products[_id];
        address payable seller = product.owner;

        product.owner = payable(msg.sender);
        product.isAvailable = false;
        products[_id] = product;

        seller.transfer(msg.value);

        emit ProductPurchased(
            productCount,
            product.name,
            msg.value,
            product.owner,
            product.isAvailable
        );
    }
}
