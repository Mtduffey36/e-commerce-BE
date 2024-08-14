const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// All tags
router.get('/', async(req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  }
});

// Single ID
router.get('/:id', async(req, res) => {
  try {
    const tagDataId = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if(!tagDataId) {
      res.status(404).json({message: 'No tag found with this id!'});
      return
    }
    res.status(200).json(tagDataId);
  } catch(err) {
    res.status(500).json(err);
  }
});

// New tag
router.post('/', async(req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag)
  }catch{
    res.status(500).json(err);
  }
});

// Update tag name and ID
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
