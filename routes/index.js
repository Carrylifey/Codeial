const express= require('express');


const router = express.Router();
const homeController=require('../controllers/home_controller');

console.log('router loaded');

router.get('/',homeController.home);
router.use('/users',require('./users'));

//for any other routes use from here 
//router.use('/routername ,require(('./routerfilebyname')))


module.exports=router;