import React from 'react';

/**
 * @typedef {Object} CandidateValue
 * @property {string} id
 * @property {string} name
 * @property {string} email
 */

class Candidate extends React.Component {

    /**
     * Candidate을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        return (
            <div className="colleague-input__tag label">
                <a href="#" role="button" onClick={this._onClick.bind(this)}>
                    <span>{this.props.value.name}</span>
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

        if (this.props.onClick) {
            this.props.onClick(this.props.value);
        }
    }
}

/**
 * Candidate의 Props 인터페이스 정의
 * @property {CandidateValue} value
 * @property {?function} onClick
 */
Candidate.propTypes = {
    value: React.PropTypes.object.isRequired,
    onClick: React.PropTypes.func
};

/**
 * Candidate의 Props 기본값 정의
 */
Candidate.defaultProps = {};

export default Candidate;
