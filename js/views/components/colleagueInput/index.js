import React from 'react';
import Search from './search';
import Candidate from './candidate';
import Colleague from './colleague';

class ColleagueInput extends React.Component {

    /**
     * ColleagueInput의 생성자
     * @constructs
     * @param {ColleagueInput.propTypes} props
     */
    constructor(props) {
        super(props);

        this.state = {
            colleagues: []
        };
    }

    /**
     * ColleagueInput을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        var candidates;
        var colleague;
        var colleagueNames = '';

        if (this.props.candidates) {
            candidates = this.props.candidates.map((candidate) => {
                return (
                    <Candidate
                        key={candidate.id}
                        value={candidate}
                        onClick={this._onClickCandidate.bind(this)}
                    />
                );
            });
        }

        if (this.state.colleagues.length > 0) {
            colleague = this.state.colleagues.map((candidate) => {
                return (
                    <Colleague
                        key={candidate.id}
                        value={candidate}
                        onRemove={this._onRemoveColleague.bind(this)}
                    />
                );
            });

            colleagueNames = this.state.colleagues.map((candidate) => {
                return `${candidate.name} <${candidate.email}>`;
            }).join(',');
        }

        return (
            <div className="colleague-input form-group">
                <span className="colleague-input__title">{this.props.title}</span>
                <div className="colleague-input__tags form-control">
                    {colleague}
                    <Search onSearch={this.props.onSearch}/>
                </div>
                <div className="colleague-input__tags candidate">
                    {candidates}
                </div>
                <input name={this.props.name} type="hidden" value={colleagueNames}/>
            </div>
        );
    }

    /**
     * Candidate의 click 이벤트 리스너
     * @param {CandidateValue} candidate
     * @returns {boolean}
     * @private
     */
    _onClickCandidate(candidate) {
        const colleagues = this.state.colleagues;

        if (colleagues.indexOf(candidate) !== -1) {
            return false;
        }

        this.setState({
            colleagues: colleagues.concat([candidate])
        });
    }

    /**
     * Colleague의 remove 이벤트 리스너
     * @private
     */
    _onRemoveColleague(colleague) {
        this.setState({
            colleagues: this.state.colleagues.filter((c) => c !== colleague)
        });
    }
}

/**
 * ColleagueInput의 Props 인터페이스 정의
 * @property {string} title
 * @property {?string} name
 * @property {?Immutable.List<CandidateValue>} candidates
 * @property {?function} onSearch
 */
ColleagueInput.propTypes = {
    title: React.PropTypes.string.isRequired,
    name: React.PropTypes.string,
    candidates: React.PropTypes.object,
    onSearch: React.PropTypes.func
};

/**
 * ColleagueInput의 Props 기본값 정의
 * @property {string} name
 */
ColleagueInput.defaultProps = {
    name: 'colleague'
};

export default ColleagueInput;
