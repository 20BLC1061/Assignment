//  import { CgProfile } from "react-icons/cg";

import { Component } from "react";
import "./index.css";

class Home extends Component {
  state = {
    selected: "",
    addfield: false,
    fieldType: "",
    mindate: "",
    maxdate: "",
    data: [],
    form: {
      no: 0,
      fieldname: "",
      fieldType: "",
      fieldDataType: "",
      fieldValidations: "Nill",
      fieldData: "-",
      isMandatory: "",
    },
  };

  onClickAddField = () => {
    this.setState({ addfield: true });
  };

  onChangeSelect = (event) => {
    this.setState({ selected: event.target.value });
  };

  onChangeFieldName = (e) => {
    this.setState((prevState) => ({
      form: { ...prevState.form, fieldname: e.target.value },
    }));
  };

  onChangeFieldDataType = (e) => {
    this.setState((prevState) => ({
      form: { ...prevState.form, fieldDataType: e.target.value },
    }));
  };

  onChangeMandatory = (e) => {
    this.setState((prevState) => ({
      form: { ...prevState.form, isMandatory: e.target.value },
    }));
  };

  onClickConfirm = () => {
    this.setState((prevState) => {
      const { form } = prevState;
      const newDataEntry = { ...form, no: form.no + 1 }; // Increment no for the new entry
      return {
        data: [...prevState.data, newDataEntry],
        form: { ...form, no: form.no + 1 }, // Increment no for the next form
      };
    });
  };

  onChangeFieldType = (event) => {
    this.setState({ fieldType: event.target.value });
  };

  onChangeMaxLength = (e) => {
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        fieldValidations: `Max ${e.target.value} digits`,
      },
    }));
  };

  onChangeFieldData = (e) => {
    this.setState((prevState) => ({
      form: { ...prevState.form, fieldData: e.target.value },
    }));
  };

  onChangeMinDate = (e) => {
    this.setState({ mindate: e.target.value });
  };

  onChangeMaxDate = (e) => {
    const { mindate } = this.state;
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        fieldValidations: `Between ${mindate} to ${e.target.value}`,
      },
    }));
  };

  onClickReset = () => {
    this.setState({ data: [] });
  };

  render() {
    const { selected, addfield, fieldType, data } = this.state;
    return (
      <div className="homeComponent">
        <select onChange={this.onChangeSelect} className="selection-bar">
          <option value="" disabled selected>
            Select one option
          </option>
          <option value="student">Student</option>
          <option value="salaried">Salaried</option>
          <option value="business">Business</option>
        </select>

        {selected.length > 0 && (
          <button
            type="button"
            className="addfield-btn"
            onClick={this.onClickAddField}
          >
            Add Field
          </button>
        )}
        {addfield && (
          <div className="addfield-container">
            <select onChange={this.onChangeFieldType} className="selection-bar">
              <option value="" disabled selected>
                Select Field Type
              </option>
              <option value="text">Text Box</option>
              <option value="options">Dropdown</option>
              <option value="date">Date</option>
            </select>
          </div>
        )}
        {fieldType.length > 0 && (
          <div className="list-container">
            <div className="field">
              <p>Field Display Name</p>

              <input
                type="text"
                placeholder="Enter Name"
                className="text-field"
                value={data.fieldname}
                onChange={this.onChangeFieldName}
              />
            </div>
            <div className="field">
              <p>Field Data Type</p>
              <select
                className="selection-bar"
                onChange={this.onChangeFieldDataType}
              >
                <option value="" disabled selected>
                  Select Data Type
                </option>
                <option value="number">Number</option>
                <option value="string">String</option>
                <option value="date">Date</option>
              </select>
            </div>
            <div className="field">
              {fieldType !== "date" ? (
                <>
                  <p>Field Max Length Allowed</p>
                  <input
                    type="number"
                    placeholder="Enter Length"
                    className="text-field"
                    onChange={this.onChangeMaxLength}
                  />
                </>
              ) : (
                <>
                  <p>Date Range Validation</p>
                  <div className="date-field">
                    <div>
                      <p>Min Date</p>
                      <input
                        type="date"
                        className="text-field"
                        onChange={this.onChangeMinDate}
                      />
                    </div>
                    <div>
                      <p>Max Date</p>
                      <input
                        type="date"
                        className="text-field"
                        onChange={this.onChangeMaxDate}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="field">
              <p>Mandatory</p>
              <select
                className="selection-bar"
                onChange={this.onChangeMandatory}
              >
                <option value="" disabled selected>
                  Select
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="field">
              <p>Field Data</p>
              <input
                type="text"
                placeholder="Enter Data"
                className="text-field"
                onChange={this.onChangeFieldData}
              />
            </div>
            <button type="button" className="btn" onClick={this.onClickConfirm}>
              Confirm
            </button>
          </div>
        )}

        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Field Name</th>
              <th>Field Type</th>
              <th>Field Data Type</th>
              <th>Field Validations</th>
              <th>Field Data</th>
              <th>Is Mandatory</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.no}>
                <td>{item.no}</td>
                <td>{item.fieldname}</td>
                <td>{fieldType}</td>
                <td>{item.fieldDataType}</td>
                <td>{item.fieldValidations}</td>
                <td>{item.fieldData}</td>
                <td>{item.isMandatory}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.length > 0 && (
          <div className="table-btns">
            <button type="button" className="btn">
              Confirm
            </button>
            <button type="button" onClick={this.onClickReset} className="btn">
              Reset
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
