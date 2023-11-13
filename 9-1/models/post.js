const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        // Post 모델의 속성 및 설정을 초기화합니다.
        return super.init({
            content: {
                type: Sequelize.STRING(140), // 'content' 속성의 데이터 타입은 문자열로 최대 140자까지 허용
                allowNull: false, // 'content' 속성은 null 허용하지 않음
            },
            img: {
                type: Sequelize.STRING(200), // 'img' 속성의 데이터 타입은 문자열로 최대 200자까지 허용
                allowNull: true, // 'img' 속성은 null 허용
            },
        }, {
            sequelize, // Sequelize 객체를 전달하여 모델을 초기화
            timestamps: true, // 타임스탬프를 사용하여 createdAt, updatedAt 필드를 생성
            underscored: false, // 카멜케이스로 생성된 이름을 스네이크케이스로 변환하지 않음
            modelName: 'Post', // 모델 이름
            tableName: 'posts', // 실제 데이터베이스 테이블 이름
            paranoid: false, // 논리적 삭제를 사용하지 않음
            charset: 'utf8mb4', // 문자 세트 설정
            collate: 'utf8mb4_general_ci', // 문자 비교 설정
        });
    }

    static associate(db) {
        // Post 모델과 다른 모델(User, Hashtag) 간의 관계 설정
        db.Post.belongsTo(db.User); // Post는 User 모델에 속함 (다대일 관계)
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); // Post와 Hashtag는 다대다 관계
    }
};
