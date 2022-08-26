// The date you were born
const birthDate = new Date(2001, 2, 22, 0, 0, 0, 0);

function getAge(){
    // The current date
    var currentDate = new Date();

    // The age in years
    var age = currentDate.getFullYear() - birthDate.getFullYear();

    // Compare the months
    var month = currentDate.getMonth() - birthDate.getMonth();

    // Compare the days
    var day = currentDate.getDate() - birthDate.getDate();

    // If the date has already happened this year
    if ( month < 0 || month == 0 && day < 0 )
    {
        age--;
    }

    return age;
}

window.onload = (event) => {
    let ageText = document.getElementById("age");
    ageText.innerText = getAge();
};