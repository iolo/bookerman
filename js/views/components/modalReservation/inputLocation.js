import React from 'react';

class InputLocation extends React.Component {

    /**
     * InputLocation의 생성자
     * @constructs
     * @param {InputLocation.propTypes} props
     */
    constructor(props) {
        super(props);

        this.state = {};
    }

    /**
     * InputLocation을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        return (
            <div className="form-group straight">
                <label>
                    <span>위치 :</span>
                    <input
                        className="form-control modal-reservation__subject"
                        name="location"
                        type="text"
                        defaultValue={`${this.props.floor}층, ${this.props.name}(${this.props.alias})`}
                        readOnly
                    />
                </label>
            </div>
        );
    }
}

/**
 * InputLocation의 Props 인터페이스 정의
 * @property {number} floor
 * @property {string} name
 * @property {string} alias
 */
InputLocation.propTypes = {
    floor: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    alias: React.PropTypes.string.isRequired
};

/**
 * InputLocation의 Props 기본값 정의
 */
InputLocation.defaultProps = {};

export default InputLocation;
