(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "bestsellers_date",
            alias: "bestsellers_date",
            dataType: tableau.dataTypeEnum.date
        },{
            id: "list_id",
            alias: "Category ID",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "list_name",
            alias: "Category Name",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "list_image",
            alias: "List Image",
            dataType: tableau.dataTypeEnum.string
        }   
        ];

        var tableSchema = {
            id: "BooksSchema",
            alias: "NY Times best sellers",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {

     /*   $.ajaxSetup({
         headers : {
            'x-rapidapi-host' : 'api-nba-v1.p.rapidapi.com',
            'x-rapidapi-key' : 'd18cdeb3a2mshab6824adf713c9ep130fb2jsncca2d444588d'
          } 
        }); */

        $.getJSON("https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=eSBbWkUiZCGkFl4XlwvE2QkANUGySGhe", function(resp) {
            var feat = resp.results.lists,
                tableData = [];
            
            // Iterate over the JSON object
             for (var i = 0, len = feat.length; i < len; i++) { 
                tableData.push({
                    "bestsellers_date": resp.results.bestsellers_date,
                   // "published_date_description": resp.results.published_date_description,
                    "list_id" : feat[i].list_id,
                    "list_name": feat[i].list_name,
                    "list_image": feat[i].list_image
                });
            } 
            
                    
            
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "NY Times Bestsellers"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
