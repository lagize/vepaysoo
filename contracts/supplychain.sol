// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductSupplyChain {
    struct Product {
        uint256 productId;
        string uniqueId;
        string manufacturer;
        string details;
        uint256 quantity;
        uint256 quality;
        bool isConfirmed;
        bool isSold;
    }

    mapping(uint256 => Product) public products;
    mapping(address => bool) public manufacturers;
    mapping(address => bool) public customers;

    event ProductProduced(uint256 indexed productId, string uniqueId, string manufacturer, string details);
    event ProductVerified(uint256 indexed productId, uint256 quantity, uint256 quality, bool isConfirmed);
    event ProductSold(uint256 indexed productId, address indexed buyer);
    event ProductReturned(uint256 indexed productId);
    event ProductAuthenticity(uint256 indexed productId, bool isAuthentic);

    function produceProduct(uint256 _productId, string memory _uniqueId, string memory _manufacturer, string memory _details) public {
        require(products[_productId].productId == 0, "Product with the same productId already exists");
        require(!manufacturers[msg.sender], "Only manufacturers can produce products");
        products[_productId] = Product(_productId, _uniqueId, _manufacturer, _details, 0, 0, false, false);
        emit ProductProduced(_productId, _uniqueId, _manufacturer, _details);
    }

    function verifyProduct(uint256 _productId, uint256 _quantity, uint256 _quality, bool _isConfirmed) public {
        require(products[_productId].productId != 0, "Product with the given productId does not exist");
        require(manufacturers[msg.sender], "Only manufacturers can verify products");
        products[_productId].quantity = _quantity;
        products[_productId].quality = _quality;
        products[_productId].isConfirmed = _isConfirmed;
        emit ProductVerified(_productId, _quantity, _quality, _isConfirmed);
    }

    function sellProduct(uint256 _productId) public {
        require(products[_productId].productId != 0, "Product with the given productId does not exist");
        require(products[_productId].isConfirmed, "Product has not been confirmed by the manufacturer");
        require(!products[_productId].isSold, "Product has already been sold");
        require(customers[msg.sender], "Only customers can buy products");
        products[_productId].isSold = true;
        emit ProductSold(_productId, msg.sender);
    }

    function acceptReturn(uint256 _productId) public {
        require(products[_productId].productId != 0, "Product with the given productId does not exist");
        require(products[_productId].isSold, "Product has not been sold yet");
        require(manufacturers[msg.sender], "Only manufacturers can accept returns");
        products[_productId].isSold = false;
        emit ProductReturned(_productId);
    }

    function checkAuthenticity(uint256 _productId) public view returns (bool) {
        require(products[_productId].productId != 0, "Product with the given productId does not exist");
        return products[_productId].isConfirmed;
    }

    function addManufacturer(address _manufacturer) public {
        require(!manufacturers[_manufacturer], "Manufacturer already exists");
        manufacturers[_manufacturer] = true;
    }

    function addCustomer(address _customer) public {
        require(!customers[_customer], "Customer already exists");
        customers[_customer] = true;
    }
}
