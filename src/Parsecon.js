
import Parse from 'parse';

class Parsecon {
    ConnectToServer() {
        Parse.initialize("47c8fc76540e3cc121f93a817fd42e2a15dc41c8", "", "1c6ef15bd901c50eec2882134e181ab4d7e15ab7");
        Parse.serverURL  =  "http://ec2-52-41-197-88.us-west-2.compute.amazonaws.com:80/parse";
    }
}

export default Parsecon;