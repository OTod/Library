class Popup {
  constructor(){
    this.onConfirm = function(){
      throw('No confirmation function provided');
    }
    this.$popup = document.getElementById('popup');
  }

  open(){
    this.$popup.classList.replace('hidden','shown');
  }

  close(){
    this.$popup.classList.replace('shown', 'hidden');
    document.forms[0].reset();
  }

  setOnConfirm(func){
    this.onConfirm = func;
  }

}

module.exports = new Popup();