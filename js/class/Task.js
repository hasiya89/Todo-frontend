/*Define class for a Task. Task has properties id and a text, which are private (JavaScript
uses # for declaring private member variables). Constructor is used to create new
object. GetId and getText methods (“getters”) are implemented to enable reading these
values “outside” class. */

class Task {
    #id
    #text

    constructor(id, text) {
        this.#id = id
        this.#text = text
    }

    getId() {
        return this.#id
    }

    getText() {
        return this.#text
    }
}

export { Task }