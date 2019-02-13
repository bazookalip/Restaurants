$(document).ready(onReady);


function onReady(){
    $('#submit').on('click', addRestaurant);
    $('#tableId').on('click', '.deleteButton', deleteButton);
    getRestaurant();
};

function getRestaurant() {
    $.ajax({
        method: 'GET',
        url: '/restaurant'
    }).then(function (response) {
        console.log(response);
        $('#tableId').empty();
        response.forEach((restaurant) => {
            $('#tableId').append(`
                
                <tr>
                    <td>${restaurant.name} </td>
                    <td>${restaurant.type}</td>
                    <td><button class="deleteButton">delete</button></td>
                </tr>        
        `)
        });
    })
}

function addRestaurant() {
    console.log('yay!')
    let name = $('#name').val();
    let type = $('#type').val();
    console.log(name, type);
    
    $.ajax({
        method: 'POST',
        url: '/restaurant',
        data: {
            name: name,
            type: type,
        }
    }).then(function () {
        getRestaurant();
    });
}


function deleteButton(){
    console.log('delete!');
    $(this).closest('tr').fadeOut(500);


}