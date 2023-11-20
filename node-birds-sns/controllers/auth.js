const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

// 회원가입 처리 함수
exports.join = async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
        // 이미 가입된 이메일이 있는지 확인합니다.
        const exUser = await User.findOne({ where: { email } });

        // 이미 가입된 이메일이 있다면 회원가입 페이지로 에러 메시지를 함께 리다이렉트합니다.
        if (exUser) {
            return res.redirect('/join?error=exist');
        }

        // 비밀번호를 bcrypt를 사용해 해싱합니다.
        const hash = await bcrypt.hash(password, 12);

        // 새로운 사용자를 생성하고 데이터베이스에 저장합니다.
        await User.create({
            email,
            nick,
            password: hash,
        });

        // 회원가입이 성공하면 홈 페이지로 리다이렉트합니다.
        return res.redirect('/');
    } catch (error) {
        // 에러가 발생한 경우 콘솔에 에러를 출력하고 에러 미들웨어로 전달합니다.
        console.error(error);
        return next(error);
    }
};

// 로그인 처리 함수
exports.login = (req, res, next) => {
    // Passport를 사용하여 로컬 인증을 수행합니다.
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            // 인증 과정에서 에러가 발생한 경우 콘솔에 에러를 출력하고 에러 미들웨어로 전달합니다.
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            // 로그인이 실패한 경우 메인 페이지로 에러 메시지를 함께 리다이렉트합니다.
            return res.redirect(`/?error=${info.message}`);
        }

        // 로그인이 성공한 경우 req.login을 통해 사용자 정보를 세션에 저장합니다.
        return req.login(user, (loginError) => {
            if (loginError) {
                // 로그인 과정에서 에러가 발생한 경우 콘솔에 에러를 출력하고 에러 미들웨어로 전달합니다.
                console.error(loginError);
                return next(loginError);
            }

            // 로그인이 성공하면 홈 페이지로 리다이렉트합니다.
            return res.redirect('/');
        });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

// 로그아웃 처리 함수
exports.logout = (req, res) => {
    // Passport를 사용하여 로그아웃을 수행합니다.
    req.logout(() => {
        // 로그아웃이 완료되면 홈 페이지로 리다이렉트합니다.
        res.redirect('/');
    });
};

/**
 * 이 코드에서 주요 포인트는 다음과 같습니다:

exports.join: 사용자 회원가입을 처리하는 함수로, 입력된 이메일이 이미 존재하는지 확인하고 bcrypt를 사용하여 비밀번호를 해싱한 후 데이터베이스에 저장합니다.
exports.login: Passport.js를 사용하여 로그인을 처리하는 함수로, 로컬 인증이 실패하면 에러 메시지를 함께 메인 페이지로 리다이렉트하고, 성공하면 세션에 사용자 정보를 저장하고 홈 페이지로 리다이렉트합니다.
exports.logout: Passport.js를 사용하여 로그아웃을 처리하는 함수로, 로그아웃이 완료되면 홈 페이지로 리다이렉트합니다.
 */