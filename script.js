const countries = [
  {name : 'Afganistan'},
  {name : 'Albania'},
  {name : 'Algeria'},
  {name : 'Andorra'},
  {name : 'Angola'},
  {name : 'Argentina'},
  {name : 'Armenia'},
  {name : 'Australia'},
  {name : 'Austria'},
  {name : 'Azerbaijan'},
  {name : 'Bahamas'},
  {name : 'Bahrain'},
  {name : 'Bangladesh'},
  {name : 'Barbados'},
  {name : 'Belarus'},
  {name : 'Belgium'},
  {name : 'Belize'},
  {name : 'Benin'},
  {name : 'Bhutan'},
  {name : 'Bolivia'},
  {name : 'Bosnia'},
  {name : 'Botswana'},
  {name : 'Brazil'},
  {name : 'Brunei'},
  {name : 'Bulgaria'},
  {name : 'Burkina'},
  {name : 'Burundi'},
  {name : 'Iceland'},
  {name : 'India'},
  {name : 'Indonesia'},
  {name : 'Iran'},
  {name : 'Iraq'},
  {name : 'Ireland'},
  {name : 'Israel'},
  {name : 'Italy'}
];

var index = -1;
var SearchBar = document.querySelector('.SearchBar');
var suggestionBox = document.querySelector('.suggestions');

function resetSuggestion() {
  for (var i = 0; i < suggestionBox.children.length; i++) {
    suggestionBox.children[i].classList.remove('selected');
  }
}

SearchBar.addEventListener('keyup', (e) => {
  //keyBoard Control down
  if (e.key === 'ArrowDown') {
    resetSuggestion();
    index = (index < suggestionBox.children.length - 1) ? index + 1 : suggestionBox.children.length - 1;
    suggestionBox.children[index].classList.add('selected');
    return;
  }

  //keyBoard Control up
  if (e.key === 'ArrowUp') {
    resetSuggestion();
    index = (index > 0) ? index - 1 : 0;
    suggestionBox.children[index].classList.add('selected');
    return;
  }

  //set input to choosen value
  if(e.key === 'Enter'){
    SearchBar.value = suggestionBox.children[index].innerHTML;
    suggestionBox.classList.remove('show');
    index = -1;
    return;
  }

  //getting user input
  suggestionBox.classList.add('show');
  var input = SearchBar.value.toLowerCase();
  suggestionBox.innerHTML = '';

  //filter list
  const suggested = countries.filter((country) => {
    return country.name.toLowerCase().startsWith(input);
  });

  //add item in display
  suggested.forEach((suggest) => {

    const div = document.createElement('div');
    div.innerHTML = suggest.name;
    div.setAttribute('class', 'suggestion');
    suggestionBox.appendChild(div);

    if (input === '') {
      suggestionBox.innerHTML = '';
      index = -1;
    }
  });

  //close suggestion box
  document.addEventListener('click', (e) => {

    if(e.target.className === 'suggestion') {
      SearchBar.value = e.target.innerHTML;
      suggestionBox.classList.remove('show');
    }
  });

});
