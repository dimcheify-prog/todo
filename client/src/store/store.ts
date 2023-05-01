import Auth from "./auth";
import Tasks from "./tasks";

export default class AppStore {
    auth = new Auth(this);
    tasks = new Tasks(this);
};