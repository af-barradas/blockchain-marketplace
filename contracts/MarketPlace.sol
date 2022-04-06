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
        address owner;
        bool isAvailable;
    }

    event ProductCreated(
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
        productCount++;

        products[productCount] = Product(
            productCount,
            _name,
            _price,
            msg.sender,
            true
        );

        emit ProductCreated(productCount, _name, _price, msg.sender, true);
    }
}
