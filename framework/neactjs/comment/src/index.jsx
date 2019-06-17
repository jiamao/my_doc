define('index', function(require, exports, module) {
    var CommentBox = require('commentbox');

    class PageComment extends React.Component {
        constructor(props) {
            super(props);
            this.state = {data:[]};
        }
        loadData() {
            var data = [{id:1,author:'fefeding',content:'test' + Math.random()},{id:2,author:'ding',content:'test2'}];
            this.setState({data:data});
        }
        componentDidMount() {
            this.loadData();
            this.interval = setInterval(()=>{
                this.loadData();
            }, this.props.interval);
        }
        componentWillUnmount() {
            clearInterval(this.interval);
        }
        render(){
            return (
                <CommentBox data={this.state.data} />
            );
        }
    };

    exports.init = function(container){

        
        return ReactDOM.render(
            <PageComment url="data.json" interval={2000} />,
            container
        );
    }
});