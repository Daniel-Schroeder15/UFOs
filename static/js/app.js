// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

function buildTable(data) {
    
    // First, clear out any existing data
    tbody.html("");
  
    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
        // Append a row to the table body
        let row = tbody.append("tr");
  
        // Loop through each field in the dataRow and add
        // each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
            }
        );
    });
}

// make variable for all filters
let filters = {};

// allowing to filter the table
function filter() {
    
    // Grab and save the element, value and id of the filter
    let changedElement = d3.select(this);
    let filterValue = changedElement.property("value").trim();
    let filterId = changedElement.attr("id");
    
    // add the filterId and value to the filters list
    if (filterValue){
        filters[filterId] = filterValue;
    }
    // clear filter from object
    else {
        delete filters[filterId];
    }

    filterTable();
}

function filterTable(){

    // Set the filteredData to the table
    let filteredData = tableData;

    // Loop through all of the filters and keep any data that matches the filter values
    Object.entries(filters).forEach(([key,value])=> {
            filteredData = filteredData.filter(row => row[key] == value);
    })

    // Rebuild the table
    buildTable(filteredData);
};

function clearFilters(){

    d3.selectAll("input").property("value", "")
  
    filters = {}
  
    buildTable(tableData);
  }
  

// attach an eventlistener for the form "click" button.
d3.selectAll("input").on("change", filter);
d3.select("#filter-btn").on("click", clearFilters)


buildTable(tableData);
