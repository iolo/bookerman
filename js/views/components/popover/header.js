import React from 'react';

class Header extends React.Component {

    /**
     * Header을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        return (
            <div className="popover__header">
                <div className="popover__close">
                    <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        onClick={this.props.onClickClose}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <p className="popover__subject ellipsis">
                    <span>{this.props.subject}</span>
                </p>
                {this.props.description ? (
                    <p className="popover__description">
                        <span>{this.props.description}</span>
                    </p>
                ) : ''}
            </div>
        );
    }
}

/**
 * Header의 Props 인터페이스 정의
 * @property {string} subject
 * @property {string} description
 * @property {?function} onClickClose
 */
Header.propTypes = {
    subject: React.PropTypes.string,
    description: React.PropTypes.string,
    onClickClose: React.PropTypes.func
};

/**
 * Header의 Props 기본값 정의
 */
Header.defaultProps = {};

export default Header;
