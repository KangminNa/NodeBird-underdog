const express = require('express');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { join, login, logout } = require('../controllers/auth');

// Express Router 객체를 생성합니다.
const router = express.Router();

// POST /auth/join
// 회원가입 요청을 처리하는 라우터. isNotLoggedIn 미들웨어를 사용하여 로그인한 사용자가 요청할 경우 처리하지 않습니다.
router.post('/join', isNotLoggedIn, join);

// POST /auth/login
// 로그인 요청을 처리하는 라우터. isNotLoggedIn 미들웨어를 사용하여 로그인한 사용자가 요청할 경우 처리하지 않습니다.
router.post('/login', isNotLoggedIn, login);

// GET /auth/logout
// 로그아웃 요청을 처리하는 라우터. isLoggedIn 미들웨어를 사용하여 로그인한 사용자만 로그아웃할 수 있도록 합니다.
router.get('/logout', isLoggedIn, logout);

// GET /auth/kakao
// 카카오 로그인 요청을 처리하는 라우터. passport.authenticate('kakao')를 통해 Kakao OAuth 인증을 시작합니다.
router.get('/kakao', passport.authenticate('kakao'));

// GET /auth/kakao/callback
// 카카오 로그인 콜백 요청을 처리하는 라우터. passport.authenticate('kakao')를 통해 Kakao OAuth 인증을 완료합니다.
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/?error=카카오로그인 실패',  // 인증 실패 시에는 메인 페이지로 리다이렉트합니다.
}), (req, res) => {
    res.redirect('/'); // 인증 성공 시에는 홈 페이지로 리다이렉트합니다.
});

// 모듈을 외부로 내보냅니다.
module.exports = router;

/**
 * 이 코드에서 주요한 포인트는 다음과 같습니다:

/auth/join: 회원가입 처리 라우터. isNotLoggedIn 미들웨어를 통해 로그인한 사용자가 접근하지 못하도록 합니다.
/auth/login: 로그인 처리 라우터. isNotLoggedIn 미들웨어를 통해 로그인한 사용자가 접근하지 못하도록 합니다.
/auth/logout: 로그아웃 처리 라우터. isLoggedIn 미들웨어를 통해 로그인한 사용자만 접근할 수 있도록 합니다.
/auth/kakao: 카카오 로그인 시작 라우터. 카카오 OAuth 인증을 시작합니다.
/auth/kakao/callback: 카카오 로그인 콜백 라우터. Kakao OAuth 인증이 성공하면 홈 페이지로 리다이렉트하고, 실패하면 에러 메시지를 가지고 메인 페이지로 리다이렉트합니다.
 */