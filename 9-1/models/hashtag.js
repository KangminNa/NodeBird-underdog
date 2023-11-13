const Sequelize = require('sequelize');

module.exports = class Hashtag extends Sequelize.Model {
    static init(sequelize) {
        // Hashtag 모델의 속성 및 설정을 초기화합니다.
        return super.init({
            title: {
                type: Sequelize.STRING(15), // 'title' 속성의 데이터 타입은 문자열로 최대 15자까지 허용
                allowNull: false, // 'title' 속성은 null 허용하지 않음
                unique: true, // 'title' 속성 값은 고유해야 함
            },
        }, {
            sequelize, // Sequelize 객체를 전달하여 모델을 초기화
            timestamps: true, // 타임스탬프를 사용하여 createdAt, updatedAt 필드를 생성
            underscored: false, // 카멜케이스로 생성된 이름을 스네이크케이스로 변환하지 않음
            modelName: 'Hashtag', // 모델 이름
            tableName: 'hashtags', // 실제 데이터베이스 테이블 이름
            paranoid: false, // 논리적 삭제를 사용하지 않음
            charset: 'utf8mb4', // 문자 세트 설정
            collate: 'utf8mb4_general_ci', // 문자 비교 설정
        });
    }

    static associate(db) {
        // Hashtag 모델과 다른 모델(Post) 간의 관계 설정
        db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' }); // Hashtag와 Post는 다대다 관계
    }
};
