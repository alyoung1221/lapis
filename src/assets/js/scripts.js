$(function() {
	$("#date").html(new Date().getFullYear()); 
	
	/*Sign Up*/
	$("#dob").flatpickr({
		altInput: true,
		altFormat: "F j, Y",
		dateFormat: "Y-m-d",
		maxDate: "today"
	});

	$("#dob + input").attr("name", "dob");

	jQuery.validator.setDefaults({
		onfocusout: function(element) {
			this.element(element);  
		},
		oninput: function(element) {
			this.element(element);  
		},
		errorPlacement: function(error, element) {
			if (error.text().includes("match")) {
				error.insertAfter(element);
			}
			else {
				return false;
			}
		}
	});
	
	$("#sign-up").validate({
	  rules: {
		fname: "required",
		lname: "required",
		email: {
			required: true,
			email: true
		},
		gender: "required", 
		dob: "required", 
		password: {
			required: true,
			equalTo: "#password2"
		},
		password2: {
			equalTo: "#password"
		},
	  },
	  messages: {
		password2: {
			equalTo: "The password does not match."
		}
	  }
	});
	
	$("#next").click(function() {
		if ($("#sign-up").valid()) {
			$(".form-container:not(:last-of-type)").css("display", "none");
			$("#last").css("display", "block");
			$("#next").css("display", "none");
			$("#submit").css("display", "inline-block");
		}
	});

	$("[type='radio']").each(function(e) {
		$(this).click(function(e) {
			if (e.ctrlKey) {
				this.checked = false;
			}
		});
	});

	$(".dropdown").dropdown();

	function loadMore() {
		var interests = getInterests();	
		var numInterests = $("[name='interests[]']").length;
		
		if ($("[name='interests[]']").length < interests.length) {
			numInterests += (numInterests + 6 < interests.length) ? 6 : interests.length - numInterests;
			
			for (var i = $("[name='interests[]']").length; i < numInterests; i++) { 
				var checkbox = "<input type='checkbox' name='interests[]' id='" + interests[i].getAbbr() +  "' value='" + interests[i].getName() + "'>";
				var label = $("<label for='" + interests[i].getAbbr() + "'>" + interests[i].getName() + "</label>");
				label.attr("title", interests[i].getName());
				$(".options").append(checkbox, label);
				$("[name='interests[]'] + label").last().hide().fadeIn();
			}

			$("[name='interests[]']").each(function(index) {
				$(this).change(function() {
					validateCheckbox($(this));
					
					if (index + 1 == $("[name='interests[]']").length && $("[name='interests[]']:checked").length < 10) {
						loadMore();
					}
					if ($("[name='interests[]']:checked").length < 10) {
						selectedInterests();
					}
				});
			});
		}
	}

	$("[name='interests[]']").each(function(index) {
		$(this).change(function() {
			validateCheckbox($(this));

			if (index + 1 == $("[name='interests[]']").length && $("[name='interests[]']:checked").length < 10) {
				loadMore();
			}
			if ($("[name='interests[]']:checked").length < 10) {
				selectedInterests();
			}
		});
	});

	function selectedInterests() {
		var interests = $("[name='interests[]']:checked").map(function() { return this.value; }).get().join(", ");
		$("[name='interests']").val(interests);
	};
	
	function validateCheckbox(input) {	
		if ($("[name='interests[]']:checked").length > 10) {
			alert("Please select up to 10 interests.");
			input.prop("checked", false);
		}
	}

	$("#reset").click(function() {
		$("[name='gender']:checked").prop("checked", false);
		$("#slider-range").slider("destroy");
		rangeSlider();
		$(".dropdown").dropdown("restore defaults");
	});

	$("#edit").validate({
		rules: {
			fname: "required",
			lname: "required",
			state: "required",
			gender: "required",
			bio: "required"
		},
		errorPlacement: function(error, element){},
	});
	
	$("form").submit(function() {
		if ($("[name='gender']:checked").length < 1) {
			$("[name='gender']").next().addClass("error");
		}
	});

	$("#state").change(function() {
		if ($("#state").val() != "") {
			$("#state").parent().removeClass("error");
		}
	});
	
	$("[name='gender']").on("input", function() {
		if ($("[name='gender']:checked").length > 0) {
			$("[name='gender']").next().removeClass("error");
		}
	});

	if ($("#bio").length > 0) {
		$("#bio").restrictLength($("#maxLength"));
	}

	function rangeSlider() {
		$("#slider-range").slider({
			range: true,
			min: 18,
			max: 70,
			values: [25, 45],
			slide: function(event, ui) {
				$("#age").val(ui.values[0] + " - " + ui.values[1]);
				$("input[name='min']").val(ui.values[0]);
				$("input[name='max']").val(ui.values[1]);				
			}
		});
		$("#age").val($("#slider-range").slider("values", 0) + " - " + $("#slider-range").slider("values", 1));
		$("input[name='min']").val($("#slider-range").slider("values", 0));
		$("input[name='max']").val($("#slider-range").slider("values", 1));	
	}

	rangeSlider();

	function getInterests() {
		var interests = [];
		
		interests.push(new Interest("Baking", "BK"));
		interests.push(new Interest("Cooking", "CK"));
		interests.push(new Interest("Reading", "RD"));
		interests.push(new Interest("Skiing", "SKI"));
		interests.push(new Interest("Volleyball", "VB")); 
		interests.push(new Interest("Zip Lining", "ZL"));
		interests.push(new Interest("Music", "MUS"));
		interests.push(new Interest("Art", "ART"));
		interests.push(new Interest("Sewing", "SW"));
		interests.push(new Interest("Writing", "WR"));
		interests.push(new Interest("Ice Skating", "IS"));
		interests.push(new Interest("Latte Art", "LA"));
		interests.push(new Interest("Swing Dancing", "SD"));
		interests.push(new Interest("Ballet", "BL"));
		interests.push(new Interest("Biking", "BI"));
		interests.push(new Interest("Singing", "SG"));	
		interests.push(new Interest("Herbology", "HB"));
		interests.push(new Interest("Skincare", "SC"));
		interests.push(new Interest("Food", "FD"));
		interests.push(new Interest("Fashion", "FS"));
		interests.push(new Interest("Games", "GA"));
		interests.push(new Interest("Movies", "MV"));
		interests.push(new Interest("Blogging", "BG"));
		interests.push(new Interest("Travel", "TR"));	
		
		return interests;
	}

	function Interest(name, abbr) {
		this.name = name;	
		this.abbr = abbr;
		this.getName = function() {return this.name;};  
		this.getAbbr = function() {return this.abbr;}; 
	}
});