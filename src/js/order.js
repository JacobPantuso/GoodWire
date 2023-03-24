import * as account from "./account.js";

var orders = [];
export class Order {
    constructor(orderNumber, orderDate, cart, status, email) {
        this.orderNumber = orderNumber;
        if (orderDate == null) {
            this.orderDate = new Date().toDateString() + ' @ ' + new Date().toLocaleTimeString();
        } else {
            this.orderDate = orderDate;
        }
        this.cart = cart;
        this.status = status;
        //this.price = cart.getTotalPrice();
        this.email = email;
    }

    getOrderNumber() {
        return this.orderNumber;
    }

    // returns formatted date string
    getOrderDate() {
        return this.orderDate;
    }

    // needs to be integrated with cart class/product class
    getItems() {
        return this.cart;
    }

    getStatus() {
        return this.status;
    }

}

export function newOrder(orderNumber, cart, status, email) {
    if (JSON.parse(sessionStorage.getItem('guest')) == 'true') {
        var order = new Order(orderNumber, null, cart, status, email);
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        return order;
    } else {
        var res = account.getAccountByName(sessionStorage.getItem('name'));
        var order = new Order(orderNumber, null, cart, status, email);
        res.addOrder(order);
        orders.push(order);
        return order;
    }
}

export function cancelOrder(orderNumber) {
    if (sessionStorage.getItem('guest') == 'true') {
        var newOrders = [];
        for (var i = 0; i < orders.length; i++) {
            if (orders[i].orderNumber != orderNumber) {
                newOrders.push(orders[i]);
            }
        }
        orders = newOrders;
        localStorage.setItem('orders', JSON.stringify(orders));
    } else if (sessionStorage.getItem('guest') == 'false') {
        var res = account.getAccountByName(sessionStorage.getItem('name'));
        var newOrders = [];
        for (var i = 0; i < res.orders.length; i++) {
            console.log(res.orders[i].orderNumber);
            if (res.orders[i].orderNumber != orderNumber) {
                newOrders.push(res.orders[i]);
            } else {
                var order = res.orders[i];
            }
        }
        orders = newOrders;
        res.removeOrder(order);
    }
}

export function getOrder(orderNumber) {
    for (var i = 0; i < orders.length; i++) {
        if (orders[i].getOrderNumber() == orderNumber) {
            return orders[i];
        }
    }
}

export function receiveStorage() {
    if (sessionStorage.getItem('guest') == 'true') {
        var retrievedOrders = JSON.parse(localStorage.getItem('orders'));
        if (retrievedOrders == null) {
            localStorage.setItem('orders') = [];
        } else {
            for (var i = 0; i < retrievedOrders.length; i++) {
                orders.push(new Order(retrievedOrders[i].orderNumber, retrievedOrders[i].orderDate, retrievedOrders[i].cart, retrievedOrders[i].status, retrievedOrders[i].email));
            }
        }
    } else if (sessionStorage.getItem('guest') == 'false') {
        var res = account.getAccountByName(sessionStorage.getItem('name'));
        var retrievedOrders = res.getOrders();
        var newOrders = []
        for (var i = 0; i < res.orders.length; i++) {
            orders.push(new Order(retrievedOrders[i].orderNumber, retrievedOrders[i].orderDate, retrievedOrders[i].cart, retrievedOrders[i].status, retrievedOrders[i].email));
            newOrders.push(new Order(retrievedOrders[i].orderNumber, retrievedOrders[i].orderDate, retrievedOrders[i].cart, retrievedOrders[i].status, retrievedOrders[i].email));
        }
        res.clearOrders();
        for (var i = 0; i < newOrders.length; i++) {
            res.addOrder(newOrders[i]);
        }
    }
}