class Popup {
  constructor(){

    this.onCancel = onCancel;
    this.onConfirm = onConfirm;
    this.$popup = document.getElementById('popup');
  }

  open(){
    this.$popup.classList.replace('hidden','shown');
  }

  close(){
    this.$popup.classList.replace('shown', 'hidden');
  }
}

module.exports = new Popup();