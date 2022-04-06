// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MarketPlace {
    string public name;

    constructor() {
        name = "Ethereum Marketplace";
    }
}
