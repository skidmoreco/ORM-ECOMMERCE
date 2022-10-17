const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');
const { update } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({
    attributes: ['id', 'category_name'],
    include: [{ 
      model: Product, 
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }],
  });
  res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => { 
  try {
    const itemSpecific = await Category.findOne({
      where: {id: req.params.id},
      attributes: ['id', 'category_name'],
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }],
    });
    if (!itemSpecific) {
      res.status(404).json({message: 'No Category found with this specific id!'})
    };
    res.status(200).json(itemSpecific);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name
    })
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {id: req.pararms.id}
    });
    if (!updateCategory) {
      res.status(404).json({message: 'Category does not exist!'})
    }
    res.status(200).json(updateCategory);
  } catch {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {id: req.params.id}
    });
    if (!deleteCategory) {
      res.status(404).json({message: 'Category you are trying to delete does not exist!'})
    }
    res.status(200).json(deleteCategory);
  } catch {
    res.status(500).json(err)
  }
});

module.exports = router;
