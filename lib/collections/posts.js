Posts = new Mongo.Collection('posts');

/*Posts.allow({
  insert: function(userId, doc){
    return !! userId;
  }
});*/

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });
    var user = Meteor.user();
    // _.extend()는 Underscore 라이브러리의 method로서, 단순히 하나의 객체에 속성을 추가하여 “확장”하는 기능을 한다.
    var post = _.extend(postAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date()
    });
    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  }
});