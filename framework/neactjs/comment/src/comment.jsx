define(function(require, exports, module){
    var Comment = React.createClass({
        render: function(){
            return <div>{this.props.author}:{this.props.content}</div>
        }
    });
    var CommentList = React.createClass({
        render: function() {
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
    });
    exports.CommentBox = React.createClass({
            render: function() {
                return (
                    <div className="commentBox">
                    <h1>Comments</h1>
                    <CommentList data={this.props.data} />
                 </div>
            );
        }
    });


})