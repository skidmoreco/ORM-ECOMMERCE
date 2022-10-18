const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { update } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      attributes: ['id', 'tag_name'],
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }],
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagSpecific = await Tag.findOne({
      where: {id: req.params.id},
      attributes: ['tag_name', 'id'],
      include: [{ model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }],
  });
  if (!tagSpecific) {
    res.status(404).json({message: 'No Tag found that this specific id!'})
  };
  res.status(200).json(tagSpecific);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {id: req.params.id}
    });
    if (!updateTag) {
      res.status(404).json({message: 'Tag does not exist!'})
    }
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {id: req.params.id}
    });
    if (!deleteTag) {
      res.status(404).json({message: 'Tag you are trying to delete does not exist'})
    }
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
