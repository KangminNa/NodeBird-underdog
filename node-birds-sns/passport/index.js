const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    // Passport 직렬화 설정: 사용자 객체를 식별자(id)로 변환하여 세션에 저장합니다.
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Passport 역직렬화 설정: 세션에서 식별자(id)를 사용자 객체로 변환합니다.
    passport.deserializeUser((id, done) => {
        // 데이터베이스에서 사용자를 찾아 역직렬화합니다.
        User.findOne({ where: { id } })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    // 로컬 전략(localStrategy)을 설정합니다.
    local();

    // 카카오 전략(kakaoStrategy)을 설정합니다.
    kakao();
};

/**
 * passport.serializeUser: 사용자 객체를 세션에 저장하기 위해 호출되는 함수로, 사용자 객체에서 식별자(id)를 추출하여 세션에 저장합니다.
passport.deserializeUser: 세션에서 사용자 식별자(id)를 이용해 사용자 객체를 복원하는 함수로, 데이터베이스에서 사용자를 조회하여 역직렬화합니다.
local(): 로컬 전략(localStrategy)을 설정하는 함수를 호출합니다.
kakao(): 카카오 전략(kakaoStrategy)을 설정하는 함수를 호출합니다.
이렇게 Passport.js를 설정함으로써 사용자 인증 및 세션 처리를 쉽게 구현할 수 있습니다.
 */