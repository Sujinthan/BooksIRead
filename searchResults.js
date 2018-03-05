const CSSTransitionGroup = React.addons.CSSTransitionGroup;
const TransitionGroup = React.addons.TransitionGroup;

class ReactBox extends React.Component {

    constructor() {
        super();
        this.handleKeyUp = this.keyupHandler.bind(this);
        this.handleClick = this.clickHandler.bind(this);
        this.handCheckClick = this.checkClick.bind(this);
        this.state = {
            value: '',
            results: [],//where the results will be stored
            item_detail:null,
            visible: false
        }
    }
    clickHandler(item) {
        var holder = document.createElement("div")
        holder.className="holder"
        var btn = document.createElement("div");        // Create a <div> element
        btn.className ="description"
        var t = document.createTextNode(item.volumeInfo.description);       // Create a text node
        btn.appendChild(t);
        var main = document.getElementById("hidden_descritpion")

        
        if(this.state.item_detail == null ){
            this.setState({item_detail:item})
            main.appendChild(btn)
        }else if(this.state.item_detail.id == item.id){
            while (main.firstChild) {
                main.removeChild(main.firstChild);
            }
            this.setState({item_detail:''})

        }else{
            while (main.firstChild) {
                main.removeChild(main.firstChild);
            }
            main.appendChild(btn)
            this.setState({item_detail:item})
        }
        
    }
    checkClick(e, notyId) {
        alert(notyId);
    }
    displayList() {
        var booktitle = this.state.value
        var url = "https://www.googleapis.com/books/v1/volumes?q=" + booktitle + "&key=AIzaSyBV2L07EDS5v9VShRn-tV0FITu9Py5hygQ"
        fetch(url).then((response) => response.json())
        .then((responseJson)=>{
            this.setState({results: responseJson.items})
        })
        .catch((error)=>{
            console.error(error);
        });

    }

    keyupHandler(event) {
        this.setState({
            value: event.target.value
        })
        this.displayList()
    }

    render() {
        const { visible } = this.state;
        return (<tr>
            <tr>
                <input type="text" id="usersearch" onKeyUp={this.handleKeyUp} />
            </tr>
            <tr>
                <td className="MainContainer"> {this.state.results.map((item) => {
                    return <td className="container">
                        <div className="book" onClick={() => {this.handleClick(item)}}>
                            <div className="bookImage">
                                
                                    <img src={String(item.volumeInfo.imageLinks.thumbnail)} />

                            </div>
                            <div className="title">
                                {item.volumeInfo.title}
                            </div>
                            <div className="authors">
                                {item.volumeInfo.authors.map(function (names) {
                                    return <div className="authorsName"> {names}</div>
                                })}
                            </div>

                        </div>

                    </td>
                })}
                </td>
            </tr>
            <tr>
                <div id="hidden_descritpion" className="hidden">
                    <h1>Hello</h1>
                </div>

            </tr>
        </tr>
        )
    }


}

ReactDOM.render(<ReactBox />, document.getElementById('myDiv'))