const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

// 각 모델 파일을 가져옵니다.
const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');

// Sequelize 연결 설정
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

// db 객체 생성
const db = {};

// Sequelize 연결을 db 객체에 추가
db.sequelize = sequelize;

// // 모델 파일을 읽어들여 동적으로 모델을 추가하고 초기화합니다.
// // 각 모델 파일의 associate 메서드를 호출하여 관계 설정
// fs.readdirSync(__dirname).filter(file => {
//   // 파일명에서 .으로 시작하고, basename과 일치하지 않으며 .js 파일인 경우 필터링
//   return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
// }).forEach(file => {
//   const model = require(path.join(__dirname, file));
//   db[model.name] = model; // db 객체에 각 모델 추가
//   model.init(sequelize); // Sequelize 연결을 통해 모델 초기화
// });

// // 각 모델 파일의 associate 메서드 호출하여 관계 설정
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// 각 모델을 db 객체에 추가하고 초기화합니다.
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;
User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);

// 모델 간의 관계 설정
User.associate(db);
Post.associate(db);
Hashtag.associate(db);

// 완성된 db 객체를 내보냅니다.
module.exports = db;
