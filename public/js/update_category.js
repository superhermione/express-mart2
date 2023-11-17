
// Get the objects we need to modify
let updateCategoryForm = document.getElementById('updateCategory');

// Modify the objects we need
updateCategoryForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCategoryID = document.getElementById("inputCategoryIDUpdate");
    let inputCategoryName = document.getElementById("inputCategoryNameUpdate");

    // Get the values from the form fields
    let categoryIDValue = inputCategoryID.value;
    let categoryNameValue = inputCategoryName.value;

    if (isNaN(categoryIDValue)) 
    {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        categoryID: categoryIDValue,
        categoryName: categoryNameValue,
    }

    console.log(data)
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-category", true);
    xhttp.setRequestHeader("Content-type", "application/json");


    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, categoryIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})



function updateRow(data, categoryID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("category-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == categoryID) {
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let td = updateRowIndex.getElementsByTagName("td")[1];
            td.innerHTML = parsedData[0].categoryName; 
       }
    }
}

function delayedReload() {
    // Delay the reload by 2 seconds (2000 milliseconds)
    setTimeout(function () {
        location.reload();
    }, 2000);
}
