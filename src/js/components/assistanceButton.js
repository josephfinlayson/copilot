window.allianzAPIKey = "ffd4dedb-69b8-429a-8122-83c52edb632a";
import React from 'react';
import Modal from 'react-modal';
import $ from 'jquery';

export default React.createClass({
    getInitialState() {
        console.log(this.getAssistanceType(this.props.assistanceType));
        return {
            modelIsOpen: false,
            assistanceInfo: this.getAssistanceType(this.props.assistanceType) || {}
        }
    },
    getAssistanceType(type) {
        switch (type) {
            case 'health':
                var obj = {
                    "code": "50007",
                    header: "Assistance with Medical Advice",
                    "name": "Medical advice",
                    "description": "In case you have medical problems on your travel and need expertise from a physician.",
                    "price": 79
                }
                return obj;
                break;
            case 'car':
                var obj = {
                    "code": "1005",
                    "category": "ROADSIDE",
                    "type": "PAY_PER_USE",
                    "name": "Roadside Assistance services",
                    "description": "We tow or repair your vehicle or repair on spot if possible.",
                    "price": 0
                }
                return obj;

                break;

            case 'crime':

                var obj = {
                    "code": "50004",
                    "name": "Robbery",
                    "description": "Help in case of robbery",
                    "price": 19
                }

                return obj;
                break;

            default:
                console.log(this.state);
                break;
        }
    },
    postServiceResponse() {

        var hollowResponse = {
            "appointmentDate": "2015-05-30T18:53:47.392Z",
            "appointmentAddress": "string",
            "appointmentLatitude": 0,
            "appointmentLongitude": 0,
            "description": "string",
            "serviceCode": "50004",
            "supplierCode": "1002",
            "paymentMethod": "CREDIT_CARD",
            "creditCardNumber": "string",
            "creditCardValidationCode": "string",
            "creditCardValidUntilMonth": 2,
            "creditCardValidUntilYear": 2020
        }
        return hollowResponse

    },
    closeModal() {
        this.setState({modalIsOpen: false});

    },
    openModal() {
        this.setState({modalIsOpen: true});
    },
    render() {

        return (
            <div>
                <button onClick={this.openModal}
                    className="button button-assertive">
                        {this.props.assistanceType}
                </button>
                <Modal isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                >
                    <div className="padding scroll-content ionic-scroll has-header">
                        <div className="scroll">
                            <h2>{this.state.assistanceInfo.header}</h2>
                            Allianz can assist you anywhere you are.
                            <h5>Service details</h5>
                            <span>
                            {this.state.assistanceInfo.description}
                            </span>
                            <h5> Service cost</h5>
                            This service costs $<span>{this.state.assistanceInfo.price}</span>.
                            An Allianz service personal will be sent to your location as soon as possible
                            <div>
                                <button onClick={this.confirmServiceRequest}
                                    className="button button-positive">
                                    Confirm service request
                                </button>
                                <button onClick={this.closeModal}
                                    className="button">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal >
            </div>
        )
    }

})
