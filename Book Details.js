(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "list_id",
            alias: "Category ID",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "list_name",
            alias: "Category Name",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "author",
            alias: "Author",
            dataType: tableau.dataTypeEnum.string
        } ,{
            id: "title",
            alias: "Book Title",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "rank",
            alias: "Rank",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "publisher",
            alias: "Publisher",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "description",
            alias: "Description",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "rank_last_week",
            alias: "Last Week Rank",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "amazonURL",
            alias: "Buy From Amazon",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "barnes_and_noble_URL",
            alias: "Buy From Barnes&Noble",
            dataType: tableau.dataTypeEnum.string
        },        
        {
            id: "book_image",
            alias: "Book Image",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "weeks_on_list",
            alias: "Number of weeks",
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
                

                var booklist = feat[i].books;
    
                for (var j = 0, len1 = booklist.length; j < len1; j++) {
                    tableData.push({
                    
                        "list_id" : feat[i].list_id,
                        "list_name": feat[i].list_name,
                        "author":booklist[j].author,
                        "title":booklist[j].title,
                        "description": booklist[j].description,
                        "publisher": booklist[j].publisher,
                        "rank":booklist[j].rank,
                        "rank_last_week": booklist[j].rank_last_week,
                        "amazonURL": booklist[j].buy_links[0].url,
                        "barnes_and_noble_URL": booklist[j].buy_links[2].url,
                        "book_image":booklist[j].book_image,
                        "weeks_on_list": booklist[j].weeks_on_list
                        
                    });        


                }        

                
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
