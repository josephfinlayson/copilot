//window.allianzAPIKey = "ffd4dedb-69b8-429a-8122-83c52edb632a";
window.allianzAPIKey = "test-apiKey-1"
import React from 'react';
import Router from 'react-router';

import Modal from 'react-modal';
import $ from 'jquery';

export default React.createClass({
    mixins: [Router.Navigation, Router.State],
    getInitialState() {
        console.log(this.getAssistanceType(this.getPathname()));
        var assistanceTypeRequested;
        if (this.props.assistanceType){
            assistanceTypeRequested = this.props.assistanceType;
        }
        else {
            assistanceTypeRequested = this.getPathname().substr(1);
        }
        return {
            modalIsOpen: false,
            assistanceInfo: this.getAssistanceType(assistanceTypeRequested) || {}
        };
    },
    confirmServiceRequest() {
        var self = this;
        let postInfo = this.getServiceRequestDetails();
        postInfo.then(function (fulfilledPost) {
            return $.when($.post('https://aai-api.com/api/serviceOrders?apiKey=' + window.allianzAPIKey, fulfilledPost))
        }).then(function (data) {
            self.setState({'appointmentConfirmation': data})
            console.log(data);
        })
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
                break;
            case 'map':

                var obj = {
                    "code": "50004",
                    "name": "Robbery",
                    "description": "Help in case of robbery",
                    "price": 19
                }


                return obj;
                break;
            case 'crimeMap':
                var obj = {
                    "code": "1007",
                    "category": "TRAVEL",
                    "type": "SUBSCRIPTION",
                    "name": "Single Trip EU Travel Insurance",
                    "description": "1 day travel insurance for one person, including cancellation, medical advice, medical costs, repatriation, personal accident cover. Remark: Add number of days and travelers as multiplicator.",
                    "price": 1.99
                }
                return obj;
                break;
            default:
                console.log(this.state);
                break;
        }
    },
    getServiceRequestDetails() {
        let now = new Date();
        var hollowResponse = {
            "appointmentDate": now.toISOString(),
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
        var deferred = $.Deferred();

        navigator.geolocation.getCurrentPosition(
            function (a) {
                console.log(a.coords)
                hollowResponse.appointmentLatitude = a.coords.latitude;
                hollowResponse.appointmentLongitude = a.coords.longitude;
                deferred.resolve(hollowResponse);
            },
            deferred.reject)

        return deferred.promise();

    },
    closeModal() {
        this.setState({modalIsOpen: false});

    },
    openModal() {
        this.setState({modalIsOpen: true});
    },
    render() {
        console.log(this.state.appointmentConfirmation);
        var divStyle = {
            width: '100%'
        };

        if (!this.state.appointmentConfirmation) {
            var modalContents = <div className="scroll">
                <h2>{this.state.assistanceInfo.header}</h2>
                Allianz can assist you anywhere you are.
                <h5>Service details</h5>
                <span>
                            {this.state.assistanceInfo.description}
                </span>
                <h5> Service cost</h5>
                This service costs $
                <span>{this.state.assistanceInfo.price}</span>
                .
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
            </div>;
        } else {
            var modalContents = <div className="scroll">
                <h2>Success</h2>
                You have an appointment
                <span>{' ' + this.state.appointmentConfirmation.status}</span>
                with an Allianz professional on
                <span>{' ' + this.state.appointmentConfirmation.appointmentDate}</span>
                <div>
                    <button onClick={this.closeModal}
                        className="button">
                        Close
                    </button>
                </div>
            </div>
        }
        return (
            <div style={divStyle}>
                <button onClick={this.openModal}
                    className="button button-clear button-SOS">
                    SOS
                </button>
                <Modal isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                >
                    <div className="padding scroll-content ionic-scroll">
                    {modalContents}
                    </div>
                </Modal >
            </div>
        )
    }

})
