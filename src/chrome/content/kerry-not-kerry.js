(function() {

    function walk(node) 
    {
        // I stole this function from here:
        // http://is.gd/mwZp7E
    
        var child, next;
    
        switch ( node.nodeType )  
        {
            case 1:  // Element
            case 9:  // Document
            case 11: // Document fragment
                child = node.firstChild;
                while ( child ) 
                {
                    next = child.nextSibling;
                    walk(child);
                    child = next;
                }
                break;
    
            case 3: // Text node
                handleText(node);
                break;
        }	
    }
    
    function handleText(textNode)
    {
        var v = textNode.nodeValue;
    
        v = v.replace(/\bUS Secretary of State John Kerry\b/g, "The Kingdom");
        v = v.replace(/\bU.S. Secretary of State John Kerry\b/g, "The Glorious Kingdom of Kerry");
        v = v.replace(/\bSecretary of State John Kerry\b/g, "The Glorious Kingdom of Kerry");
        v = v.replace(/\bSecretary of State John Kerry\b/g, "The Kingdom of Kerry");
        v = v.replace(/\bSecretary Kerry\b/g, "Co. Kerry");
        v = v.replace(/\bSenator John Kerry\b/g, "The County Kerry");
        v = v.replace(/\bJohn Kerry\b/g, "County Kerry");
        v = v.replace(/\bjohn kerry\b/g, "County Kerry");
        v = v.replace(/\bMr Kerry\b/g, "County Kerry");
        v = v.replace(/\bMister Kerry\b/g, "County Kerry");     
        
        

    
        textNode.nodeValue = v;
    }

    function windowLoadHandler()
    {
        // Dear Mozilla: I hate you for making me do this.
        window.removeEventListener('load', windowLoadHandler);

        document.getElementById('appcontent').addEventListener('DOMContentLoaded', function(e) {
            walk(e.originalTarget.body);
        });
    }

    window.addEventListener('load', windowLoadHandler);
}());
