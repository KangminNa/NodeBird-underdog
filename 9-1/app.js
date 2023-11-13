// express 모듈을 가져옵니다.
const express = require('express');

// 쿠키를 파싱하기 위한 모듈을 가져옵니다.
const cookieParser = require('cookie-parser');

// HTTP 요청 로그를 남기기 위한 모듈을 가져옵니다.
const morgan = require('morgan');

// 파일 및 디렉토리 경로를 다루기 위한 모듈을 가져옵니다.
const path = require('path');

// 세션 관리를 위한 모듈을 가져옵니다.
const session = require('express-session');

// 템플릿 엔진으로 Nunjucks를 설정하기 위한 모듈을 가져옵니다.
// 추후에는 React로 view를 구성하는 것도 매우 좋습니다. 이번 강의에서까지 React를 가르칠 수 없기 때문에
const nunjucks = require('nunjucks');

// 환경 변수를 사용하기 위한 모듈을 가져옵니다.
const dotenv = require('dotenv');

// dotenv를 사용하여 환경 변수를 불러옵니다.
// process.env.COOKIE_SECRET 없음
dotenv.config();
// process.env.COOKIE_SECRET 있음

// 페이지 라우팅을 위한 라우터를 가져옵니다.
const pageRouter = require('/Users/mac_nkm/Documents/GitHub/NodeBird-underdog/9-1/routes/page.js');
const { sequelize } = require('./models');

// express 앱을 생성합니다.
const app = express();

// 포트를 설정합니다. 기본값은 8001을 사용하며, process.env.PORT에 지정된 값이 있다면 해당 값으로 사용합니다.
app.set('port', process.env.PORT || 8001);

// 뷰 엔진을 html로 설정합니다.
app.set('view engine', 'html');

// Nunjucks를 'views' 디렉토리에 적용합니다.
nunjucks.configure('views', {
    express: app, // Express 앱을 Nunjucks에 연결합니다.
    watch: true, // 파일 변경을 감지하여 자동으로 업데이트합니다.
});

sequelize.sync({ force: false }).then(() => {
    console.log('데이터베이스 연결 성공')
    //개발시에만 force:true 왜냐면 기존 테이블이 다 날라가버리기 때문
})

// 요청에 대한 HTTP 로그를 남깁니다. ('dev' 형식을 사용하여 개발용 로그를 출력합니다.) 추후 배포는 ('combined') 입니다.
app.use(morgan('dev'));

// 정적 파일을 제공하기 위해 'public' 디렉토리를 지정합니다.
// public 폴더만 접근 가능하게 만든것 입니다. 
app.use(express.static(path.join(__dirname, 'public')));

// JSON 형식의 요청을 처리하기 위한 미들웨어를 등록합니다.
// body parser
app.use(express.json());

// URL-encoded 데이터를 파싱하기 위한 미들웨어를 등록합니다.
// body parser
app.use(express.urlencoded({ extended: false }));

// 쿠키를 해싱하기 위한 시크릿을 사용하여 쿠키 파싱 미들웨어를 등록합니다.
app.use(cookieParser(process.env.COOKIE_SECRET));

// 세션을 위한 미들웨어를 등록합니다.
app.use(session({
    resave: false, // 변경 사항이 없는 경우에도 세션을 저장할 지 여부를 결정합니다.
    saveUninitialized: false, // 초기화되지 않은 세션을 저장소에 저장할 지 여부를 결정합니다.
    secret: process.env.COOKIE_SECRET, // 이 부분을 수정하여 사용하고자 하는 환경 변수로 변경합니다. // 세션을 서명하는 데 사용되는 비밀 키입니다.

    cookie: {
        httpOnly: true, // 클라이언트 스크립트에서 쿠키에 접근하지 못하도록 하는 옵션입니다.
        secure: false, // HTTPS 프로토콜을 통해서만 쿠키를 전송해야 하는지 여부를 결정합니다.
    },
}));

// 기본 경로('/')에 pageRouter를 사용하여 요청을 라우팅합니다.
app.use('/', pageRouter);

// 요청 경로를 찾지 못한 경우 404 에러를 생성하는 미들웨어를 등록합니다.
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// 에러 핸들링을 위한 미들웨어를 등록합니다.
app.use((err, req, res, next) => {
    // 에러 메시지와 상태를 지역 변수에 설정합니다.
    res.locals.message = err.message;
    // 개발 환경이 아닌 경우 실제 에러를 출력하지 않도록 설정합니다.
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    // 에러 상태 코드를 설정하고 'error' 뷰를 렌더링합니다.
    res.status(err.status || 500);
    res.render('error');
});

// Express 앱을 지정된 포트에서 시작하여 요청을 수신합니다.
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});






