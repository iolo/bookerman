import React from 'react';
import moment from 'moment';
import reactMixin from 'react-mixin';
import {History} from 'react-router';
import ajaxer from '../../mixins/ajaxer';
import ACTIONS from '../../../actions';
import {dispatch} from '../../../dispatcher';
import ModalDialog from './modalDialog';
import ModalForm from './modalForm';
import Header from './header';
import Footer from './footer';
import InputSubject from './inputSubject';
import InputDescription from './inputDescription';
import InputLocation from './inputLocation';
import SelectTime from './selectTime';
import ColleagueInput from '../colleagueInput';

@reactMixin.decorate(History)
@reactMixin.decorate(ajaxer)
class ModalReservation extends React.Component {

    /**
     * ModalReservation의 생성자
     * @constructs
     * @param {ModalReservation.propTypes} props
     */
    constructor(props) {
        super(props);

        this.state = {
            users: null
        };
    }

    /**
     * ModalReservation이 rerender 되기 전 호출된다.
     * @param {ModalReservation.propTypes} nextProps
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.date !== this.props.date ||
            nextProps.show !== this.props.show ||
            nextProps.rooms !== this.props.rooms ||
            nextProps.users !== this.props.users ||
            nextProps.values !== this.props.values ||
            nextProps.start !== this.props.start ||
            nextProps.end !== this.props.end ||
            nextState.users !== this.state.users
        );
    }

    /**
     * ModalReservation을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        const currentRoomFloor = this.props.values.get('floor');
        const currentRoomName = this.props.values.get('name');
        const currentRoomAlias = this.props.values.get('alias');
        const startTime = moment({hour: this.props.start, minutes: 0});
        const endTime = moment({hour: this.props.end, minutes: 0});
        const selectedStartTime = moment(this.props.values.get('time'));

        if (selectedStartTime) {
            startTime.set({hour: selectedStartTime.hour(), minutes: selectedStartTime.minutes()});
        }

        return (
            <ModalDialog show={this.props.show}>
                <ModalForm onSubmit={this._onSubmit.bind(this)}>
                    <Header date={this.props.date}/>
                    <div className="modal-body">
                        <InputSubject/>
                        <InputDescription/>
                        <InputLocation floor={currentRoomFloor} name={currentRoomName} alias={currentRoomAlias}/>
                        <SelectTime startTime={startTime} endTime={endTime}/>
                        <ColleagueInput
                            title="참석자 :"
                            name="colleague"
                            candidates={this.state.users}
                            onSearch={this._onSearchColleague.bind(this)}
                        />
                    </div>
                    <Footer onCancel={this._onCancel.bind(this)}/>
                </ModalForm>
            </ModalDialog>
        );
    }

    /**
     * ColleagueInput의 search 이벤트 리스너
     * @param {string} value
     * @private
     */
    _onSearchColleague(value) {
        const users = this.props.users.filter((user) => {
            const fullName = user.get('name').get('fullName');

            return value !== '' && fullName.indexOf(value) !== -1;
        }).map((user) => {
            return {
                id: user.get('id'),
                name: user.get('name').get('fullName'),
                email: user.get('emails').get(0).get('address')
            };
        });

        this.setState({users});
    }

    /**
     * ModalForm의 submit 이벤트 리스너
     * @param {Object} datas
     * @private
     */
    _onSubmit(datas) {
        this.history.pushState(null, `/calendar/${this.props.date}`);

        dispatch({type: ACTIONS.LOADING_MODE, value: true});

        this.ajaxer.events.create({
            summary: datas.subject,
            description: datas.description,
            location: datas.location,
            datetime: this.props.date,
            attendees: datas.colleague ? datas.colleague.split(',') : [],
            start: datas.start,
            end: datas.end
        }).then(() => {
            return this.ajaxer.updateEvents();
        });
    }

    /**
     * Footer의 cancel 이벤트 리스너
     * @private
     */
    _onCancel() {
        this.history.pushState(null, `/calendar/${this.props.date}`);
    }
}

/**
 * ModalReservation의 Props 인터페이스 정의
 * @property {string} date
 * @property {Array} rooms
 * @property {Immutable.List} users
 * @property {Immutable.Map} values
 * @property {?boolean} show
 * @property {?number} start
 * @property {?number} end
 */
ModalReservation.propTypes = {
    date: React.PropTypes.string.isRequired,
    rooms: React.PropTypes.array.isRequired,
    users: React.PropTypes.object.isRequired,
    values: React.PropTypes.object.isRequired,
    show: React.PropTypes.bool,
    start: React.PropTypes.number,
    end: React.PropTypes.number
};

/**
 * ModalReservation의 Props 기본값 정의
 */
ModalReservation.defaultProps = {};

export default ModalReservation;
