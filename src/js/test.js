import * as order from './order.js';
import * as account from './account.js';
import * as products from './product.js';

var passed = 0;
var cases = 20;

function assert(test, expected, assertion) {
    if (test != expected && (expected == "order-obj" && !(test instanceof order.Order)) && (expected == "account-obj" && !(test instanceof account.Account))) {
        console.log("%cAssertion #" + assertion + " Failed: " + test + " != " + expected, "color: red");
    } else {
        passed++;
    }
}


export function runTests() {
    assert(order.newOrder("Test", ["Product1", "Product2"], "Preparing to Ship", 'test@test.ca', 500, true), null, 1);
    var test2 = order.newOrder(Math.round(Math.random() * 10000), ["Product1", "Product2"], "Prepraring to Ship", 'test@test.ca', 500, true);
    assert(test2, "order-obj", 2);
    var test3 = order.cancelOrder(test2.orderNumber, true);
    assert(test3, true, 3);
    var test4 = order.newOrder(Math.round(Math.random() * 10000), [], "Prepraring to Ship", 'test@test.ca', 500, true);
    assert(test4, null, 4);
    var test5 = order.newOrder(Math.round(Math.random() * 10000), ["Product1", "Product2"], "", 'test@test.ca', 500, true);
    assert(test5, null, 5);
    var test6 = order.newOrder(Math.round(Math.random() * 10000), ["Product1", "Product2"], "Preparing to Ship", '', 500, true);
    assert(test6, null, 6);
    var test7 = order.newOrder(Math.round(Math.random() * 10000), ["Product1", "Product2"], "Preparing to Ship", 'test@test.ca', 'hello', true);
    assert(test7, null, 7);
    var test8 = order.newOrder(Math.round(Math.random() * 10000), [], "Preparing to Ship", '', "test", true);
    assert(test8, null, 8);
    var test9 = order.newOrder(Math.round(Math.random() * 10000), [], "", '', "test", true);
    assert(test9, null, 9);
    var test10 = order.newOrder(Math.round(Math.random() * 10000), [], "Preparing to Ship", '', "test", true);
    assert(test10, null, 10);
    var test11 = account.validateRegister("John", "Doe", "", "password", "6473332323", true);
    assert(test11, null, 11);
    var test12 = account.validateRegister("", "", "test@test.com", "password", "6473332323", true);
    assert(test12, null, 12);
    var test13 = account.validateRegister("John", "Doe", "", "password", "6473332323", true);
    assert(test13, null, 13);
    var test14 = account.validateRegister("John", "Doe", "test@test.com", "", "6473332323", true);
    assert(test14, null, 14);
    var test15 = account.validateRegister("John", "Doe", "test@test.com", "password", "", true);
    assert(test15, null, 15);
    var test16 = account.validateRegister("John", "Doe", "test@test.com", "password", "6473332323", true);
    assert(test16, "account-obj", 16);
    var test17 = test16.changeAddress("350", "Victoria Street", "Toronto", "ON", "M5B1S1", "Canada");
    assert(test17, "350 Victoria Street, Toronto, ON, M5B1S1, Canada", 17);
    var test18 = products.initiateProducts(true)
    assert(test18.length, 18, 18);
    if (window.location.href.includes("products.html")) {
        var test19 = true;
        assert(test19, true, 19);
    } else {
        var test19 = products.loadProducts();
        assert(test19, 'Not on products page', 19);
    }
    var test20 = account.removeAccount(test16);
    assert(test20, true, 20);
    console.log("%cPassed " + passed + " out of " + cases + " tests", "color: skyblue");
}