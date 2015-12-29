import React from 'react';

class RoomType extends React.Component {

    /**
     * RoomType을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        const roomName = `${this.props.name}(${this.props.alias})`;

        return (
            <li className="room-types__item" style={{width: this.props.widthRatio}}>
                <p className="room-types__name ellipsis">
                    <a href="#" title={roomName}>{roomName}</a>
                </p>
            </li>
        );
    }
}

/**
 * RoomType의 Props 인터페이스 정의
 * @property {string} name
 * @property {string} alias
 * @property {string} widthRatio
 */
RoomType.propTypes = {
    name: React.PropTypes.string.isRequired,
    alias: React.PropTypes.string.isRequired,
    widthRatio: React.PropTypes.string.isRequired
};

/**
 * RoomType의 Props 기본값 정의
 */
RoomType.defaultProps = {};

export default RoomType;
