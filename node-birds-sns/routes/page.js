const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { renderProfile, renderJoin, renderMain } = require('../controllers/page');

// Express Router 객체를 생성합니다.
const router = express.Router();

// 모든 라우터에 대한 미들웨어로 사용자 정보, 팔로워/팔로잉 수, 팔로잉한 사용자 ID 목록을 res.locals에 추가합니다.
router.use((req, res, next) => {
    // 현재 로그인한 사용자 정보를 res.locals에 추가합니다.
    res.locals.user = req.user;

    // 팔로워와 팔로잉 수, 그리고 팔로잉한 사용자 ID 목록을 초기화합니다.
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followingIdList = [];

    // 세션 정보를 초기화합니다. (session에 오타가 있으므로 수정)
    req.session;

    // 다음 미들웨어로 제어를 전달합니다.
    next();
});

// 프로필 보기 라우터. 로그인한 사용자만 접근 가능하도록 isLoggedIn 미들웨어를 사용합니다.
router.get('/profile', isLoggedIn, renderProfile);

// 회원가입 페이지 보기 라우터. 로그인하지 않은 사용자만 접근 가능하도록 isNotLoggedIn 미들웨어를 사용합니다.
router.get('/join', isNotLoggedIn, renderJoin);

// 메인 페이지 보기 라우터. 모든 사용자가 접근 가능합니다.
router.get('/', renderMain);

// 모듈을 외부로 내보냅니다.
module.exports = router;

/**
 * router.use: 모든 라우터에 대한 공통 미들웨어로 사용자 정보와 세션 초기화 등을 수행합니다.
router.get('/profile', isLoggedIn, renderProfile): 프로필 보기 라우터. isLoggedIn 미들웨어를 사용하여 로그인한 사용자만 접근 가능하도록 합니다.
router.get('/join', isNotLoggedIn, renderJoin): 회원가입 페이지 보기 라우터. isNotLoggedIn 미들웨어를 사용하여 로그인하지 않은 사용자만 접근 가능하도록 합니다.
router.get('/', renderMain): 메인 페이지 보기 라우터. 모든 사용자가 접근 가능합니다.
 */