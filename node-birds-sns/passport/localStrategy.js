const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
    // Passport에 로컬 전략을 등록합니다.
    passport.use(new LocalStrategy({
        // 사용자의 로그인 시 사용할 필드를 지정합니다. 여기서는 이메일과 비밀번호를 사용합니다.
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: false,  // req를 콜백 함수에 전달할지 여부를 결정합니다. 여기서는 사용하지 않습니다.
    }, async (email, password, done) => {
        try {
            // 데이터베이스에서 입력받은 이메일과 일치하는 사용자를 조회합니다.
            const exUser = await User.findOne({ where: { email } });

            if (exUser) {
                // 사용자가 존재하는 경우, 비밀번호를 비교하여 일치 여부를 확인합니다.
                const result = await bcrypt.compare(password, exUser.password);

                if (result) {
                    // 비밀번호가 일치하면 사용자 정보를 Passport에 전달하여 로그인 처리를 완료합니다.
                    done(null, exUser);
                } else {
                    // 비밀번호가 일치하지 않으면 로그인을 거부하고 메시지를 전달합니다.
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
                }
            } else {
                // 사용자가 존재하지 않으면 로그인을 거부하고 메시지를 전달합니다.
                done(null, false, { message: '가입되지 않은 회원입니다.' });
            }
        } catch (error) {
            // 에러가 발생한 경우 콘솔에 에러를 출력하고 Passport에 에러를 전달하여 처리합니다.
            console.error(error);
            done(error);
        }
    }));
};

/**
 * 주요 포인트는 다음과 같습니다:

passport.use: Passport에 로컬 전략을 등록합니다.
usernameField 및 passwordField: 사용자의 로그인 시 사용할 필드를 지정합니다. 여기서는 이메일과 비밀번호를 사용합니다.
async (email, password, done): 로컬 전략 콜백 함수로, 입력받은 이메일과 일치하는 사용자를 데이터베이스에서 조회합니다.
bcrypt.compare: 입력받은 비밀번호와 데이터베이스에 저장된 해시된 비밀번호를 비교하여 일치 여부를 확인합니다.
로그인이 성공하면 done(null, exUser)를 호출하여 Passport에 사용자 정보를 전달합니다.
로그인이 실패하면 done(null, false, { message: '...' })를 호출하여 Passport에 에러 메시지를 전달합니다.
이렇게 구현된 코드를 사용하면 Passport.js를 활용하여 로컬 인증 기능을 구현할 수 있습니다.
 */
