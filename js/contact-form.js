/* ---------------------------------------------
 Contact form
 --------------------------------------------- */
$(document).ready(function(){
    $("#submit_btn").click(function(){
        
        //get input field values
        var user_name = $('input[name=name]').val();
        var user_email = $('input[name=email]').val();
        var user_message = $('textarea[name=message]').val();
        var user_gotcha = $('input[name=_gotcha]').val();
        var user_subject = $('input[name=_subject]').val();
        
        //simple validation at client's end
        //we simply change border color to red if empty field using .css()
        var proceed = true;
        if (user_name == "") {
            $('input[name=name]').css('border-color', '#e41919');
            proceed = false;
        }
        if (user_email == "") {
            $('input[name=email]').css('border-color', '#e41919');
            proceed = false;
        }
        
        if (user_message == "") {
            $('textarea[name=message]').css('border-color', '#e41919');
            proceed = false;
        }
        
        //everything looks good! proceed...
        if (proceed) {
            //data to be sent to server
            post_data = {
                'Name': user_name,
                'Email': user_email,
                'Message': user_message,
                '_gotcha': user_gotcha,
                '_subject': user_subject
            };
            //Ajax post data to server

            // $.ajax({
            //     type: 'POST',
            //     url: 'https://formspree.io/filipecaixeta@gmail.com',
            //     crossDomain: true,
            //     data: post_data,
            //     dataType: 'json',
            //     success: function(responseData, textStatus, jqXHR) {
            //         var value = responseData.someKey;
            //     },
            //     error: function (responseData, textStatus, errorThrown) {
            //         alert('POST failed.');
            //     }
            // });
            email = "fiwlipewcaiwxeta@gmail.com";
            $.post('https://formspree.io/'+email.replace(/w/g,''), post_data, function(response){
            
                //load json data from server and output message     
                if (response.type == 'error') {
                    output = '<div class="error">' + response.text + '</div>';
                }
                else {
                
                    output = '<div class="success">' + "Mensagem enviada" + '</div>';
                    
                    //reset values in all input fields
                    $('#contact_form input').val('');
                    $('#contact_form textarea').val('');
                }
                
                $("#result").hide().html(output).slideDown();
            }, 'json');
            
        }
        
        return false;
    });
    
    //reset previously set border colors and hide all message on .keyup()
    $("#contact_form input, #contact_form textarea").keyup(function(){
        $("#contact_form input, #contact_form textarea").css('border-color', '');
        $("#result").slideUp();
    });
    
});
