import React from 'react';

class Search extends React.Component {

    /**
     * Search의 생성자
     * @constructs
     * @param {Search.propTypes} props
     */
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };
    }

    /**
     * Search을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        return (
            <label className="colleague-input__search">
                <span className="blind">검색어 입력</span>
                <input
                    placeholder="검색어 입력"
                    value={this.state.value}
                    type="text"
                    onChange={this._onChange.bind(this)}
                />
            </label>
        );
    }

    /**
     * input의 change 이벤트 리스너
     * @param {SyntheticInputEvent|InputEvent} event
     * @private
     */
    _onChange(event) {
        const value = event.target.value;

        this.setState({value});

        if (this.props.onSearch) {
            this.props.onSearch(value);
        }
    }
}

/**
 * Search의 Props 인터페이스 정의
 * @property {?function} onSearch
 */
Search.propTypes = {
    onSearch: React.PropTypes.func
};

/**
 * Search의 Props 기본값 정의
 */
Search.defaultProps = {};

export default Search;
