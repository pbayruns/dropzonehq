import React from 'react';
import { Row, Col, Card, CardHeader, CardBlock } from 'reactstrap';
import DropzoneHQNav from '../Navs/DropzoneHQNav.jsx';
import EmployeeTable from '../Tables/EmployeeTable.jsx';
import AddEmployButton from '../ModalButtons/AddEmployeeButton.jsx';
import 'bootstrap/dist/css/bootstrap.css';

const marginStyle = {
    marginTop: 25,
    marginBottom: 25

};

class EmployeeAdminScreen extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col lg={{ size: 12 }}>
                        <DropzoneHQNav />
                    </Col>
                </Row>
                <Row style={marginStyle}>
                    <Col lg={{ size: 10, offset: 1 }}>
                        <EmployeeTable />
                    </Col>
                </Row>
            </div>
        );
    }
};

export default EmployeeAdminScreen;