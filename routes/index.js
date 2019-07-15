const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clientController');
const productsController = require('../controllers/productsController');
const ordersController = require('../controllers/ordersController');
const usersController = require('../controllers/usersController');

const auth = require('../middlewares/auth');

module.exports = function() {

    router.post('/clients', auth, clientController.newClient);
    router.get('/clients', auth, clientController.showClients);
    router.get('/clients/:id', auth, clientController.showClient);
    router.put('/clients/:id', auth, clientController.updateClient);
    router.delete('/clients/:id', auth, clientController.deleteClient);

    router.post('/products', auth, productsController.uploadFile, productsController.newProduct);
    router.get('/products', auth, productsController.showProducts);
    router.get('/products/:id', auth, productsController.showProduct);
    router.put('/products/:id', auth, productsController.uploadFile, productsController.updateProduct);
    router.delete('/products/:id', auth, productsController.deleteProduct);
    router.post('/products/search/:query', auth, productsController.searchProduct);

    router.post('/orders/new/:id', auth, ordersController.newOrder);
    router.get('/orders', auth, ordersController.showOrders);
    router.get('/orders/:id', auth, ordersController.showOrder);
    router.put('/orders/:id', auth, ordersController.updateOrder);
    router.delete('/orders/:id', auth, ordersController.deleteOrder);

    router.post('/register', usersController.register);
    router.post('/login', usersController.login);

    return router;
}