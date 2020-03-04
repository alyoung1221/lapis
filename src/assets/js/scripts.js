var ethnicities = []; 
var interests = []; 
var religions = [];
var tbody = $("tbody").html();

$("[type='radio']").each(function(e) {
	$(this).click(function(e) {
        if (e.ctrlKey) {
            this.checked = false;
        }
    });
});
$("#date").html(new Date().getFullYear());

$("#plus").click(function(e) {
	setMiles(e); 
});
$("#minus").click(function(e) {
	setMiles(e); 
});

let timeout = null;

$("[name='category']").click(function() {
	switch($("[name='category']:checked").val()) {
		case "interests": 
			$("#search").attr("placeholder", "Search by interests...");
			break;	
		case "users": 
			$("#search").attr("placeholder", "Search by users...");
			break;
		case "locations": 
			$("#search").attr("placeholder", "Search by locations...");
			break;						
		default: 
			$("#search").attr("placeholder", "Search...");
			break;					
		}
		if ($("#search").val()) {
			searchUsers();
		}
	});
$("#search").keyup(function() {
	clearTimeout(timeout);
	timeout = setTimeout(function () {searchUsers();}, 500);	
});
		
$("#search").on("input", function() {
	if ($("#search").val() === "") {
		$("tbody").empty();
		$("#results").empty();
	}
});
		
function setMiles(e) {
	if (e.target.id === "plus") {
		document.querySelector("#miles").stepUp();
	}
	else {
		document.querySelector("#miles").stepDown();
	}
}

function searchUsers(type, e) {
	var users = createUsers();
	var selectedUsers = new Array(); 
	
	if (type === "advanced") {
		e.preventDefault(); 
		$("#advancedSearch").attr("class", "hidden");
		
		var ethnicities = $("input[name='ethnicities']:checked").val();
		var interests = $("input[name='interests']:checked").val();
		var religions = $("input[name='religions']:checked").val();

		for (var i = 0; i < users.length; i++) {
			var ethnicMatch = false; 
			var interestMatch = false; 
			var religionMatch = false; 
			
			for (var x = 0; x < ethnicities.length; x++) {
				if (users[i].getEthnicities().includes(ethnicities[x]) || ethnicities[x] === "Any") {
					ethnicMatch = true;
				}
			}
			for (var y = 0; y < interests.length; y++) {
				if (users[i].getInterests().includes(interests[y].toLowerCase())) {
					interestMatch = true;
				}
			}
			for (var z = 0; z < religions.length; z++) {
				if (users[i].getReligion().includes(religions[z]) || religions[z] === "Any") {
					religionMatch = true;
				}
			}
			if (users[i].getGender() === $("input[name='gender']:checked").val() && (users[i].getAge() >= $("input[name='min']").val() && users[i].getAge() < $("input[name='max']").val()) && ethnicMatch && interestMatch && religionMatch) {
				selectedUsers.push(users[i]); 
			}
		}
		if (selectedUsers.length > 0) {				
			for (var a = 0; a < selectedUsers.length; a++) {
				var tr = document.createElement("tr");
				tr.innerHTML = "\n";
					
				for (var y = 0; y < 2; y++) {
					var td = document.createElement("td");
					
					if (y == 0) {
						td.innerHTML = "\n<img src='" + selectedUsers[a].getProfile() + "' class='profile'>\n"; 
					}
					else {
						td.innerHTML = "\n" + selectedUsers[a].getUser() + "\n<br>" + selectedUsers[a].getAge() + "\n<br>" + selectedUsers[a].getEthnicities(); 
					}
					tr.append(td);
				}
				$("tbody").eq(0).append(tr);
			}
			$("#results").html("<br><a href='advanced-search.html'>Return to search</a>");		
		}
		else {
			$("#results").html("<h3>Sorry, no results found.<br>Try another search.</h3><br><a href='advanced-search.html'>Return to search</a>");		
		}
	}
	else {
		var searchTerm = $("#search").val().toLowerCase();
		var category = $("[name='category']:checked").val(); 
		$("tbody").removeClass("flex-container");
		$("tbody").html("");
		$("#results").html("");
		$("#advancedSearch").addClass("hidden");
		
		for (var i = 0; i < users.length; i++) {
			switch(category) {
				case "interests": 
					if (users[i].getInterests().toLowerCase().includes(searchTerm)) {
						selectedUsers.push(users[i]);
					}
				break;	
				case "users": 
					if (users[i].getUser().toLowerCase().includes(searchTerm)) {
						selectedUsers.push(users[i]);
					}
					break;		
				case "locations": 
					if (users[i].getCity().toLowerCase().includes(searchTerm)) {
						selectedUsers.push(users[i]);
					}
					break;				
				default: 
					if (users[i].toString().toLowerCase().includes(searchTerm)) {
						selectedUsers.push(users[i]);
					}
					break;	
			}
		}

		if (selectedUsers.length > 0) {
			for (var a = 0; a < selectedUsers.length; a++) {
				var tr = document.createElement("tr");
				tr.innerHTML = "\n";
					
				for (var y = 0; y < 2; y++) {
					var td = document.createElement("td");
					
					if (y == 0) {
						td.innerHTML = "\n<img src='" + selectedUsers[a].getProfile() + "' class='profile'>\n"; 
					}
					else {
						td.innerHTML = "\n" + selectedUsers[a].getUser() + "\n<br>" + selectedUsers[a].getAge() + "\n<br>" + selectedUsers[a].getEthnicities(); 
					}
					tr.append(td);
				}
				if (selectedUsers.length > 1 && a != selectedUsers.length - 1) {
					tr.append(document.createElement("br"));
					tr.append(document.createElement("hr"));
				}
				$("tbody").eq(0).append(tr);
			}
		}
		else {
			$("#results").html("<h3>Sorry, no results found. Try another search.</h3>");		
		}
			
		if ($("#search").val() === "") {
			$("tbody").addClass("flex-container");
			$("tbody").html(tbody);
			$("#results").empty();
			$("#advancedSearch").removeClass("hidden");
		}
	}
}

function createUsers() {
	var users = new Array();
	
	users.push(new User("Elle Brookes", "F", 20, "images/female.jpg", "White, Asian", "cooking, reading", "Christian", "VA"));
	users.push(new User("Samantha Jones", "F", 21, "images/female.jpg", "White", "cooking, reading", "Christian", "WA"));
	users.push(new User("Lani Greene", "F", 23, "images/female.jpg", "Native Hawaiian, Pacific", "baking, reading", "N/A", "MI"));
	users.push(new User("David James", "M", 30, "images/male.jpg", "White, Pacific", "volleyball, zip lining", "Catholic", "NY"));
	users.push(new User("Paul Tran", "M", 25, "images/male.jpg", "Asian", "volleyball, skiing", "N/A", "FL"));
	users.push(new User("Ben Jones", "M", 22, "images/male.jpg", "Hispanic", "skiing, zip lining", "Catholic", "NC"));

	return users;
}

function User(name, gender, age, profile, ethnicities, interests, religion, city) {
	this.name = name;	
	this.gender = gender;
	this.age = age;	
	this.profile = profile;
	this.ethnicities = ethnicities;
	this.interests = interests;
	this.religion = religion;
	this.city = city;
	this.getUser = function() {return this.name;};  
	this.getGender = function() {return this.gender;};  
	this.getAge = function() {return this.age;};  
	this.getProfile = function() {return this.profile;};
	this.getEthnicities = function() {return this.ethnicities;};  	
	this.getInterests = function() {return this.interests;};  
	this.getReligion = function() {return this.religion;};  
	this.getCity = function() {return this.city;};  
	this.toString = function() {
		return this.name + " " + this.ethnicities + " " + this.interests + " " + this.religion + " " + this.city;
	}
}