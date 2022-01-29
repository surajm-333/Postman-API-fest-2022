let startingUrl = "https://library-books-api.herokuapp.com";

const apiUrl = {
    signupUrl : startingUrl + '/api/signup',
    loginUrl : startingUrl + '/api/login',
    addBookUrl : startingUrl + '/api/admin/book/id',
    getAllBooksUrl : startingUrl + '/api/books',
    updateBookUrl : startingUrl + '/api/admin/update/id',
    deleteBookUrl : startingUrl + '/api/admin/delete/id'
}

export default apiUrl;
