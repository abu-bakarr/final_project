const Products = require('../models/products');

module.exports = {

    add: (req, res) => {
        var data = req.body
        console.log(req.body);

        Products.create(data)
            .then(products => {
                res.json({
                    confirm: 'success',
                    data: products
                });
            })

    },
    getAll: (req, res) => {
        // var query = req.query;
        Products.findAll()
            .then(productss => {
                res.json({
                    confirm: "Succes",
                    data: productss
                });
            })
            .catch(err => {
                res.render({
                    confirm: 'fail',
                    data: err.message
                });
            });
    },
    getById: (req, res) => {
        const { id } = req.params
        Products.findOne({
                where: {
                    id: id
                }
            })
            .then(productss => {
                res.json({
                    confirm: "Succes",
                    data: productss
                });
            })
            .catch(err => {
                res.render({
                    confirm: 'fail',
                    data: err.message
                });
            });
    },
    deleteOne: (req, res) => {
        const { id } = req.params
        Products.destroy({
                where: {
                    id: id
                }
            })
            .then(products => {
                res.json({
                    confirm: "Succes",
                    data: products
                });
            })
            .catch(err => {
                res.render({
                    confirm: 'fail',
                    data: err.message
                });
            });
    },
    update: (req, res) => {
        const { id } = req.params
        Products.update(req.body, {
                where: {
                    id: id
                }
            })
            .then(products => {
                res.json({
                    confirm: "Succes",
                    data: products
                });
            })
            .catch(err => {
                res.render({
                    confirm: 'fail',
                    data: err.message
                });
            });
    },
}