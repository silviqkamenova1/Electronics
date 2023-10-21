const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController')
const gameController = require('./controllers/elController')

router.use(homeController)
router.use(authController)
router.use('/el', gameController)
router.all('*', (req, res) => {
    res.render('home/404')
})


module.exports = router