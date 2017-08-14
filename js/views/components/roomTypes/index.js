import React from 'react';
import RoomType from './roomType';

class RoomTypes extends React.Component {

    /**
     * RoomTypes을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        var floors = {};
        var cols;
        const totalRoomCount = this.props.rooms.length;

        this.props.rooms.forEach((room) => {
            if (floors[room.floor]) {
                floors[room.floor].push(room);
            } else {
                floors[room.floor] = [room];
            }
        });

        cols = Object.keys(floors).map((key) => {
            var currentRoomCount = floors[key].length;
            var rooms = floors[key].map((room, index) => {
                return (
                    <RoomType
                        key={`${room.floor}-${index}`}
                        name={room.name}
                        alias={room.alias}
                    />
                );
            });

            return (
                <div key={key} className="room-types__inner" style={{width: `${currentRoomCount * 200}px`}}>
                    <h3 className="room-types__floor">{key}층</h3>
                    <ul className="room-types__list">{rooms}</ul>
                </div>
            );
        });

        return (
            <div className="room-types" style={{width: `${totalRoomCount * 200}px`}}>
                <h2 className="blind">회의실 목록</h2>
                {cols}
            </div>
        );
    }
}

/**
 * RoomTypes의 Props 인터페이스 정의
 * @property {Array} rooms
 */
RoomTypes.propTypes = {
    rooms: React.PropTypes.array.isRequired
};

/**
 * RoomTypes의 Props 기본값 정의
 */
RoomTypes.defaultProps = {};

export default RoomTypes;
