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
			console.log(error.text());
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
			$(".form-container:last-of-type").css("display", "block");
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
		console.log($("[name='interests']").val());
	};
	
	function validateCheckbox(input) {	
		if ($("[name='interests[]']:checked").length > 10) {
			alert("Please select up to 10 interests.");
			input.prop("checked", false);
		}
	}

	/*$("#search").on("input", function() {
		if ($("#search").val() == "") {
			$("#reset").click();
			$("#filters").hide();
			populateTable(createUsers());
			$("#users").css("margin-left", "0");
		}
		else {
			$("main").load("/search", searchUsers);
		}
	});

	$("#filter").click(function(e) {
		searchUsers("filters");
	});*/

	$("#reset").click(function() {
		$("[name='gender']:checked").prop("checked", false);
		$("[name='interests[]']:checked").prop("checked", false);
		$("#slider-range").slider("destroy");
		rangeSlider();
		$(".dropdown").dropdown("restore defaults");
	});

	$("#edit").validate({
		rules: {
			name: "required",
			email: {
				required: true,
				email: true
			},
			state: "required",
			gender: "required"
		},
		errorPlacement: function(error, element){},
		highlight: function (element, errorClass) {
			$(element).removeClass("error").addClass("has-error");
		}
	});
	
	$("#edit").submit(function() {
		if ($("#state").val() == "") {
			$("#state").parent().addClass("error");
		}
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

	rangeSlider();

	function rangeSlider() {
		$("#slider-range").slider({
			range: true,
			min: 18,
			max: 70,
			values: [25, 45],
			slide: function(ui) {
				$("#age").val(ui.values[0] + " - " + ui.values[1]);
				$("input[name='min']").val(ui.values[0]);
				$("input[name='max']").val(ui.values[1]);				
			}
		});
		$("#age").val($("#slider-range").slider("values", 0) + " - " + $("#slider-range").slider("values", 1));
		$("input[name='min']").val($("#slider-range").slider("values", 0));
		$("input[name='max']").val($("#slider-range").slider("values", 1));	
	}
			
	function searchUsers() {
		console.log("Called");
		$("#users").css("margin-left", "80px");
		$("tbody").empty();
		$("#filters").show();
		
		var searchTerm = $("#search").val().toLowerCase();
		var users = createUsers();
		var selectedUsers = new Array(); 
			
		if (type == "filters") {
			var interestMatch = false;
			var statesMatch = false;
				
			for (var i = 0; i < users.length; i++) {	
				var states = "";
				var interests = "";			
					
				if ($("#interests option:selected").length > 0) {
					$("#interests option:selected").each(function() {
						if (users[i].getInterests().includes($(this).val())) {
							interestMatch = true;
						}
					});
				}
				else {
					interestMatch = true;
				}
					
				if ($("#states option:selected").length > 0) {
					$("#states option:selected").each(function() {
						states += $(this).val();
					});
				}
				else {
					statesMatch = true;
				}
				
				if (users[i].toString().toLowerCase().includes(searchTerm) && $("input[name='gender']:checked").val().includes(users[i].getGender()) && interestMatch && (users[i].getAge() >= $("input[name='min']").val() && users[i].getAge() < $("input[name='max']").val()) && (states.includes(users[i].getState()) || statesMatch)) {
					selectedUsers.push(users[i]); 
				}
			}
		}
		else {
			for (var i = 0; i < users.length; i++) {
				if (users[i].toString().toLowerCase().includes(searchTerm)) {
					selectedUsers.push(users[i]);
				}
			}
		}

		if (selectedUsers.length > 0) {		
			populateTable(selectedUsers);
		}
		sessionStorage.removeItem("search");
	}

	function populateTable(selectedUsers) {
		$("tbody").empty();
		for (var i = 0; i < selectedUsers.length; i++) {
			var tr = document.createElement("tr");
			tr.innerHTML = "\n";
						
			for (var y = 0; y < 2; y++) {
				var td = document.createElement("td");
						
				if (y == 0) {
					td.innerHTML = "\n<img src='" + selectedUsers[i].getProfile() + "' class='profile'>\n"; 
				}
				else {
					td.innerHTML = "\n" + selectedUsers[i].getUser() + "\n<br>" + selectedUsers[i].getAge() + ", " + selectedUsers[i].getState(); 
				}
				tr.append(td);
			}
					
			tr.append(document.createElement("td"));
			tr.append(document.createElement("td"));
			$("tbody").append(tr);
		}
	}

	function createUsers() {
		var users = new Array();
		
		users.push(new User("Elle Brookes", "F", 20, "/assets/images/female.jpg", "cooking, reading", "VA"));
		users.push(new User("Samantha Jones", "F", 21, "/assets/images/female.jpg", "cooking, reading", "WA"));
		users.push(new User("Lani Greene", "F", 23, "/assets/images/female.jpg", "baking, reading, zip lining", "MI"));
		users.push(new User("David James", "M", 30, "/assets/images/male.jpg", "volleyball, zip lining", "NY"));
		users.push(new User("Paul Tran", "M", 25, "/assets/images/male.jpg", "volleyball, skiing", "FL"));
		users.push(new User("Ben Jones", "M", 22, "/assets/images/male.jpg", "skiing, zip lining", "NC"));

		return users;
	}

	function User(name, gender, age, profile, interests, state) {
		this.name = name;	
		this.gender = gender;
		this.age = age;	
		this.profile = profile;
		this.interests = interests;
		this.state = state;
		this.getUser = function() {return this.name;};  
		this.getGender = function() {return this.gender;};  
		this.getAge = function() {return this.age;};  
		this.getProfile = function() {return this.profile;}; 	
		this.getInterests = function() {return this.interests;};  
		this.getState = function() {return this.state;};  
		this.toString = function() {
			return this.name + " " + this.gender + " " + this.interests + " " + this.state;
		}
	}

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