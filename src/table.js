class Table {
  constructor(data = [], tableColumsData, onCheckboxClick, onEditBook){
    this.tableData = data;
    this.source = data;

    this.onCheckboxClick = onCheckboxClick || function(){
      throw('No checkbox click event handler provided');
    }
    
    this.onEditBook = onEditBook || function(){
      throw('No edit button click event handler provided');
    }
    
    this.tableColumnsOrderArray = tableColumsData || {
      checkbox: null,
      price: 'Price',
      name: 'Name',
      author: 'Author',
      publisher: 'Publishing House',
      quantity: 'Quantity',
      pagesCount: 'Pages Count',
      publishingYear: 'Publishing Year',
      genre: 'Genre',
      editButton: null
    }
  }

  set data(data){
    this.tableData = data;
    this.source = data;
  }

  sortData(parameter){
// ! not implemented yet
  }

  filterData(value){
    this.tableData = this.source.filter(
      (book)=>{
        let { name, author } = book;
        console.log(name, author);
        console.log(value);
        return name.includes(value) || author.includes(value);
      })
      console.log(this.tableData);
    if(!value){
      this.tableData = this.source;
    }
  }

  buildTable(){

    let $table = document.getElementById('table');
    $table.innerHTML = '';
    let $headerRow = document.createElement('tr');
    for( let columnName in this.tableColumnsOrderArray){
      let $header = document.createElement('th');
      $header.innerText = this.tableColumnsOrderArray[columnName]
      $headerRow.appendChild($header);
    }
    $table.appendChild($headerRow);

    this.tableData.forEach(element => {
      let $row = document.createElement('tr');
      $row.setAttribute('bookId',element.id);
      $row.classList.add('table-row');
      for(let columnName in this.tableColumnsOrderArray) {
        let $cell = document.createElement('td');
        switch (columnName) {
          case 'checkbox': 
            let $checkbox = document.createElement('input');
            $checkbox.setAttribute('type', 'checkbox');
            $checkbox.setAttribute('bookId',element.id);
            $checkbox.addEventListener('click',this.onCheckboxClick);
            $cell.appendChild($checkbox);
            break;
          case 'editButton': 
            let $editButton = document.createElement('button');
            $editButton.setAttribute('id', 'editButton');
            $editButton.setAttribute('bookId', element.id);
            $editButton.innerText = 'Edit';
            $editButton.addEventListener('click',this.onEditBook)
            $cell.appendChild($editButton);

            break;
          default: $cell.innerText = element[columnName];
        }

        $cell.classList.add('table-cell');
        $row.appendChild($cell);
      } 

      $table.appendChild($row);     
    });

  }
}

module.exports = Table;