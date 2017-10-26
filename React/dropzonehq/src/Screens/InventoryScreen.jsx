import React from 'react';
import { Row, Col } from 'reactstrap';
import DropzoneHQNav from '../Navs/DropzoneHQNav.jsx';
import Rigsheet from '../Tables/Rigsheet.jsx';
import RigAlertsContainer from '../RigAlertsContainer.jsx';
import 'bootstrap/dist/css/bootstrap.css';

const marginStyle = {
    marginTop: 25,
    marginBottom: 25
};

/*
    InventoryScreen ...
*/
class InventoryScreen extends React.Component {
    render() {
        return (
            <div>
                <Row style={marginStyle}>
                    <Col lg={{ size: 5, offset: 1 }}>
                        <Rigsheet sheetType="Tandems" />
                    </Col>
                    <Col lg={{ size: 5 }}>
                         <Rigsheet sheetType="Students"/>
                    </Col>
                </Row>
                <Row style={marginStyle}>
                    <Col lg={{ size: 10, offset: 1 }}>
                        <RigAlertsContainer/>
                    </Col>
                </Row>
            </div>
        );
    }
};

export default InventoryScreen;