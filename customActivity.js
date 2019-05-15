define([
    'js/postmonger'
], function(
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
    var payload = {};
    var lastStepEnabled = false;
    var steps = [ 
        { "label": "Step 1", "key": "step1" },
		{ "label": "Step 2", "key": "step2" }
    ];
    var currentStep = steps[0].key;

    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);
	connection.on('clickedNext', onClickedNext);
    connection.on('clickedBack', onClickedBack);
    connection.on('gotoStep', onGotoStep);

    function onRender() {
        connection.trigger('ready');
		connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
		
      $('#select2').click(function() {
					var message = getMessage();
					var name = $('#select1').val();
					 connection.trigger('updateButton', { button: 'next', enabled: Boolean(message) });

					$('#message').html(message);
				});
				
	}
	function initialize (data) {
        if (data) {
            payload = data;
        }

        var message;
        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
        );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        $.each(inArguments, function(index, inArgument) {
            $.each(inArgument, function(key, val) {
                if (key === 'message') {
                    message = val;
                }
            });
        });

        if (!message) {
            showStep(null, 1);
            connection.trigger('updateButton', { button: 'next', enabled: false });
        } else {
            $('#select1').val();
            $('#message').html(message);
            showStep(null, 2);
        }
    }

    function onGetTokens (tokens) {
         console.log(tokens);
    }

    function onGetEndpoints (endpoints) {
    }

    function onClickedNext () {
        if (
            (currentStep.key === 'step2')
        ) {
            save();
        } else {
            connection.trigger('nextStep');
        }
    }

    function onClickedBack () {
        connection.trigger('prevStep');
    }

    function onGotoStep (step) {
        showStep(step);
        connection.trigger('ready');
    }

    function showStep(step, stepIndex) {
        if (stepIndex && !step) {
            step = steps[stepIndex-1];
        }

        currentStep = step;

        $('.step').hide();

        switch(currentStep.key) {
            case 'step1':
                $('#step1').show();
                connection.trigger('updateButton', {
                    button: 'next',
                    enabled: Boolean(getMessage())
                });
                connection.trigger('updateButton', {
                    button: 'back',
                    visible: false
                });
                break;
            case 'step2':
                $('#step2').show();
                connection.trigger('updateButton', {
                    button: 'back',
                    visible: true
                });
                connection.trigger('updateButton', {
                    button: 'next',
                    text: 'save',
                    visible: true
                });
                break;
        }
    }

    function save() {
        var name = $('#select1').val();
        var value = getMessage();
	 value = encodeURIComponent(value)

        payload.name = name;
		payload['arguments'].execute.inArguments = [{ "message": value }];
		payload['metaData'].isConfigured = true;
		connection.trigger('updateActivity', payload);
    }

   function getMessage() {
					var albert = $('#select1').val();
					console.log (albert);
					$('#select10').html(albert);
	    var d = new Date();
  var n = d.getHours();
    $('#select10').append ('<small><span>' + n + '</span></small>');
	  $('#select10').append ('<small><span>:</span></small>');
    var e = new Date();
  var m = e.getMinutes() < 10 ? '0' : '') + e.getMinutes();
   $('#select10').append ('<small><span>' + m + '</span></small>');
					return $('#select1').val();
				}
				var albert = $('#select1').val();
				console.log (albert);

});
