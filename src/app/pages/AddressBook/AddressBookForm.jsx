import React, { Component } from "react";
import { connect } from "react-redux";
import { refreshList,addAddress } from "./AddressBook.actions";
import { Input,DatePicker,Row,Col,Button, Space } from 'antd';
import moment from "moment";
class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            middleName: "",
            lastName: "",
            dob: "",
            date: null,
            dateValue: ""
        };
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleMiddleName = this.handleMiddleName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);

    }

    handleFirstName(event) {
        this.setState({ firstName: event.target.value });
    }
    handleMiddleName(event) {
        this.setState({ middleName: event.target.value });
    }
    handleLastName(event) {
        this.setState({ lastName: event.target.value });
    }
    handleChangeDate(date, dateString){
        this.setState({ dob:dateString });
        this.setState({ dateValue:moment(date) });

    }

    handleSubmit(event) {
        event.preventDefault();
        const { firstName,middleName,lastName,dob } = this.state;
        this.props.addAddress({ firstName,middleName,lastName,dob });
        this.setState({ firstName:"",middleName:"",lastName:"",dob:null,dateValue:"" });
    }

    render() {
        const { firstName,middleName,lastName } = this.state;
        return (
            <div>
                <Row justify="space-around">
                    <Col span={11} >
                        <Space size={10}>
                            <Input type="text" id="firstName" value={firstName} placeholder="First Name" onChange={this.handleFirstName} />
                            <Input type="text" id="middleName" value={middleName} placeholder="Middle Name" onChange={this.handleMiddleName} />
                        </Space>

                    </Col>
                    <Col span={11}>
                        <Space size={10}>
                            <Input type="text" id="lastName" value={lastName} placeholder="Last Name" onChange={this.handleLastName} />
                            <DatePicker type="text" id="dob" ref="datePicker" value={this.state.dateValue}  selected={this.state.dob}  placeholder="Date of Birth" onChange={this.handleChangeDate} />
                        </Space>
                    </Col>
                </Row>
                <br/>
                <Button type="primary" onClick={this.handleSubmit}>Add Item</Button>
            </div>
        )
    }
}



const mapDispatchToProps = dispatch => ({
    addAddress: (payload) => addAddress(payload).then((resp) =>{
        dispatch(refreshList)
    })
});

const FormList =  connect(
    null,
    mapDispatchToProps
)(ItemList);

export default FormList;