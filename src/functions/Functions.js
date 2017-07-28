import  { Component } from 'react';
import Parse from 'parse';

class Functions extends Component {

    getdataEqualTo(clase, key) {
        var Class = Parse.Object.extend(clase);
        var query = new Parse.Query(Class);
        query.equalTo('challengeid', key);
        return query;
    }

    getdataEqueTo(clase, key, value) {
        var equal = Parse.Object.extend(clase);
        var query = new Parse.Query(equal);
        query.equalTo(key, value);
        return query;
    }

    getallData(clase) {
        var Class = Parse.Object.extend(clase);
        var query = new Parse.Query(Class);
        return query;
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    insertComment(comment, userId, videoId) {
        var videocomment = Parse.Object.extend("VideoComments");
        var query = new videocomment();
            query.set("comment", comment);
            query.set("userId", userId);
            query.set("videoId", videoId);
        return query;
    }
    wtachFirst() {
        var first = '';
    }
    

}

export default Functions;