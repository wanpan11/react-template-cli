//index.js
class Animal {
	constructor(name) {
		this.name = name;
	}
	getName() {
		return this.name;
	}
}

const dog = new Animal("dog");

const body = document.getElementsByTagName("body")[0];
body.append("<div>123</div>");

console.log(body);
