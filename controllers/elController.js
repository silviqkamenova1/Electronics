const router = require('express').Router();
const mongoose = require('mongoose');

const { isAuth } = require('../middlewares/authMiddleware');
const elService = require('../services/elService');
const { getErrorMessage } = require('../utils/errorutils');

router.get('/catalog', async (req, res) => {

    const electronic = await elService.getAll();
    res.render('el/catalog', { electronic });
});


router.get('/:elId/details', async (req, res) => {
    const electronic = await elService.getOneDetailed(req.params.elId).lean();
    ObjectId = electronic.owner._id;
    const isOwner = ObjectId.toString() == req.user?._id;
    const isBought = electronic.buyingList?.some(id => id == req.user?._id);

    res.render('el/details', { ...electronic, isOwner, isBought });
});

router.get('/search', async (req, res) => {
    const { name, type } = req.query;

    const electronic = await elService.search(name, type);

    res.render('el/search', { electronic })
});

router.get('/:elId/buy', isAuth, async (req, res) => {
    try{
        await elService.buy(req.user._id, req.params.elId);
    } catch(error){
        console.log(error);
        return res.render('404')    
    }

    res.redirect(`/el/${req.params.elId}/details`)
});

router.get('/:elId/edit', isAuth, async (req, res) => {
    const electronic = await elService.getOne(req.params.elId);

    res.render('el/edit', { ...electronic });
});

router.post('/:elId/edit', isAuth, async (req, res) => {
    await elService.edit(req.params.elId, req.body);

    res.redirect(`/el/${req.params.elId}/details`);
});


router.get('/create', isAuth, (req, res) => {
    res.render('el/create');
});

router.post('/create', isAuth, async (req, res) => {
    const elData = req.body;

    try {
        await elService.create(req.user._id, elData);
    } catch (error) {
        return res.status(400).render('el/create', { error: getErrorMessage(error) });
    }

    res.redirect('/el/catalog');
});

router.get('/:elId/delete', isAuth, async (req, res) => {

    await elService.delete(req.params.elId);
    res.redirect('/el/catalog');
});


module.exports = router;