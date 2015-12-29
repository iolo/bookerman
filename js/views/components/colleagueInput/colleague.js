import React from 'react';

class Colleague extends React.Component {

    /**
     * Colleague을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        return (
            <div className="colleague-input__tag label">
                <span>{this.props.value.name}</span>
                <a href="#" role="button" onClick={this._onClick.bind(this)}>
                    <i className="glyphicon glyphicon-remove"></i>
                    <span className="blind">삭제</span>
                </a>
            </div>
        );
    }

    /**
     * a 엘리먼트의 click 이벤트 리스너
     * @param {SyntheticMouseEvent|MouseEvent} event
     * @private
     */
    _onClick(event) {
        event.preventDefault();

        if (this.props.onRemove) {
            this.props.onRemove(this.props.value);
        }
    }
}

/**
 * Colleague의 Props 인터페이스 정의
 * @property {CandidateValue} value
 * @property {?function} onRemove
 */
Colleague.propTypes = {
    value: React.PropTypes.object.isRequired,
    onRemove: React.PropTypes.func
};

/**
 * Colleague의 Props 기본값 정의
 */
Colleague.defaultProps = {};

export default Colleague;
