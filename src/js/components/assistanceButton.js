window.allianzAPIKey = "ffd4dedb-69b8-429a-8122-83c52edb632a";
import React from 'react';
import Modal from 'react-modal';

React.createClass({

    getInitialState(){

    },
    render(){
        return (

                <div>
                    <button class="button button-assertive">
                        {this.props.assistanceType}
                    </button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                    >
                        <h2>Hello</h2>
                        <button onClick={this.closeModal}>close</button>
                        <div>I am a modal</div>
                        <form>
                            <input />
                            <button>tab navigation</button>
                            <button>stays</button>
                            <button>inside</button>
                            <button>the modal</button>
                        </form>
                    </Modal>
                </div>
            )



    }

})

