const express = require('express');
const router = express.Router();

const clientController = require('../controllers/clientController');
const productsController = require('../controllers/productsController');

module.exports = function() {

    router.post('/clients', clientController.newClient);
    router.get('/clients', clientController.showClients);
    router.get('/clients/:id', clientController.showClient);
    router.put('/clients/:id', clientController.updateClient);
    router.delete('/clients/:id', clientController.deleteClient);

    router.post('/products', productsController.uploadFile, productsController.newProduct);
    router.get('/products', productsController.showProducts);
    router.get('/products/:id', productsController.showProduct);
    router.put('/products/:id', productsController.uploadFile, productsController.updateProduct);
    router.delete('/products/:id', productsController.deleteProduct);

    return router;
}