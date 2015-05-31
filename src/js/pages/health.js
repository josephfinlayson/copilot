import AssistanceButton from '../components/assistanceButton';
import React from 'react';

export default React.createClass({
    render() {
        var h1Style = {
            textAlign: 'center', paddingTop: '40px', margin: '10px',
            marginLeft: 'auto', marginRight: 'auto', padding: '10px'
        }
        var buttonStyle = {display: 'block', paddingTop: '40px'}

        return (
            <div>
                <h1 style={h1Style}>Get medical assistance in one tap!</h1>

                <AssistanceButton
                    buttonClasses="button button-block health-button button-royal"
                    buttonText="Get insurance where you are"
                    assistanceType="healthInsuranceSingleCountry"
                />

                <AssistanceButton
                    buttonClasses="button button-block health-button button-positive"
                    buttonText="Get immediate assistance!"
                    assistanceType="immediateAssistance"
                />

                <AssistanceButton
                    buttonClasses="button button-block health-button button-energized"
                    buttonText="Get insurance internationally!"
                    assistanceType="healthInsuranceGlobal"
                />

            </div>
        )

    }
})