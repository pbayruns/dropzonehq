import React from 'react';
import FilterDropdown from '../Dropdowns/FilterDropdown.jsx';
import ItemTable from './ItemTable.jsx';
import RentalItemDisplay from '../ItemDisplays/RentalItemDisplay.jsx';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { rootURL } from '../restInfo.js';
import "react-table/react-table.css";

var count = 0;
var display = <RentalItemDisplay var1={"nothing to"} var2={"see here"} />;
export default class RentalTable extends React.Component {
    constructor(props) {
        super(props);
        //since the URL section is not directly related to rendering,
        //it shouldn't be part of state. Save it in a class variable.
        this.URLsection = "/rentals";

        //this.toggleRented = this.toggleRented.bind(this);
        this.filterChanged = this.filterChanged.bind(this);
        this.itemSelected = this.itemSelected.bind(this);

        this.all=[];
        this.rigs=[];
        this.canopies=[];
        this.containers=[];

        //Test Data to fill the table until we connect to the DB
        var rowData = [{ number: "04", desc: "Old Yellow in Gray and Brown Jav", isRented: true, type: "rig", rowID: 1 },
        { number: "09", desc: "Black main in Black Jav", type: "rig", isRented: false, rowID: 2 },
        { number: "01", desc: "Orange and Green man, Pink and Blue Jav", type: "rig", isRented: true, rowID: 3 },
        { number: "01125", desc: "Red and Black Navigator", type: "canopy", isRented: false, rowID: 4 },
        { number: "07663", desc: "Blue and Black Mirage", type: "container", isRented: false, rowID: 5 }];

        this.state = {
            filter: "all",
            columns: [{
                Header: 'Item Number',
                accessor: 'number' // String-based value accessors!
            }, {
                Header: 'Item Description',
                accessor: 'desc',
            }],
            rows: rowData,
            rowID: 0
        };
        this.getFilteredRows(this.state.rows);
    }

    getFilteredRows(rowData) {
        this.all = rowData;                                  //save everything first
        for (var i = 0; i < rowData.length; i++) {      //if the type is rig
            if (rowData[i].type === "rig") {
                this.rigs.push(rowData[i]);
            } else if (rowData[i].type === "canopy") {  //if the type is canopy
                this.canopies.push(rowData[i]);
            } else if (rowData[i].type === "container") { //if the type is container
                this.containers.push(rowData[i]);
            }
        }
    }
    

    //for the dropdown    
    filterChanged(id, selection) {
        switch (selection) {
            case "Show All":
                this.setState({ filter: "all", rows: this.all });
                break;
            case "Rigs Only":
                this.setState({ filter: "rig", rows: this.rigs });
                break;
            case "Canopies Only":
                this.setState({ filter: "canopy", rows: this.canopies });
                break;
            case "Containers Only":
                this.setState({ filter: "container", rows: this.containers });
                break;
            default:
                this.setState({ filter: "all", rows: this.all });
                break;
        }
        //this.processRows(this.state.rows, this.state.filter);
    }

    //When this RentalTable component loads on the page, fetch the rows
    //from the database and display them.
    componentDidMount() {
        this.fetchRows();
    }

    //Fetch the items from the database that are 
    //rentals and update the RentalTable's state to display them.
    fetchRows() {

        //make sure we have the packages required to
        //make a fetch call (maybe not needed)
        require('isomorphic-fetch');
        require('es6-promise').polyfill();

        //Define our endpoint using the rootURL, the URL section 
        //that we set in our constructor (like "/rigsheets"), and
        //the sheetType prop ("Tandems" or "Students")
        //(rootURL is imported from our rest info file)
        var url = rootURL + this.URLsection + this.props.sheetType;

        //save 'this' so that we can call functions
        //inside the fetch() callback
        var self = this;

        //fetch from the specified URL, to GET the data
        //we need. Enable CORS so we can access from localhost.
        fetch(url, {
            method: "GET",
            mode: 'CORS'
        })//when we get a response back
            .then(function (response) {
                //check to see if the call we made failed
                //if it failed, throw an error and stop.
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                //if it didn't fail, process the data we got back
                //into JSON format
                return response.json();
            })//when the call succeeds
            .then(function (rowData) {
                //process the row data we received back
                self.processRows(rowData);
                //update our state with these rows to rerender the table
                self.setState({
                    rows: rowData
                });
            });
    }

    //calls up to the screen change the display on the right
    itemSelected(selectedIndex) {
        var row = this.state.rows[selectedIndex];   //use the selectedIndex to find the row in the rows state
        display = <RentalItemDisplay            //set up the display component
                        var1={row.rowID} 
                        var2={row.desc} /> ;                      
        this.props.displayChange(display, row.rowID);          //pass it up thru props method call
        console.log(count);
        count++;
    }
    

    render() {
        var filterDropdown = <FilterDropdown
            onChange={this.filterChanged}
            labelText="Rental Item Filters:"
            id="RentalFilterDropdown"
        />
        return (
            <div>
                <Row>
                    <Col>
                        <ItemTable
                            rows={this.state.rows}
                            top={filterDropdown}
                            bottom={""}
                            itemSelected={this.itemSelected}
                        />
                    </Col>
                </Row>
            </div>
        );
    }

}