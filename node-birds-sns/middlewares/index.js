// 사용자가 로그인한 상태인지 확인하는 미들웨어
exports.isLoggedIn = (req, res, next) => {
    // Passport.js의 isAuthenticated 메서드를 사용하여 사용자의 로그인 여부를 확인합니다.
    if (req.isAuthenticated()) {
        // 사용자가 로그인한 상태이면 다음 미들웨어로 이동합니다.
        next();
    } else {
        // 사용자가 로그인하지 않은 상태이면 403 Forbidden 상태코드와 함께 '로그인 필요' 메시지를 응답합니다.
        res.status(403).send('로그인 필요');
    }
};

// 사용자가 로그인하지 않은 상태인지 확인하는 미들웨어
exports.isNotLoggedIn = (req, res, next) => {
    // Passport.js의 isAuthenticated 메서드를 사용하여 사용자의 로그인 여부를 확인합니다.
    if (!req.isAuthenticated()) {
        // 사용자가 로그인하지 않은 상태이면 다음 미들웨어로 이동합니다.
        next();
    } else {
        // 사용자가 이미 로그인한 상태이면 메인 페이지로 리다이렉트하며 에러 메시지를 함께 전달합니다.
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
};

/**
 * 주요 포인트는 다음과 같습니다:

exports.isLoggedIn: 사용자가 로그인한 상태인지 확인하는 미들웨어로, req.isAuthenticated()를 사용하여 로그인 여부를 판별합니다. 로그인한 경우 다음 미들웨어로 이동하고, 로그인하지 않은 경우 403 Forbidden 상태코드와 함께 '로그인 필요' 메시지를 응답합니다.
exports.isNotLoggedIn: 사용자가 로그인하지 않은 상태인지 확인하는 미들웨어로, req.isAuthenticated()를 사용하여 로그인 여부를 판별합니다. 로그인하지 않은 경우 다음 미들웨어로 이동하고, 이미 로그인한 경우 메인 페이지로 리다이렉트하며 에러 메시지를 함께 전달합니다.
이러한 미들웨어 함수들을 라우터에 적용하면 특정 페이지에 접근할 때 로그인 상태를 체크하고 적절히 처리할 수 있습니다.
 */