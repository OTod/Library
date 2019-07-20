function createPagination(totalPagesAmout, selectedPage, onPaginationClick ){
  let $pagination = document.getElementById('pagination');
  $pagination.innerHTML = '';
  for(let i = 1; i<=totalPagesAmout; i++){
    const $number = document.createElement('span');
    $number.innerText = i;
    $number.value = i;
    if(i === parseInt(selectedPage)){
      $number.classList.add('pagination-number-selected');
    } else {
      $number.classList.add('pagination-number');
    };
    $number.addEventListener('click', onPaginationClick);
    $pagination.appendChild($number);
  }
}

module.exports = { createPagination };