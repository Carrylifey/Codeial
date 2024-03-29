const express= require('express');


const router = express.Router();
const homeController=require('../controllers/home_controller');

console.log('router loaded');

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));

//for any other routes use from here 
//router.use('/routername ,require(('./routerfilebyname')))


module.exports=router;