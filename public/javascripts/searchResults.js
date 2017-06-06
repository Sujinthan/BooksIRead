class ReactBox extends React.Component{

    constructor(){
      super();
      this.handleKeyUp=this.keyupHandler.bind(this);
      this.state= {value: '',
                  results: []//where the results will be stored
                  }
    }
    displayList(){
      var booktitle = this.state.value
      $.ajax({
        url : "https://www.googleapis.com/books/v1/volumes?q=" + booktitle + "&key=AIzaSyBV2L07EDS5v9VShRn-tV0FITu9Py5hygQ",
        success : function(data){
          this.setState({
            results: data.items
          })
        }.bind(this)
      })


      console.log(this.state.results)
    }

    keyupHandler(event){
      this.setState({
        value:event.target.value
      })

      this.displayList()
    }
    render(){
      return(<tr>
        <input type="text" id="usersearch" onKeyUp={this.handleKeyUp}/>
        <td className="MainContainer"> {this.state.results.map(function(item){
          return <td className="container">
                    <div className="book">
                      <div className="bookImage">
                        <img src={String(item.volumeInfo.imageLinks.thumbnail)}/>
                      </div>
                      <div className ="title">
                        {item.volumeInfo.title}
                      </div>
                      <div className = "authors">
                        {item.volumeInfo.authors.map(function(names){

                            if (item.volumeInfo.authors.indexOf(names) ==   item.volumeInfo.authors.length -1 ){
                              return <div className="authorsName"> {names}</div>
                            }
                            else{
                              return <div className="authorsName"> {names},</div>
                            }

                        })}
                      </div>
                    </div>
                  </td>
        })}</td>
        </tr>
      )
    }
}
ReactDOM.render(<ReactBox/>, document.getElementById('myDiv'))
