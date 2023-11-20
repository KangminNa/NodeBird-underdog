# 9-1 프로젝트 구조 갖추기

## 실습

1. 원하는 폴더를 만든다. 
2. 폴더로 이동한 후에 
```
npm init
```
3. 이후 패키지 이름과, app version(0.0.1), main file(app.js), author : Nakangmi, license : MIT 작성
4. 다 작성했다면 package.json 생성
5. 이후 mysql 및 sequelize 생성을 위한 설치 명령어
```
npm i sequelize mysql2 sequelize-cli

여기서 mysql2는 mysql과 node를 연결하는 드라이버
만약 성공적이라면 package.json에 작성됨
```
6. 글로벌이 아닌 npx를 통해 sequelize init를 설정해준다.
```
npx sequelize init
```
7. 이후 필요한 express 라이브러리 설치
```
npm i express cookie-parser express-session morgan multer dotenv nunjucks 
```
8. 이후 개발용 서버 node-mon 설정 -> 파일변경 확인
```
npm i -D nodemon
```