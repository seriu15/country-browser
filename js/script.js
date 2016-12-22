var url = 'https://restcountries.eu/rest/v1/name/';
var borderUrl = 'https://restcountries.eu/rest/v1/alpha/';
var countriesList = $('#countries');
var tableTemplate = $(".table-template");
var key;
var mycheckBox = $('#myCheckBox')
var checkBoxButton = $('#myCheckBoxButton');

$('#search').click(searchCountries);
$('#country-name').bind('keypress', function(e) {
	var value = $(this).val();
	key = e.keyCode;
  if((value.length > 1) && (key == 13)){
    searchCountries();
  }
});
$('#country-name').keyup(function(event){
	var value = $(this).val();
	if((value.length > 2) || ((value.length > 1) && (key == 13))){
		searchCountries();
	} else {
		countriesList.empty();
	}
});

checkBoxButton.click(function(){
	if(mycheckBox.hasClass('hidden')){
		mycheckBox.removeClass('hidden');
		checkBoxButton.text("Show less options");
	} else {
		mycheckBox.addClass('hidden');
		checkBoxButton.text("Show more options")
	}
});

function searchCountries() {
	var countryName = $('#country-name').val();
	if(!countryName.length) countryName = 'Poland';
	$.ajax({
		url: url + countryName,
		method: 'GET',
		success: showCountriesList,
		error: notFound
	});
}


$('#countries').on('click', '.borders a', function(){
	var borderClicked = $(this).text();
	$.ajax({
		url: borderUrl + borderClicked,
		method: 'GET',
		success: showCountriesList,
		error: notFound
	});
});


function showCountriesList(resp) {
	console.log(resp);
	countriesList.empty();
	if (!Array.isArray(resp)) resp = [resp];
	resp.forEach(function(item) {
		var newTable = tableTemplate.clone();
		var myborder = "";
		item.borders.forEach(function(bor){
			var $border = "<a href='#'>" + bor + "</a>";
			if(myborder == ""){
				myborder = $border;
			} else {
				myborder = myborder + ", " + $border;
			}
		});
		$('<li>').html(newTable).appendTo(countriesList)
													.find('.country').text(item.name).end()
													.find('.capital').text(item.capital).end()
													.find('.region').text(item.region).end()
													.find('.subregion').text(item.subregion).end()
													.find('.population').text(item.population).end()
													.find('.demonym').text(item.demonym).end()
													.find('.timezones').text(item.timezones.join(", ")).end()
													.find('.borders').html(myborder).end()
													.find('.nativeName').text(item.nativeName);
	});
}

function notFound() {
	countriesList.empty();
	$('<li>').text("Not found").appendTo(countriesList);
}

$("input[type='checkbox']").change(function() {
	var $input = $( this );
	var checkBoxName = ".";
	checkBoxName += $input.attr('value');
	if(this.checked){
		$('table').find(checkBoxName).removeClass('hidden');
		console.log(checkBoxName);
	} else {
		$('table').find(checkBoxName).addClass('hidden');
	}
});
