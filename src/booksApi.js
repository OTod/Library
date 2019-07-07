class LibraryAPI {
  constructor(basicRoute){
    this.baseURL = basicRoute;
  }

  fetchBooks(){
    return this.makeRequest('GET','');
  }

  editBook(id,editedBook){
    return this.makeRequest('PATCH', `/${id}`, editedBook);
  }

  deleteBook(id){
    return this.makeRequest('DELETE', `/${id}`);
  }

  addBook(newBook){
    return this.makeRequest('POST', '', newBook);
  }

  makeRequest(method, route, data ){
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(method,this.baseURL+route, true);
      xhr.onload = () => {
        if(xhr.status >= 200 && xhr.status < 300 ) {
          resolve(JSON.parse(xhr.response)); 
        } else {
          reject(xhr.response);
        }
      }
      xhr.onerror = (e) => {
        reject(e);
      }
      data ? xhr.send(JSON.stringify(data)) : xhr.send();
    })
  }
}

module.exports = new LibraryAPI('http://localhost:4200/library');