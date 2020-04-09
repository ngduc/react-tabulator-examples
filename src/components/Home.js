import React from "react";
import "./styles.css";

import DateEditor from "react-tabulator/lib/editors/DateEditor";
import MultiValueFormatter from "react-tabulator/lib/formatters/MultiValueFormatter";
import MultiSelectEditor from "react-tabulator/lib/editors/MultiSelectEditor";

import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)

// for React 16.4.x use: import { ReactTabulator } - example in github repo.
import { React15Tabulator, reactFormatter } from "react-tabulator"; // for React 15.x

function SimpleButton(props) {
  const rowData = props.cell._cell.row.data;
  const cellValue = props.cell._cell.value || "Edit | Show";
  return <button onClick={() => alert(rowData.name)}>{cellValue}</button>;
}

const data = [
  {
    id: 1,
    name: "Oli Bob",
    age: "12",
    color: "red",
    dob: "01/01/1980",
    rating: 5,
    passed: true,
    pets: ["cat", "dog"]
  },
  {
    id: 2,
    name: "Mary May",
    age: "1",
    color: "green",
    dob: "12/05/1989",
    rating: 4,
    passed: true,
    pets: ["cat"]
  },
  {
    id: 3,
    name: "Christine Lobowski",
    age: "42",
    color: "green",
    dob: "10/05/1985",
    rating: 4,
    passed: false
  },
  {
    id: 4,
    name: "Brendon Philips",
    age: "125",
    color: "red",
    dob: "01/08/1980",
    rating: 4.5,
    passed: true
  },
  {
    id: 5,
    name: "Margret Marmajuke",
    age: "16",
    color: "yellow",
    dob: "07/01/1999",
    rating: 4,
    passed: false
  },
  {
    id: 6,
    name: "Van Ng",
    age: "37",
    color: "green",
    dob: "06/10/1982",
    rating: 4,
    passed: true,
    pets: ["dog", "fish"]
  },
  {
    id: 7,
    name: "Duc Ng",
    age: "37",
    color: "yellow",
    dob: "10/10/1982",
    rating: 4,
    passed: true,
    pets: ["dog"]
  }
];

// Editable Example:
const colorOptions = {
  [""]: "&nbsp;",
  red: "red",
  green: "green",
  yellow: "yellow"
};
const petOptions = [
  { id: "cat", name: "cat" },
  { id: "dog", name: "dog" },
  { id: "fish", name: "fish" }
];
const editableColumns = [
  {
    title: "Name",
    field: "name",
    width: 150,
    editor: "input",
    headerFilter: "input"
  },
  {
    title: "Age",
    field: "age",
    align: "left",
    formatter: "progress",
    editor: "progress"
  },
  {
    title: "Favourite Color",
    field: "color",
    editor: "select",
    editorParams: {
      allowEmpty: true,
      showListOnEmpty: true,
      values: colorOptions
    },
    headerFilter: "select",
    headerFilterParams: { values: colorOptions }
  },
  {
    title: "Date Of Birth",
    field: "dob",
    sorter: "date",
    editor: DateEditor,
    editorParams: { format: "MM/DD/YYYY" }
  },
  {
    title: "Pets",
    field: "pets",
    editor: MultiSelectEditor,
    editorParams: { values: petOptions },
    formatter: MultiValueFormatter,
    formatterParams: { style: "PILL" }
  },
  {
    title: "Passed?",
    field: "passed",
    align: "center",
    formatter: "tickCross",
    editor: true
  }
];

class Home extends React.Component {
  state = {
    data: [],
    selectedName: ""
  };
  ref = null;

  columns = [
    { title: "Name", field: "name", width: 150 },
    { title: "Age", field: "age", align: "left", formatter: "progress" },
    { title: "Favourite Color", field: "color" },
    { title: "Date Of Birth", field: "dob" },
    { title: "Rating", field: "rating", align: "center", formatter: "star" },
    {
      title: "Passed?",
      field: "passed",
      align: "center",
      formatter: "tickCross"
    },
    {
      title: "Custom",
      field: "custom",
      align: "center",
      editor: "input",
      formatter: reactFormatter(
        <SimpleButton
          onSelect={name => {
            this.setState({ selectedName: name });
            alert(name);
          }}
        />
      )
    }
  ];

  rowClick = (e, row) => {
    console.log("ref table: ", this.ref.table); // this is the Tabulator table instance
    console.log("rowClick id: ${row.getData().id}", row, e);
    this.setState({ selectedName: row.getData().name });
  };

  setData = () => {
    this.setState({ data });
  };

  clearData = () => {
    this.setState({ data: [] });
  };

  render() {
    const options = {
      height: 150,
      movableRows: true
    };
    return (
      <div>
        <React15Tabulator
          ref={ref => (this.ref = ref)}
          columns={this.columns}
          data={data}
          rowClick={this.rowClick}
          options={options}
          data-custom-attr="test-custom-attribute"
          className="custom-css-class"
        />
        <div>Selected Name: {this.state.selectedName}</div>

        <h3>
          Asynchronous data: (e.g. fetch) -{" "}
          <button onClick={this.setData}>Set Data</button>
          <button onClick={this.clearData}>Clear</button>
        </h3>
        <React15Tabulator columns={this.columns} data={this.state.data} />

        <h3>Editable Table</h3>
        <React15Tabulator
          columns={editableColumns}
          data={data}
          footerElement={<span>Footer</span>}
        />

        <p>
          <a href="https://github.com/ngduc/react-tabulator" target="_blank">
            Back to: Github Repo: react-tabulator
          </a>
        </p>
        <p>
          <a href="http://tabulator.info/examples/4.0" target="_blank">
            More Tabulator's Examples
          </a>
        </p>
      </div>
    );
  }
}

export default Home;
