const {Router}= require('express')
const router=Router()
const {createPost,getPosts,getPost,getCatPost,getUserPosts,editPosts,deletePosts}= require('../controllers/postsController')
const authMiddleware= require('../middleware/authMiddleware')

router.post('/', authMiddleware, createPost)
router.get('/', getPosts)
router.get('/:id', getPost)
router.patch('/:id', authMiddleware, editPosts)
router.get('/categories/:category', getCatPost )
router.get('/users/:id', getUserPosts)
router.delete('/:id', authMiddleware, deletePosts)


module.exports= router