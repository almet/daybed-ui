// We have a global variable fields containing all the fields.
var fields = new Array();


/**
 * Create a div containing an input and a label for it.
 *
 * @param id the id used for the input.
 * @param name (if not set, name fallbacks on id)
 * @return the dom element containing the label + the input.
 **/
ChoiceFieldGenerator.prototype.createTextInput = function(id, name){
    
    if (name == undefined){
        name = id;
    }
    
    var input = document.createElement('input');
    input.type = 'text';
    input.id = this.id + "_" + id;
    
    var label = document.createElement('label');
    label.for = input.id;
    label.innerHTML = name;
    
    var field = document.createElement('div');
    
    field.appendChild(label);
    field.appendChild(input);
    return field;
}

/**
 * Create a div, containing a list of choices.
 *
 * It is possible to add a choice in the ul by clicking on a link.
 *
 * @return the DOM element containing the div with the ul and the a.
 **/
ChoiceFieldGenerator.prototype.createChoicesInput = function(){
    var ul = document.createElement('ul');
    this.addChoice(ul);
    
    var choices = document.createElement('div');
    var littlePlus = document.createElement('a');
    littlePlus.innerHTML = "yeah, add one!";
    //var self = this;
    littlePlus.onclick = function(){
        this.addChoice(ul);
    }.bind(this);
    
    choices.appendChild(ul);
    choices.appendChild(littlePlus);
    return choices;
}

/**
 * Add a choice to the given dom element.
 *
 * @param rootNode the root node to add the choice to.
 * @param elementType the type of the element to pass to createElement.
 * @return the created DOM element.
 **/
ChoiceFieldGenerator.prototype.addChoice = function(rootNode, elementType){
    var label = document.createElement('input');
    label.type = 'text';
    
    var is_default = document.createElement('input');
    is_default.type = 'checkbox';
    
    var element = document.createElement(elementType);
    element.appendChild(is_default);
    element.appendChild(label);
    rootNode.appendChild(element);
    
    this.choices.push({is_default: is_default, label: label});
    return element;
}


/**
 * Build the different fields needed for a ChoiceField creation.
 *
 * @param rootNode the DOM rootNode to build upon.
 **/
ChoiceFieldGenerator.prototype.build = function(rootNode){
    var name = this.createText("name");
    rootNode.appendChild(name);
    this.name = name.lastChild;
    
    help = this.createText("help");
    rootNode.appendChild(help);
    this.help = help.lastChild;
    
    rootNode.appendChild(this.createChoices("choices"));
}

/**
 * Returns a javascript object containing only the information of interest for
 * the representation of it.
 * */
ChoiceFieldGenerator.prototype.getModel = function(){

    var choices = new Array();
    for (var i = 0; i < this.choices.length; i++){
        var choice = this.choices[i];
        choices.push({label: choice.label.value,
                      is_default: choice.is_default.checked});
    }
    
    return {
        name: this.name.value,
        help: this.help.value,
        choices: choices
    };
}

/**
 * Loop on the global fields and convert it to a json string
 **/
function exportToJSON(){
    var output = new Array();
    
    for (var i = 0; i < fields.length; i++){
        output.push(fields[i].getModel());
    }
    
    return JSON.stringify(output);
}

var choicefield = new ChoiceFieldGenerator("yeah"); // to do on click
choicefield.build(document.getElementById('fields'));
fields.push(choicefield);
