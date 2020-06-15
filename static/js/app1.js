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


// allowing to filter the table by date
function handleClick() {
    // Grab the datetime value from the filter
    let date = d3.select("#datetime").property("value"); 
    // By setting the filteredData variable to our raw data, we’re basically using it as a blank slate.
    let filteredData = tableData;

    //check to see if a date was entered and filter the data using that date
    //applying a filter method that will match the datetime value to the filtered date value
    //row=>row.datetime ===date says to show only the rows where the date is equal to filter date
    if (date) {

        filteredData = filteredData.filter(row => row.datetime === date);
    };

    // Rebuild the table using the filtered data
    // @NOTE: If no date was entered, then filteredData will
    // just be the original tableData.
    buildTable(filteredData);

}

// attach an event to listen for the form "click" buttom.
d3.selectAll("#filter-btn").on("click", handleClick);

buildTable(tableData);
