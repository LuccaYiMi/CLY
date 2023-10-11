console.log("Hello World");
// var viz = new tableau.Viz(placeholderDiv, url, options);
let viz;
// Reference the placeholderDiv
const placeholderDiv = document.getElementById("vizContainer");
// Get a URL
const url =
  "https://public.tableau.com/views/wow2021-week2/Dashboard1?:language=en-US&:display_count=n&:origin=viz_share_link";
// Create options for viz
const options = {
  device: "desktop",
  height: "800px",
  width: "1100px",
};
function intiViz() {
  //Load viz
  viz = new tableau.Viz(placeholderDiv, url, options);
}
//Listen for the content to be loaded
document.addEventListener("DOMContentLoaded", intiViz);

//Buttons
const exportpdfbutton = document.getElementById("exportPDF");
const filterbutton = document.getElementById("FilterButton");
const exportpptbutton = document.getElementById("exportppt");

//Function to export PDF
function exportpdffunction() {
  viz.showExportPDFDialog();
}

//Add event listener to button
exportpdfbutton.addEventListener("click", exportpdffunction);

exportpptbutton.addEventListener("click", exportpptfunction);

filterbutton.addEventListener("click", getRangeValues);

//Function to export ppt
function exportpptfunction() {
  viz.showExportPowerPointDialog();
}

//Get range value
function getRangeValues() {
  const minValue = document.getElementById("minvalue").value;
  const maxValue = document.getElementById("maxvalue").value;

  console.log(minValue, maxValue);

  // need to get the active sheet, but this could a dashboard or worksheet

  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();

  //inspect the sheets to filter
  console.log(sheets);

  //Bring back sheet to filter
  const sheetToFilter = sheets[0];
  console.log(sheetToFilter);

  //Do the filtering
  sheetToFilter
    .applyRangeFilterAsync("AGG(CLTV)", {
      min: minValue,
      max: maxValue,
    })
    .then(alert("Filterted!"));
}
