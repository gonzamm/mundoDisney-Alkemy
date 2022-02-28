const {Router} = require ('express')

const router = Router()

router.get('/', (req,res) =>{
    res.json({msg:'Desde genres'})
})

module.exports = router