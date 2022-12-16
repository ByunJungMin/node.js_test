const express = require('express')
const router = express.Router()
const Comment = require('../schemas/comment.js')


// 댓글 조회
router.get('/comments/:postId', async (req,res) => {
    const comment = await Comment.find({})
    
    comment.sort(function(a,b) {
        if (a.Date > b.Date) {
          return -1
        }
        if (a.Date < b.Date) {
          return 1
        }
      })

    const result = comment.map((list) => {
        return {
            commentId: list.commentId,
            user: list.user,
            content: list.content,
            password: list.password,
            Date: list.Date
        };
      });

    res.json({"comment_list": result})
})

// 댓글 작성
router.post('/comments/:postId', async (req,res) => {
    const {postId} = req.params
    const {
        commentId,
        user,
        content,
        password,
        Date,
    } = req.body

    // if(content === undefined) {
    //     return res.status(400).json({
    //         success: false,
    //         errorMessage: "댓글 내용을 입력해주세요."
    //     })
    // }
    const createdComment = await Comment.create({
        commentId,
        user,
        content,
        password,
        Date,
    })
    res.json({ comments: createdComment})
})


module.exports = router