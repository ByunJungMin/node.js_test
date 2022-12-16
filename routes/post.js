const express = require("express");
const router = express.Router();

const Posting = require("../schemas/post.js");

// 전체 게시글 조회 api
router.get("/posting", async (req, res) => {
  const posting = await Posting.find({});

  // 배열안의 객체를 postingDate를 기준으로 내림차순 정렬
  posting.sort(function(a,b) {
    if (a.postingDate > b.postingDate) {
      return -1
    }
    if (a.postingDate < b.postingDate) {
      return 1
    }
  })

  // result 에 posting의 데이터를 제목,이름,날짜 데이터 입력
  const result = posting.map((list) => {
    return {
      postName: list.postName,
      userName: list.userName,
      postingDate: list.postingDate,
    };
  });

  // json형태로 posting_list 라는 키와 result 라는 값 형태로 반환 
  res.json({ "posting_list": result });

});

// 게시글 조회 api
router.get("/posting/post", async (req,res) => {
  const posting = await Posting.find({})

  const result = posting.map((list) => {
    return {
      postName: list.postName,
      userName: list.userName,
      postContent: list.postContent,
      postingDate: list.postingDate
    }
  })

  res.json({"post": result})

})
// 게시글 작성 api
router.post("/posting", async (req, res) => {

  // body로 부터 입력받은 데이터를 순서에 맞게 저장
  const { postingId,
        postName,
        postContent,
        postingDate,
        userName,
        password 
    } = req.body;

  const posting = await Posting.find({ postingId });

  // 만약 postingId 가 같을경우 에러메세지 출력
  if (posting.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 존재하는 postingId 입니다.",
    });
  }

  const createdPosting = await Posting.create({
    postingId,
    postName,
    postContent,
    postingDate,
    userName,
    password,
  });

  res.json({ posting: createdPosting });
});

// 게시글 수정 api
router.put("/posting/:postingId", async (req,res) => {
  const {postingId} = req.params
  const {postContent} = req.body
  const {password} = req.body

  //db에 있는 비밀번호
  let [db_password] = await Posting.find({password})
  db_password = db_password.password

  const exisPosts = await Posting.find({postingId})

  if({password}.password === db_password) {
    await Posting.updateOne(
      {postingId: postingId},
      {$set: {postContent: postContent}}
      )
  }
  res.status(200).json({success:true})
})

// 게시글 삭제 api
router.delete("/posting/:postingId", async (req,res) => {
  const {postingId} = req.params
  const {password} = req.body

  let [db_password] = await Posting.find({password})
  db_password = db_password.password

  const exisPosts = await Posting.find({postingId})

  if({password}.password === db_password) {
    await Posting.deleteOne({postingId})
  }

  res.json({result:"success"})

})

module.exports = router;
