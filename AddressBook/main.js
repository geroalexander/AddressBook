let firstNameArr = [];
let lastNameArr = [];
let addressArr = [];
let phoneNumberArr = [];

function listContacts()
{
  $("#listed").html("");

  for (let i = 0; i < firstNameArr.length; i++)
  {

    var newContact = $("#contact-item").clone().attr('id',"#table"+i);
    newContact.find("#flName").attr('id', "flName"+i).html(firstNameArr[i]+" "+lastNameArr[i]);
    newContact.find("#addressName").attr('id', "addressName"+i).html(addressArr[i]);
    newContact.find("#numberName").attr('id', "numberName"+i).html(phoneNumberArr[i]);
    newContact.find("#first-btn").attr('id', i);

    newContact.appendTo("#listed");
  }
}

function addContact(first, last, address, phone)
{
  if (first !== "" && last !== "" && address !== "" && phone !=="")
  {

    if (phone.match(/^[+-0123456789]+$/) === null)
    {
      $("#error").html("Phone number can only contain symbols -+ and numbers 0-9.");
    }
    else if (first.includes(" ") || last.includes(" "))
    {
      $("#error").html("Names cannot contain spaces!");
    }
    else
    {
      //----------------first-name-------------------\\
      let inputFirst = first.split(' ')
      let modInputFullFirst = []
      for (let i = 0; i < inputFirst.length; i++)
      {
        let modInputFirst = inputFirst[i].charAt(0).toUpperCase();
        let modInputRest = inputFirst[i].toLowerCase().slice(1);

        modInputFullFirst.push(modInputFirst + modInputRest);
      }
          firstNameArr.push(modInputFullFirst.join(' ')); //pushed first name

      //------------------last-name------------------\\
      let inputLast = last.split(' ')
      let modInputFullLast = []
      for (let i = 0; i < inputLast.length; i++)
      {
        let modInputLast = inputLast[i].charAt(0).toUpperCase();
        let modInputRest = inputLast[i].toLowerCase().slice(1);

        modInputFullLast.push(modInputLast + modInputRest);
      }
          lastNameArr.push(modInputFullLast.join(' ')); //pushed last name

          addressArr.push(address.toUpperCase());   // pushed address
          phoneNumberArr.push(phone);   // pushed phone

      $("#error").html("Contact added!");

      $("#first").val("");
      $("#last").val("");
      $("#address").val("");
      $("#number").val("");
    }
  }
  else
  {
    $("#error").html("Please fill in all contact fields!");
  }
}

function searchContact(nameSearch)
{
  $("#infoSearch").html("");
  let searched = 0;
  if (nameSearch === "")
  {
    $("#error").html("Please enter a valid contact.");
  }
  else
  {
    let inputSearch = nameSearch.split(' ')
    let modInputFullSearch = [] // ['Gero']  --> gero kassing
    for (let i = 0; i < inputSearch.length; i++)
    {
      let modInputFirst = inputSearch[i].charAt(0).toUpperCase();
      let modInputRest = inputSearch[i].toLowerCase().slice(1);

      modInputFullSearch.push(modInputFirst + modInputRest)
    }

    for (let i = 0; i < firstNameArr.length ; i++)
    {
        if (firstNameArr[i] === modInputFullSearch[0] && lastNameArr[i] === modInputFullSearch[1])
        {
          $(".infos").show();
          $(".contact-div").hide();

          var searchContact = $("#contact-item").clone().attr('id',"#table"+i);
          searchContact.find("#flName").attr('id', "flName"+i).html(firstNameArr[i]+" "+lastNameArr[i]);
          searchContact.find("#addressName").attr('id', "addressName"+i).html(addressArr[i]);
          searchContact.find("#numberName").attr('id', "numberName"+i).html(phoneNumberArr[i]);

          searchContact.appendTo("#infoSearch");

          searched++;
          $("#search").val("");
        }
        else if (firstNameArr[i] === modInputFullSearch[0] && modInputFullSearch.length === 1)
        {
          $(".infos").show();
          $(".contact-div").hide();

          var searchContact = $("#contact-item").clone().attr('id',"#table"+i);
          searchContact.find("#flName").attr('id', "flName"+i).html(firstNameArr[i]+" "+lastNameArr[i]);
          searchContact.find("#addressName").attr('id', "addressName"+i).html(addressArr[i]);
          searchContact.find("#numberName").attr('id', "numberName"+i).html(phoneNumberArr[i]);

          searchContact.appendTo("#infoSearch");

          searched++;
          $("#search").val("");
        }
        else if (lastNameArr[i] === modInputFullSearch[0] && modInputFullSearch.length === 1)
        {
          $(".infos").show();
          $(".contact-div").hide();

          var searchContact = $("#contact-item").clone().attr('id',"#table"+i);
          searchContact.find("#flName").attr('id', "flName"+i).html(firstNameArr[i]+" "+lastNameArr[i]);
          searchContact.find("#addressName").attr('id', "addressName"+i).html(addressArr[i]);
          searchContact.find("#numberName").attr('id', "numberName"+i).html(phoneNumberArr[i]);

          searchContact.appendTo("#infoSearch");

          searched++;
          $("#search").val("");
        }
    }

    if (searched === 0)
    {
      $("#error").html("No contact with that name was found!");
    }
  }
}

function deleteContact(nameDelete) // Gero Kassing
{
  let i = nameDelete;

  firstNameArr.splice(i, 1);
  lastNameArr.splice(i, 1);
  addressArr.splice(i, 1);
  phoneNumberArr.splice(i,1);

  $("table#table"+i).remove();
}

// JQUERY -----------------------------------------

$(document).ready(function()
{
  // add contact
    $("#btn-add").on("click", function()
  {
    $(".infos").hide();
    $(".contact-div").show();
    let first = $("#first").val();
    let last = $("#last").val();
    let address = $("#address").val();
    let number = $("#number").val();

    addContact(first, last, address, number);
    listContacts();

  });

  // delete contact listed
    $("#listed").on("click", "#deleteCell", function()
  {
    $(".infos").hide();
    $(".contact-div").show();
    let nameDelete = $(this).children("button").attr('id');
    deleteContact(nameDelete);
    listContacts();

  });

  // search contact
    $("#btn-search").on("click", function()
  {
    $("#btn-back").show();
    let nameSearch = $("#search").val();
    searchContact(nameSearch);

  });

  // back button
    $("#btn-back").on("click", function()
  {
    $(".infos").hide();
    $(".contact-div").show();
  });

});
