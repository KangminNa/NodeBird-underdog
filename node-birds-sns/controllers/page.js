// 프로필 보기 페이지 렌더링 함수
exports.renderProfile = (req, res) => {
    // 'profile' 뷰를 렌더링하고 제목 및 기타 정보를 전달합니다.
    res.render('profile', { title: '내 정보 - NodeBird' });
};

// 회원가입 페이지 렌더링 함수
exports.renderJoin = (req, res) => {
    // 'join' 뷰를 렌더링하고 제목 및 기타 정보를 전달합니다.
    res.render('join', { title: '회원가입 - NodeBird' });
};

// 메인 페이지 렌더링 함수
exports.renderMain = (req, res, next) => {
    // 더미 데이터로 초기화된 twits 배열을 생성합니다.
    const twits = [];

    // 'main' 뷰를 렌더링하고 제목 및 초기화된 twits 배열을 전달합니다.
    res.render('main', {
        title: 'NodeBird',
        twits,
    });
};

/**
 * 주요 포인트는 다음과 같습니다:

exports.renderProfile: 프로필 보기 페이지를 렌더링하는 함수로, 'profile' 뷰를 사용하고 제목을 '내 정보 - NodeBird'로 설정합니다.
exports.renderJoin: 회원가입 페이지를 렌더링하는 함수로, 'join' 뷰를 사용하고 제목을 '회원가입 - NodeBird'로 설정합니다.
exports.renderMain: 메인 페이지를 렌더링하는 함수로, 'main' 뷰를 사용하고 제목을 'NodeBird'로 설정하며 초기화된 twits 배열을 전달합니다.
이 코드는 Express 애플리케이션에서 특정 페이지의 렌더링을 담당하는 컨트롤러 함수들을 정의한 것입니다. 뷰 엔진(e.g., Pug, EJS)을 사용하여 HTML을 동적으로 생성하고 클라이언트에 반환합니다.
 */