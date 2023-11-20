const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = () => {
    // Passport에 카카오 OAuth2 전략을 등록합니다.
    passport.use(new KakaoStrategy({
        // 카카오 개발자 센터에서 발급받은 클라이언트 ID를 환경 변수로부터 가져옵니다.
        clientID: process.env.KAKAO_ID,

        // 카카오 로그인 후 리디렉션될 콜백 URL을 설정합니다.
        callbackURL: '/auth/kakao/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        // 카카오에서 전달받은 프로필 정보를 콘솔에 출력합니다. (개발 중에만 사용, 운영 환경에서는 비활성화해야 함)
        console.log('kakao profile', profile);

        try {
            // 데이터베이스에서 카카오 ID와 제공자(provider)가 일치하는 사용자를 찾습니다.
            const exUser = await User.findOne({
                where: { snsId: profile.id, provider: 'kakao' },
            });

            // 이미 등록된 사용자가 있다면 해당 사용자를 Passport에 전달하여 로그인 처리를 완료합니다.
            if (exUser) {
                done(null, exUser);
            } else {
                // 등록된 사용자가 없다면 새로운 사용자를 생성하고 Passport에 전달하여 로그인 처리를 완료합니다.
                const newUser = await User.create({
                    email: profile._json?.kakao_account?.email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
                });
                done(null, newUser);
            }
        } catch (error) {
            // 에러가 발생한 경우 콘솔에 에러를 출력하고 Passport에 에러를 전달하여 처리합니다.
            console.error(error);
            done(error);
        }
    }));
};


/**
 * 이 코드에서 주요한 포인트는 다음과 같습니다:

passport.use: Passport에 카카오 OAuth2 전략을 등록하는 부분입니다.
process.env.KAKAO_ID: 카카오 개발자 센터에서 발급받은 클라이언트 ID를 환경 변수로부터 가져옵니다.
callbackURL: 카카오 로그인 후에 사용자가 리디렉션되는 콜백 URL을 설정합니다.
전략 내의 콜백 함수: 카카오 OAuth 인증이 성공하면 사용자 정보를 처리하고, 실패하면 에러를 처리합니다.
User.findOne: 데이터베이스에서 카카오 ID와 제공자(provider)가 일치하는 사용자를 조회합니다.
사용자가 이미 등록되어 있다면 해당 사용자를 반환하고, 등록되어 있지 않다면 새로운 사용자를 생성하여 반환합니다.
이렇게 구현된 코드를 사용하면 카카오 OAuth2 전략을 Passport.js와 함께 사용하여 손쉽게 인증 기능을 구현할 수 있습니다.
 */
