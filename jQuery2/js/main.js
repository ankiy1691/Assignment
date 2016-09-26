$(document).ready(function() {
      
    var $table = $('#table_body');
    $('#viewall').on('click', function() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/Employees?_start=0&_end=30',

            dataType: 'JSON',
            success: function(data) {
                $table.html('');
                $(data).each(function(i, data1) {
                    $table.append('<tr>' + '<td>' + data1.id + '</td>' + '<td class="nc0">' + data1.name + '</td>' + '<td class="nc1">' + data1.company + '</td>' + '<td class="nc2">' + data1.email + '</td>' + '<td class="nc3">' + data1.phone + '</td>' + '<td> <button class="edit" data-id="' + data1.id + '"><span class="glyphicon glyphicon-pencil" > </span></button> <button class="remove" data-id="' + data1.id + '"><span class="glyphicon glyphicon-trash" > </span></button>' + '</td>' + '</tr>');
                });

            },
            error: function() {
                alert("Records not loaded..!!");
            }


        });

    });


    $('#search').click(function() {
        var $table = $('#table_body');
        var $input = $('#input');
        var name = $('#input').val();
        if ($input.val() == "") {
            alert("Enter the id..!!");
        } else {
            $.ajax({
                type: 'GET',
                url: 'http://localhost:8080/Employees?name_like=' + name,
                dataType: 'JSON',
                success: function(result) {
                    $input.val("");
                    $table.html('');
                    for(data in result){
                    $table.append('<tr>' + '<td>' + result[data].id + '</td>' + '<td class="nc0">' + result[data].name + '</td>' + '<td class="nc1">' + result[data].company + '</td>' + '<td class="nc2">' + result[data].email + '</td>' + '<td class="nc3">' + result[data].phone + '</td>' + '<td> <button class="edit" data-id="' + result[data].id + '"><span class="glyphicon glyphicon-pencil"> </span></button> <button class="remove" data-id="' + result[data].id + '"><span class="glyphicon glyphicon-trash" > </span></button>' + '</td>' + '</tr>');
                }

                },
                error: function() {
                    alert("Record searched not found..!!");
                    $input.val("");
                }
            });
        }
    });
    $('#add-details').click(function() {
        var $table = $('#table_body');

        console.log("hi");

        var details = {

            name: $('#inputName').val(),
            company: $('#inputCompany').val(),
            email: $('#inputEmail').val(),
            phone: $('#inputPhone').val(),

        };
        $.ajax({
            type: 'Post',
            url: 'http://localhost:8080/Employees/',
            data: details,
            success: function(data) {

                $table.empty();
                $table.append('<tr>' + '<td>' + data.id + '</td>' + '<td class="nc0">' + data.name + '</td>' + '<td class="nc1">' + data.company + '</td>' + '<td class="nc2">' + data.email + '</td>' + '<td class="nc3">' + data.phone + '</td>' + '<td> <button class="edit" data-id="' + data.id + '"><span class="glyphicon glyphicon-pencil" > </span></button> <button class="remove" data-id="' + data.id + '"><span class="glyphicon glyphicon-trash" > </span></button>' + '</td>' + '</tr>');


                alert("value added successfully");

            }

        });
    });

    var $table = $('#table_body');
    $table.delegate('.remove', 'click', function() {
        var $tr = $(this).closest('tr');
        var id = $(this).attr('data-id');

        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/Employees/' + id,
            dataType: 'JSON',
            success: function() {
                $tr.remove();
                alert("data deleted successfully");
            }
        });

    });

    $table.delegate('.edit', 'click', function() {
        var $tr = $(this).closest('tr');

        var id = $(this).attr('data-id');
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/Employees/' + id,
            success: function() {
                $('#myModal').modal();

                $('#add-details').hide();
                $('#update-details').show();

                $('#inputName').val($tr.find(".nc0").text());
                $('#inputCompany').val($tr.find(".nc1").text());
                $('#inputEmail').val($tr.find(".nc2").text());
                $('#inputPhone').val($tr.find(".nc3").text());
                $('#update_id').val(id);
            }
        });

    });
    $('#update-details').click(function() {
        var update_data = {
            id: $('#update_id').val(),
            name: $('#inputName').val(),
            company: $('#inputCompany').val(),
            email: $('#inputEmail').val(),
            phone: $('#inputPhone').val()
        };
        
        $.ajax({
            type: 'PATCH',
            url: 'http://localhost:8080/Employees/' + $('#update_id').val(),
            data: update_data,
            success: function(data1) {
                alert("data updated successfully");
                $table.html("");
                $table.append('<tr>' + '<td>' + data1.id + '</td>' + '<td class="nc0">' + data1.name + '</td>' + '<td class="nc1">' + data1.company + '</td>' + '<td class="nc2">' + data1.email + '</td>' + '<td class="nc3">' + data1.phone + '</td>' + '<td> <button class="edit" data-id="' + data1.id + '"><span class="glyphicon glyphicon-pencil" > </span></button> <button class="remove" data-id="' + data1.id + '"><span class="glyphicon glyphicon-trash" > </span></button>' + '</td>' + '</tr>');
            }
        });
    });

    $('.close').click(function() {
        alert("Operation Cancelled..!!")
    });

    var start = 0;
    var end = 20;
    var $table = $('#table_body');

    $(window).scroll(function() {
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            $('#loadmoreajaxloader').show();
            $.ajax({

                url: 'http://localhost:8080/Employees?_start=' + (start + 20) + '&_end=' + (end + 20),
                success: function(html) {
                    start = start + 20;
                    end = end + 20;

                    if (html) {
                        $("#postswrapper").append(html);
                        $(html).each(function(index, html)

                            {
                                $table.append('<tr>' + '<td >' + html.id + '</td>' + '<td class="nc0">' + html.name + '</td>' + '<td class="nc1">' + html.company + '</td>' + '<td class="nc2">' + html.email + '</td>' + '<td class="nc3">' + html.phone + '</td>' + '<td> <button class="edit" data-id="' + html.id + '"><span class="glyphicon glyphicon-pencil" > </span></button> <button class="remove" data-id="' + html.id + '"><span class="glyphicon glyphicon-trash" > </span></button>' + '</td>' + '</tr>');


                            });


                        $('#loadmoreajaxloader').hide();
                    } else {
                        $('#loadmoreajaxloader').html('<center>No more posts to show.</center>');
                    }
                }
            });
        }
    });
});