Sugar
=====

mmmm, so good to be bad! if this is wrong I don't wanna be right. etc.

terse callbacks
---

my favorite feature of deckchair shamelessly stolen from dojo. `deckchair` dynamically generates a function saving you keystrokes. this is standard javascript and won't break anything except possibly _<a href="http://javascript.crockford.com/code.html">douglas crockford's heart</a>_.

    
    :::JavaScript
    aquarium.save([{key:'shark'}, {key:'whale'}], 'console.log(record)');
    

You are correct in noticing the magical `record` parameter in the example above. by default, `deckchair` will create either `record` or `records` for passed in parameters. you can change these by giving your deckchair a `name` and `record` config in the constructor. you can read more about constructors below.

scoped everything everywhere
---

like the great magnificent birds of the world the javascript programming language frees us to rebind the current execution scope of an anonamous function to any object. it is a language feature that has found general acceptance (unlike, perhaps, the `prototype` and various techniques of `eval`).

    
    :::JavaScript
    var store = new deckchair(function() {
        console.log(this === store) 
        // true
    })
    

this functionality exends throughout the library for any method.

    
    :::JavaScript
    var store = new deckchair(function() {

        this.save({key:'nitobi'}, function(obj) {
            
            console.log(obj)
            // {key:'nitobi'}

            this.nuke('console.log(records.length)')
            // 0
        })
    })
    

chaining supported
---

ah chaining, how mid 2000's

    
    :::JavaScript
    this.nuke().save({msg:'first post'}) // something annoying about this...
    

crazy constructors
---

the `new` keyworld/operator gets some flack. maybe it deservies it but in any case its here.

    
    :::JavaScript
    var people = new deckchair()
    

or not... you decide. neither is right or wrong and there is no sense in being a
dick about it.

    
    :::JavaScript
    var people = deckchair()
    

probably not surprisingly the `deckchair` constructor optionally accepts a callback!

    
    :::JavaScript
    // fuck, async makes me HOT
    var people = deckchair(function() { /* awesome persistence here */})
    

The constructor also optionally accepts a configuration object for _terse callback named parameter injection_. Why yes, I did just make that nonesense up!

    
    :::JavaScript
    var people = deckchair({name:'people', record:'person'}, function () {
        
        this.save({key:'joni'}, 'console.log(person)')
        // {key:'joni'}

        this.all('console.log(people)')
        // [{key:'joni'}]
    })
    

additionally the ctor callback gets passed the current `deckchair` instance which can save bytes and comes in handy for closures

    
    :::JavaScript
    var people = deckchair(function (ppl) {
        console.log(ppl === this && this === people)
        // true
    })
    
