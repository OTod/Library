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

    document.getElementById('publisher').removeAttribute('disabled');
    document.getElementById('quantity').removeAttribute('disabled');

    document.forms[0].reset();
  }

  setOnConfirmCallback(func){
    this.onConfirm = func;
  }

}

module.exports = new Popup();