const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        // User 모델의 속성 및 설정을 초기화합니다.
        return super.init({
            email: {
                type: Sequelize.STRING(40), // 'email' 속성의 데이터 타입은 문자열로 최대 40자까지 허용
                allowNull: true, // 'email' 속성은 null 허용
                unique: true, // 'email' 속성 값은 고유해야 함
            },
            nick: {
                type: Sequelize.STRING(15), // 'nick' 속성의 데이터 타입은 문자열로 최대 15자까지 허용
                allowNull: false, // 'nick' 속성은 null 허용하지 않음
            },
            password: {
                type: Sequelize.STRING(100), // 'password' 속성의 데이터 타입은 문자열로 최대 100자까지 허용
                allowNull: true, // 'password' 속성은 null 허용
            },
            provider: {
                type: Sequelize.STRING(10), // 'provider' 속성의 데이터 타입은 문자열로 최대 10자까지 허용
                allowNull: false, // 'provider' 속성은 null 허용하지 않음
                defaultValue: 'local', // 'provider' 속성의 기본값은 'local'
            },
            snsId: {
                type: Sequelize.STRING(30), // 'snsId' 속성의 데이터 타입은 문자열로 최대 30자까지 허용
                allowNull: true, // 'snsId' 속성은 null 허용
            },
        }, {
            sequelize, // Sequelize 객체를 전달하여 모델을 초기화
            timestamps: true, // 타임스탬프를 사용하여 createdAt, updatedAt 필드를 생성
            underscored: false, // 카멜케이스로 생성된 이름을 스네이크케이스로 변환하지 않음
            modelName: 'User', // 모델 이름
            tableName: 'users', // 실제 데이터베이스 테이블 이름
            paranoid: true, // 논리적 삭제를 사용 (deletedAt 필드 생성)
            charset: 'utf8', // 문자 세트 설정
            collate: 'utf8_general_ci', // 문자 비교 설정
        });
    }

    static associate(db) {
        // User 모델과 다른 모델(Post, User) 간의 관계 설정
        db.User.hasMany(db.Post); // User는 여러 개의 Post를 가질 수 있음 (일대다 관계)
        db.User.belongsToMany(db.User, {
            foreignKey: 'followingId',
            as: 'Followers',
            through: 'Follow',
        });
        db.User.belongsToMany(db.User, {
            foreignKey: 'followerId',
            as: 'Followings',
            through: 'Follow',
        });
    }
};

/*
논리적 삭제는 데이터베이스에서 행을 실제로 삭제하지 않고, 삭제된 행을 추적하기 위해 해당 행에 대한 정보를 유지하는 방식을 말합니다. 

일반적으로, 물리적 삭제는 데이터베이스에서 행을 완전히 삭제하는 것을 의미합니다. 데이터베이스 테이블에서 해당 행이 제거되며, 해당 데이터는 복구할 수 없게 됩니다.

반면에, 논리적 삭제는 행을 테이블에 유지하지만 삭제된 행을 나타내기 위해 해당 행에 대한 특정 플래그를 설정하거나 별도의 컬럼을 사용합니다. 이 플래그를 사용하여 해당 행이 삭제되었음을 나타내고, 이를 통해 삭제된 행을 추적하거나 나중에 복구할 수 있는 기회를 제공합니다.

MySQL과 같은 관계형 데이터베이스에서, 보통 `deletedAt`과 같은 컬럼을 추가하여 논리적 삭제를 구현합니다. 이 컬럼은 행이 삭제된 날짜와 시간을 저장하거나 특정 값으로 표시하여 해당 행이 삭제되었음을 나타냅니다.

예를 들어, Sequelize에서 `paranoid: true`로 설정하면 논리적 삭제를 활성화하고, 모델에서 `deletedAt` 컬럼을 추가하여 삭제 시각을 기록합니다. 삭제된 행의 `deletedAt` 컬럼은 삭제된 시각으로 설정되며, 이를 통해 해당 행이 삭제되었음을 나타냅니다. 추후에 복구가 필요한 경우에는 삭제된 행의 `deletedAt` 값을 업데이트하여 해당 행을 복구할 수 있습니다.
*/
