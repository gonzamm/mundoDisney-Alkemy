const {Router} = require ('express')
const {userLogin, userRegister} = require ('../controller/userController')
const router = Router()

router.post('/register', userRegister) //Crea un nuevo usuario
router.post('/login', userLogin) //Login usuario


module.exports = router