$(document).ready(onReady);


function onReady(){
    $('#submit').on('click', addRestaurant);
    $('#tableId').on('click', '.deleteButton', deleteButton);
    $('#tableId').on('click', '.saveButton', saveButton);
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
                    <td> <input value = "${restaurant.rating}"/></td>
                    <td><button class="saveButton" data-id="${restaurant.id}">Save</button></td>
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
    let rating = $('#rating').val();

    console.log(name, type, rating);
    
    $.ajax({
        method: 'POST',
        url: '/restaurant',
        data: {
            name: name,
            type: type,
            rating: rating
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

function saveButton() {
    console.log('save was clicked');
    console.log($(this).data().id);
    console.log($(this).parent().prev().children().val());
    
    const restaurantId = $(this).data().id;
    $.ajax({
        method: 'PUT',
        url: '/restaurant/' + restaurantId,
        data: {
            rating: $(this).parent().prev().children().val(),
        }
    }).then(function () {
        getRestaurant();
    })
}