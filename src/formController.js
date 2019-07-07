function getFormValues(){
    const { elements } = document.forms[0];
    const formData = {};
    for(let n = 0; n< elements.length; n ++ ){
      let element = elements[n];
      if(element.tagName === 'INPUT'){
        formData[element.name] = element.value;
      }
    }
  
    return formData;
}

function populateForm(){

}


module.exports = { getFormValues, populateForm }