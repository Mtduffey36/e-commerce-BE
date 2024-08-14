const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  try {
    const catData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(catData)
  } catch(err) {
    res.status(500).json(err);
  }
  });

router.get('/:id', async(req, res) => {
  try {
    const catData = await Category.findByPk(req.params.is, {
      include: [{ model: Product }]
    });
    if (!catData) {
      res.status(404).json({message: 'No category with this id is found'})
    }
  } catch(err) {
    res.status(500).json(err)
  }
});

router.post('/', async(req, res) => {
  try {
    const newCat = await Category.create(req.body);
    res.status(200).json(newCat)
  } catch(err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async(req, res) => {
  try {
    const [updatedRows] = await Category.update(req.body, {
      where: {
        id: body.params.id
      }
    });
  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  try {
    const deleteRow = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (deleteRow === 0) {
      res.status(404).json({message: 'No category with this id is found'})
    }
  } catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
