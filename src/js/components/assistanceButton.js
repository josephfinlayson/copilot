//window.allianzAPIKey = "ffd4dedb-69b8-429a-8122-83c52edb632a";
window.allianzAPIKey = "test-apiKey-1"
import React from 'react';
import Router from 'react-router';

import Modal from 'react-modal';
import $ from 'jquery';

export default React.createClass({
    mixins: [Router.Navigation, Router.State],
    getInitialState() {


        var assistanceTypeRequested = () => this.props.assistanceType ?
          this.props.assistanceType : this.getPathname().substr(1);

        if (!this.props.assistanceType) {
            setInterval(() => {
                this.setState({assistanceInfo: this.getAssistanceType(assistanceTypeRequested()) || {}});
            }, 1000);
        }

        return {
            modalIsOpen: false,
            assistanceInfo: this.getAssistanceType(assistanceTypeRequested()) || {}
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

        var products = {

          '1001': {
            "code": "1001",
            "category": "HOME",
            "type": "SUBSCRIPTION",
            "name": "Home emergency assistance and insurance",
            "description": "We cover the typical mishaps you may encounter: If you lost your keys, a window or door gets broken and many more. Our assistance service is able to dispatch every type of craftsmen at no additional cost & at high quality and guaranteed low cost. 12 month subscription, coverage max. 1,500 per incident.",
            "price": 119
          },


          '1002': {
            "code": "1002",
            "category": "HOME",
            "type": "PAY_PER_USE",
            "name": "Home craftsmen services",
            "description": "From our extensive network we can offer you proved, high qualitative craftsmen at a very competitive price. With our Allianz satisfaction guarantee, you can enjoy peace of mind through the whole process.",
            "price": 0
          },


          '1003': {
            "code": "1003",
            "category": "SMART_HOME",
            "type": "SUBSCRIPTION",
            "name": "Smart Home Assist",
            "description": "You have a Google Nest, SOMFY or DEUTSCHE TELEKOM Smart Home or similar Smarthome that is able to connect to our Alarm API? We offer a 12 months subscription contract to control any incidents (theft, fire, water) and apply countermeasures.",
            "price": 129
          },


          '1004': {
            "code": "1004",
            "category": "ROADSIDE",
            "type": "SUBSCRIPTION",
            "name": "Road Side Assistance",
            "description": "Road side assistance solutions including coverage for towing costs up to 50km and costs connected with (e.g. transportation, hotel stay). 12 month subscription.",
            "price": 89,
            "services": {
              "30006": {
                "code": "30006",
                "name": "Battery",
                "description": "If your battery is down - we change it on spot. Does not include price for battery.",
                "price": 0
              },
              "30009": {
                "code": "30009",
                "name": "All-inclusive road side assistance service",
                "description": "If it is a smaller damage or you cannot continue your travel and you need to stay in a hotel or an exchange car - we will evaluate with you and do the necessary things.",
                "price": 0
              },
              "30004": {
                "code": "30004",
                "name": "Fuel",
                "description": "In case being out of fuel, we provide you 5L.",
                "price": 39
              },
              "30008": {
                "code": "30008",
                "name": "Flat tire",
                "description": "Immediate on-spot repair for your flat tire",
                "price": 0
              }
            }
          },


          '1005': {
            "code": "1005",
            "category": "ROADSIDE",
            "type": "PAY_PER_USE",
            "name": "Roadside Assistance services",
            "description": "We tow or repair your vehicle or repair on spot if possible.",
            "price": 0,
            "services": {
                '30010': {
                    "code": "30010",
                    "name": "Towing",
                    "description": "In case of a breakdown or accident and you cannot continue your journey with your car.",
                    "price": 149
                  },
                '30005': {
                    "code": "30005",
                    "name": "Battery",
                    "description": "If your battery is down - we change it on spot. Does not include price for battery.",
                    "price": 49
                  },
                '30002': {
                    "code": "30002",
                    "name": "Fuel",
                    "description": "In case being out of fuel, we provide you 5L.",
                    "price": 49
                  },
                '30007': {
                    "code": "30007",
                    "name": "Flat tire",
                    "description": "Immediate on-spot repair for your flat tire. Price not including exchange tire.",
                    "price": 59
                  }
            }
          },


          '1006': {
            "code": "1006",
            "category": "HOME",
            "type": "PAY_PER_USE",
            "name": "Home Care Services",
            "description": "Everyone needs to care for beloved ones - but can you trust the people helping you? We have a trusted network of elderly or accident home care, child care and pet care services.",
            "price": 0,
            "services": {
                  "40001": {
                    "code": "40001",
                    "name": "Elderly care",
                    "description": "1 h visit from our local medical care specialist network.",
                    "price": 35
                  },
                  "40002": {
                    "code": "40002",
                    "name": "Child care",
                    "description": "1 h visit from our local child care specialist network.",
                    "price": 25
                  },
                  "40003": {
                    "code": "40003",
                    "name": "Pet care",
                    "description": "1 h visit from our local pet care specialist network.",
                    "price": 29
                  }
            }
          },


          '1007': {
            "code": "1007",
            "category": "TRAVEL",
            "type": "SUBSCRIPTION",
            "name": "Single Trip EU Travel Insurance",
            "description": "1 day travel insurance for one person, including cancellation, medical advice, medical costs, repatriation, personal accident cover. Remark: Add number of days and travelers as multiplicator.",
            "price": 1.99,
            "services": {
                "50010": {
                    "code": "50010",
                    "name": "Medical advice",
                    "description": "In case you have medical problems on your travel and need expertise from a physician.",
                    "price": 0
                  },
                "50008": {
                    "code": "50008",
                    "name": "Emergency service - non medical",
                    "description": "_",
                    "price": 0
                  }
            }
          },


          '1009': {
            "code": "1009",
            "category": "TRAVEL",
            "type": "SUBSCRIPTION",
            "name": "Annual EU Family Travel Insurance",
            "description": "Travel insurance, including cancellation, medical advice, medical costs, repatriation, personal accident cover. 12 month subscription. Covers up to 4 persons traveling.",
            "price": 99
          },


          '1008': {
            "code": "1008",
            "category": "TRAVEL",
            "type": "PAY_PER_USE",
            "name": "Travel emergency assistance",
            "description": "Get helped in a foreign country, where you need urgent help (for safety, medcial, other reasons).",
            "price": 0,
            "services": {
                "50007": {
                    "code": "50007",
                    "name": "Medical advice",
                    "description": "In case you have medical problems on your travel and need expertise from a physician.",
                    "price": 79
                  },
              "50005": {
                    "code": "50005",
                    "name": "Translation service",
                    "description": "Synchronous translation service",
                    "price": 39
                  },
              "50004": {
                    "code": "50004",
                    "name": "Robbery",
                    "description": "Help in case of robbery",
                    "price": 19
                  },
              "50001": {
                    "code": "50001",
                    "name": "Medical help",
                    "description": "Medical help, hospital search",
                    "price": 99
                  },
              "50002": {
                    "code": "50002",
                    "name": "Lost in space",
                    "description": "Need guidance",
                    "price": 29
                  },
              "50003": {
                    "code": "50003",
                    "name": "Lost baggage",
                    "description": "Lost baggage advice",
                    "price": 19
                  },
              "50006": {
                    "code": "50006",
                    "name": "Repatriation organization",
                    "description": "In case of serious illness, we can organize your repriation back home. Does include 2nd medical opinion check, not include prize for repatriation.",
                    "price": 59
                  }
                }
          },
          '1010': {
            "code": "1010",
            "category": "HEALTH",
            "type": "SUBSCRIPTION",
            "name": "International Health Insurance",
            "description": "With our international health insurance you are insured when staying for a longer time abroad, e.g. for business reasons. 12 months subscription. Note: This is no travel insurance. Coverage ex. U.S.",
            "price": 5000,
            "services": {}
          },
          '1011': {
            "code": "1011",
            "category": "HEALTH",
            "type": "PAY_PER_USE",
            "name": "Medical advice",
            "description": "You just got a diagnosis by your general practitioner and want to get this checked by medical professionals.",
            "price": 0,
            "services": {
                 "60001": {
                    "code": "60001",
                    "name": "Medical advice",
                    "description": "Get immediate medical help on the phone.",
                    "price": 79
                  }
            }
          },
          '1013':{
            "code": "1013",
            "category": "HEALTH",
            "type": "PAY_PER_USE",
            "name": "Health Coaching",
            "description": "You want to live healthier but you don't know how? You want to reduce weight and change your nutrition? Here is an easy way to get coached by medical professionals during a 12weeks period.",
            "price": 0,
            "services": {
                "70001": {
                    "code": "70001",
                    "name": "Cardio Health Coaching",
                    "description": "You want to live healthier but you don't know how? You want to reduce weight and change your nutrition? Here is an easy way to get coached by medical professionals during a 12 weeks period.",
                    "price": 199
                }
            }
          }
        };

        switch (type) {
            case 'health':
                // var obj = {
                //     "code": "50007",
                //     header: "Assistance with Medical Advice",
                //     "name": "Medical advice",
                //     "description": "In case you have medical problems on your travel and need expertise from a physician.",
                //     "price": 79
                // }
                // return obj;
                return products['1011']['services']['60001'];
                break;

            case 'healthInsuranceGlobal':
                // var obj = {
                //     "code": "50007",
                //     header: "Assistance with Medical Advice",
                //     "name": "Medical advice",
                //     "description": "In case you have medical problems on your travel and need expertise from a physician.",
                //     "price": 79
                // }
                // return obj;
                return products['1007']['services']['50010'];
                break;


            case 'healthInsuranceSingleCountry':
                // var obj = {
                //     "code": "50007",
                //     header: "Assistance with Medical Advice",
                //     "name": "Medical advice",
                //     "description": "In case you have medical problems on your travel and need expertise from a physician.",
                //     "price": 79
                // }
                // return obj;
                return products['1008']['services']['50007'];
                break;

            case 'immediateAssistance':
                return products['1011']['services']['60001'];
                break;

             case 'guardian':
                return products['1008'];
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

                // var obj = {
                //     "code": "1008",
                //     "name": "Travel emergency assistance",
                //     "description": "Get helped in a foreign country, where you need urgent help (for safety, medcial, other reasons).",
                //     "price": 0
                // }


                // return obj;
                return products['1008'];
                break;

            default:
                // console.log(this.state);
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
        this.setState({appointmentConfirmation:false});
        this.setState({modalIsOpen: false});

    },
    openModal() {
        this.setState({modalIsOpen: true});
    },
    render() {
        // console.log(this.state.appointmentConfirmation);
        var divStyle = {
            width: '100%'
        };

        if (!this.state.appointmentConfirmation) {
            var modalContents = <div className="scroll">
                <h2>{this.state.assistanceInfo.header}</h2>
                Allianz can assist you anywhere you are.
                <h2>{this.state.assistanceInfo.name}</h2>
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
                    className={this.props.buttonClasses}>
                {this.props.buttonText}
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
