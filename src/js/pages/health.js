import AssistanceButton from '../components/assistanceButton';
import React from 'react';

export default React.createClass({
    render() {
        var h1Style= {textAlign: 'center'}
        return (
            <div>
                <h1 style={h1Style} >Get medical assistance in one tap!</h1>

                <div className="button-bar">
                    <a className="button">Get insurance where you are!</a>
                    <a className="button">Get immediate assistance!</a>
                    <a className="button">Get insurance internationally!</a>
                </div>

                <AssistanceButton assistanceType="health" />
            </div>
        )

    }
})