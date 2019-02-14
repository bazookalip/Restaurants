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
                    <td><button class="deleteButton" data-id="${restaurant.id}">Delete</button></td>
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
        clear();
    });
}


function deleteButton() {
    console.log('delete was clicked');
    console.log($(this).data().id);
    const restaurantId = $(this).data().id;
    $.ajax({
        method: 'DELETE',
        url: '/restaurant/' + restaurantId
    }).then(function () {
        getRestaurant();
    })
}

function clear(){
    $('#name').val('');
    $('#type').val('');
}