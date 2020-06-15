import React from 'react'

var querySVG = document.getElementById('query').querySelector('svg'); 
var incrementalQuerySVG = document.getElementById('incremental-query').querySelector('svg'); 
var unionSVG = document.getElementById('union').querySelector('svg'); 
var intersectionSVG = document.getElementById('intersection').querySelector('svg'); 
var exclusionSVG = document.getElementById('exclusion').querySelector('svg'); 
var segmentationSVG = document.getElementById('segmentation').querySelector('svg'); 
var readAudienceSVG = document.getElementById('read-audience').querySelector('svg'); 
var saveAudienceSVG = document.getElementById('save-audience').querySelector('svg'); 
var deduplicationSVG = document.getElementById('deduplication').querySelector('svg'); 
var enrichmentSVG = document.getElementById('enrichment').querySelector('svg'); 
var startSVG = document.getElementById('start').querySelector('svg'); 
var endSVG = document.getElementById('end').querySelector('svg'); 
var forkSVG = document.getElementById('fork').querySelector('svg'); 
var andJoinSVG = document.getElementById('and-join').querySelector('svg'); 
var schedulerSVG = document.getElementById('scheduler').querySelector('svg'); 
var waitSVG = document.getElementById('wait').querySelector('svg'); 
var externalSignalSVG = document.getElementById('external-signal').querySelector('svg'); 
var testSVG = document.getElementById('test').querySelector('svg'); 
var emailDeliverySVG = document.getElementById('email-delivery').querySelector('svg'); 
var emailDeliverySVG2 = document.getElementById('email-delivery-2').querySelector('svg'); 
var transferFileSVG = document.getElementById('transfer-file').querySelector('svg'); 
var loadFileSVG = document.getElementById('load-file').querySelector('svg'); 
var extractFileSVG = document.getElementById('extract-file').querySelector('svg'); 
var updateDataSVG = document.getElementById('update-data').querySelector('svg'); 
var reconciliationSVG = document.getElementById('reconciliation').querySelector('svg'); 
var subscriptionServicesSVG = document.getElementById('subscription-services').querySelector('svg'); 
var externalAPISVG = document.getElementById('external-api').querySelector('svg'); 

const ACTIVITIES = [
    {
        type: "Query", 
        purpose: "Query records from the [table] where [criteria] ", 
        notes: "Additional data: ",
        code: querySVG
    },
    {
        type: "Incremental query", 
        purpose: "Query records from the [table] where [criteria] ", 
        notes: "Incremental mode: [Exclude the results of previous executions/Use a date field]",
        code: incrementalQuerySVG
    },
    {
        type: "Union", 
        purpose: "Group records from [activity list]", 
        notes: "",
        code: unionSVG
    },
    {
        type: "Intersection", 
        purpose: "Collect all shared records between [table 1] and [table 2] based on [Keys only/All shared columns/A selection of columns]",
        notes: "Columns (if any): ",
        code: intersectionSVG
    },
    {
        type: "Exclusion", 
        purpose: "Suppress all records from the [excluded set] based on [ID/Change axis/Joins]", 
        notes: "",
        code: exclusionSVG
    },
    {
        type: "Segmentation", 
        purpose: "Create the following segments from the [resource] table: ", 
        notes: "Segmentation criteria: [] Segment code (if any): [] Filter (Y/N): []",
        code: segmentationSVG
    },
    {
        type: "Read audience", 
        purpose: "Load the [audience id] audience", 
        notes: "",
        code: readAudienceSVG
    },
    {
        type: "Save audience", 
        purpose: "Create an audience labeled [name] ", 
        notes: "",
        code: saveAudienceSVG
    },
    {
        type: "Deduplication", 
        purpose: "Perform a dedup based on [source]", 
        notes: "Deduplication method: [] Expression: []",
        code: deduplicationSVG
    },
    {
        type: "Enrichment", 
        purpose: "Enrich [target data] with [Additional data]", 
        notes: "",
        code: enrichmentSVG
    },
    {
        type: "Start", 
        purpose: "", 
        notes: "",
        code: startSVG
    },
    {
        type: "End", 
        purpose: "", 
        notes: "",
        code: endSVG
    },
    {
        type: "Fork", 
        purpose: "", 
        notes: "",
        code: forkSVG
    },
    {
        type: "AND-join", 
        purpose: "", 
        notes: "",
        code: andJoinSVG
    },
    {
        type: "Scheduler", 
        purpose: "Schedule workflow to run [execution frequency] at [time] starting [date]", 
        notes: "",
        code: schedulerSVG
    },
    {
        type: "Wait", 
        purpose: "Set the wait duration of the workflow to [_s]", 
        notes: "",
        code: waitSVG
    },
    {
        type: "External signal", 
        purpose: "Wait for an external signal to execute the workflow based on the following parameters: ", 
        notes: "",
        code: externalSignalSVG
    },
    {
        type: "Test", 
        purpose: "Check that [condition]", 
        notes: "",
        code: testSVG
    },
    {
        type: "Email delivery", 
        purpose: "Send out the [email delivery id] email", 
        notes: "",
        code: emailDeliverySVG
    },
    {
        type: "Email delivery", 
        purpose: "Send out the [email delivery id] email", 
        notes: "",
        code: emailDeliverySVG2
    },
    {
        type: "Transfer file", 
        purpose: "[Upload/download] the [filename] file [from/to] SFTP", 
        notes: "",
        code: transferFileSVG
    },
    {
        type: "Load file", 
        purpose: "Load the [filename] file", 
        notes: "",
        code: loadFileSVG
    },
    {
        type: "Extract file", 
        purpose: "Create an export file called [output filename]", 
        notes: "Output columns: ",
        code: extractFileSVG
    },
    {
        type: "Update data", 
        purpose: "[Update/Insert or Update] records in the [table] based on [reconciliation criteria/links/targeting dimension]", 
        notes: "Fields to update: ",
        code: updateDataSVG
    },
    {
        type: "Reconciliation", 
        purpose: "Reconcile records from the [source table] with records from the [dest table] based on [list of relations]", 
        notes: "",
        code: reconciliationSVG
    },
    {
        type: "Subscription services", 
        purpose: "[Subscribe/Unsubscribe] records [to/from] [service]", 
        notes: "",
        code: subscriptionServicesSVG
    },
    {
        type: "External API", 
        purpose: "Customize parameter: [] Post Body Template: []", 
        notes: "Sample Response: ",
        code: externalAPISVG
    }
]

export default ACTIVITIES; 