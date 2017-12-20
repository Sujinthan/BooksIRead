const CSSTransitionGroup = React.addons.CSSTransitionGroup;
const TransitionGroup = React.addons.TransitionGroup;

class ReactBox extends React.Component {

    constructor() {
        super();
        this.handleKeyUp = this.keyupHandler.bind(this);
        this.handleClick = this.clickHandler.bind(this);
        this.state = {
            value: '',
            results: [],//where the results will be stored
            visible: false
        }
    }
    clickHandler() {
        console.log(this.slide)
        const el = this.slide;
        if ($(el).hasClass("fadeout"))
            $(el).removeClass("fadeout").addClass("fadein");
        else
            $(el).removeClass("fadein").addClass("fadeout");
    }
    displayList() {
        var booktitle = this.state.value
        $.ajax({
            url: "https://www.googleapis.com/books/v1/volumes?q=" + booktitle + "&key=AIzaSyBV2L07EDS5v9VShRn-tV0FITu9Py5hygQ",
            success: function (data) {
                this.setState({
                    results: data.items
                })
            }.bind(this)
        })
        console.log(this.state.results)
    }

    keyupHandler(event) {
        this.setState({
            value: event.target.value
        })
        this.displayList()
    }
    render() {
        return (<tr>
            <tr>
                <input type="text" id="usersearch" onKeyUp={this.handleKeyUp} />
            </tr>

            <tr>
                <td className="MainContainer"> {this.state.results.map((item) => {
                    return <td className="container" >

                        <div className="book" onClick={this.handleClick}>
                            <CSSTransitionGroup transitionName="example">
                                {this.state.visible ? <div className='panel' /> : null}
                            </CSSTransitionGroup>
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
                            <div id="Fader" className="fadeout" ref={(input) => { this.slide = input; }}>

                                <div className="descr">
                                    {item.volumeInfo.description}
                                </div>
                                <div className="publisher">
                                    Publisher:{item.volumeInfo.publisher}
                                </div>
                                <div className="publishDate">
                                    Publish Date:{item.volumeInfo.publishedDate}
                                </div>
                            </div>
                        </div>

                    </td>

                })}
                </td>
            </tr>

        </tr>
        )
    }

}
ReactDOM.render(<ReactBox />, document.getElementById('myDiv'))
