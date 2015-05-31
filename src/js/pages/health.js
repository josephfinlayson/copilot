import AssistanceButton from '../components/assistanceButton';
import React from 'react';

export default React.createClass({
    render() {
        var h1Style = {
            textAlign: 'center', paddingTop: '40px', margin: '10px',
            marginLeft: '12%'
        }
        var buttonStyle = {display: 'block', paddingTop: '40px'}

        return (
            <div>
                <h1 style={h1Style}>Get medical assistance in one tap!</h1>

                <a className="button button-block health-button button-royal" >Get insurance where you are!</a>
                <a className="button button-block health-button button-positive">Get immediate assistance!</a>
                <a className="button button-block health-button button-energized">Get insurance internationally!</a>

                <AssistanceButton assistanceType="health" />

            </div>
        )

    }
})