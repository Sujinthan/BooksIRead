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
            item_detail: [],
            visible: false
        }
    }
    clickHandler(item) {
        console.log(this.state.item_detail)
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
        /*$.ajax({
            url: "https://www.googleapis.com/books/v1/volumes?q=" + booktitle + "&key=AIzaSyBV2L07EDS5v9VShRn-tV0FITu9Py5hygQ",
            success: function (data) {

                this.setState({
                    results: data.items
                })
            }.bind(this)
        })*/
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
                        <div className="book" onClick={this.handleClick(item)}>
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
                <div id="hidden_descritpion" className="hidden">></div>
            </tr>
        </tr>
        )
    }
}

ReactDOM.render(<ReactBox />, document.getElementById('myDiv'))