import React from 'react';
import Background from './background';
import Body from './body';
import Header from './header';
import Admission from './admission';

class Front extends React.Component {

    /**
     * Front를 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        return (
            <div className="front">
                <div className="front__inner">
                    <Background/>
                    <Body>
                        <Header/>
                        <Admission onClick={this.props.onClick}/>
                    </Body>
                </div>
            </div>
        );
    }
}

export default Front;
