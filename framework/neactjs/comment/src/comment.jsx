define('commentbox', function(require, exports, module){
    class Comment extends React.Component {
        constructor(props) {
            super(props)
        }
        render(){
            return <div>{this.props.author}:{this.props.content}</div>
        }
    };
    class CommentList extends React.Component {
        constructor(props) {
            super(props)
        }
        render() {
            var commentNodes = this.props.data.map(function (comment) {
                return (
                    <Comment key={comment.id} author={comment.author} content={comment.content}>
                    </Comment>
                    );
            });
            return (
                <div className="commentList">
                {commentNodes}
                </div>
                );
        }
    }

    class CommentBox extends React.Component {
        constructor(props) {
            super(props)
        }
        render() {
            return (
                <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.props.data} />
                </div>
            );
        }
    }

    module.exports = CommentBox;
})