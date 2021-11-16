// BuildMetadata
function createMetadata(sample) {
    // Read sample.json with d3
    d3.json("samples.json").then((data) => {
        // Get metadata from data
        var metadata = data.metadata;

        // filter id so when selected id will show its properties a.k.a metadata
        var sampleArray = metadata.filter(sampleObject => sampleObject.id == sample);
        var result = sampleArray[0]
        var PANEL = d3.select("#sample-metadata");
        PANEL.html("");

        // Populate panel with values from the key selected (i.e key = 940)
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key}: ${value}`);
        });
    })
}

// Init function
function init() {
    // Dropdown select element for the dataset
    var select = d3.select("#selDataset");

    // Use sample names to populate the select options
    d3.json("samples.json").then((data) => {
        var names = data.names;
        names.forEach((sample) => {
            select
                .append("option")
                .text(sample)
                .property("value", sample);
        });
        // Set first sample for initial plot
        const firstSample = names[0];
        createMetadata(firstSample);
        // createPlots(firstSample);
    })
}

// option Change function to change sample selected and update webpage
function optionChanged(newSample) {
    // Get new data each time a new sample is selected from the dropdown buttom
    createMetadata(newSample);
    // createPlots(newSample);
}


//  Initialize dashboard
init();