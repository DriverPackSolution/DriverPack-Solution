//
// JavaScript unit
// Add-on for parsing of command line arguments passed to HTA
//
// Copyright (c) 2012 by Ildar Shaimordanov
//

/*

DESCRIPTION

This file once included into the HTML application creates the HTA object 
to provide several useful methods and properties.

appFullName
        Returns the full path of the currently running application. 

appPath
        Returns the path only to the application. 

appName
        Returns the file name of the currently running application. 

cmdLine
        Returns the command line as raw string. 

arguments
        Returns the complete list of all arguments passed to the 
        application. 

        Methods: item(index), length()

arguments.unnamed
        The unnamed argument is passed as non-empty string. 

        Methods: item(index), length()

arguments.named
        Returns the object as the list of all named arguments. 

        The named argument can be type of simple, boolean or string. 

        The boolean argument is passed to the application as /key+ to 
        provide the true value or /key- to provide the false value. 

        The simple argument takes no additional values and passed as just 
        the /key argument. 

        The string argument is passed to the application as the /key:value 
        pair. 

        Methods: exists(key), item(key), keys(), length()

EXAMPLE

To se the example perform the following steps:
- create a plain text file with the extension .hta; 
- take the example until the end of this comment; 
- paste to the created file; 
- fix the path to the HTA.js file located in your system; 
- launch the resulting HTML application with the different set of 
  arguments (via CLI or shortcuts). 

<html>
<head>
<script src="HTA.js"></script>
</head>
<body>
<pre>
<script>

document.writeln('Full name    : ', HTA.appFullName);
document.writeln('Path name    : ', HTA.appPath);
document.writeln('File name    : ', HTA.appName);
document.writeln('Command Line : ', HTA.cmdLine);

function printArgs(name, args)
{
        var keys = args.keys ? args.keys() : [];

        var len = keys.length || args.length();

        document.writeln();
        document.writeln('<h3>', name + ' (<code>' + len + '</code>)</h3>');
        for (var i = 0; i < len; i++) {
                var k = keys[i] || i;
                document.writeln(k, ' : ', args.item(k));
        }
};

printArgs('Common',  HTA.arguments);
printArgs('Unnamed', HTA.arguments.unnamed);
printArgs('Named',   HTA.arguments.named);

</script>
</pre>
</body>
</html>

*/

(function()
{
        // Duck-typing check for MSIE engine
        if ( this !== this.window ) {
                return;
        }

        var d = this.document;
        if ( ! d || ! d.all || ! d.getElementsByTagName || ! d.createElement || ! d.insertBefore ) {
                return;
        }

        // Create the hta:application tag if it is necessary
        var htApp = d.getElementsByTagName('application')[0];
        if ( ! htApp ) {
                htApp = d.createElement('hta:application');
                var head = d.getElementsByTagName('head')[0];
                head.insertBefore(htApp, head.firstChild);
        }

        // Only HTAs have this property
        var cmdLine = htApp.commandLine;
        if ( ! cmdLine ) {
                return;
        }

        var re = new RegExp([
                // named arguments rounded or not by the quote characters
                //      /named
                // where the 'named' term stands for one of the following:
                //      /key+           key is true
                //      /key-           key is false
                //      /key
                //      /key:
                //      /key:""         key is an empty string
                //      /key:value
                //      /key:"value"    key contains the string 'value'
                '\\/', 
                '([\\S\\:]+?)', 
                '(?:', 
                        // /key+
                        '(\\+)', 

                        '|', 

                        // /key-
                        '(\\-)', 

                        '|', 

                        // /key(:value)?
                        '(?:', 
                                // /key:"value"
                                // /key:""
                                ':"([^"]*)"', 

                                '|', 

                                // /key:value
                                // /key:
                                ':([\\S]*)', 
                        ')?', 
                ')', 
                '"?', 
                '(?:\\s+?|$)', 

                '|', 

                // unnamed arguments rounded by the quote characters
                //      "value"
                '"(.*?)"', 
                '(?:\\s+|$)', 

                '|', 

                // unnamed arguments without the quote characters
                //      value
                '([\\S]+)', 
        ].join(''), 'g');

        var r;

        // It's impossible but we are paranoic
        r = re.exec(cmdLine);
        if ( ! r ) {
                return;
        }

        var fullname = (r[6] || r[7]).replace(/"/g, '');
        var filename = fullname.replace(/^.+\\/, '');
        var pathname = fullname.replace(/\\[^\\]+$/, '');

        var args = [];

        var unnamed = [];

        var named = {};
        var named_length = 0;
        var named_keys = [];

        while ( r = re.exec(cmdLine) ) {
                var k = r[1];
                var v = r[2] ? true : r[3] ? false : r[4] || r[5] || r[6] || r[7];

                if ( ! k && ! v ) {
                        continue;
                }

                if ( ! k ) {
                        args.push(v);
                        unnamed.push(v);
                        continue;
                }

                args.push('/' + k + ':' + v);

                named_length++;
                named[k] = (named[k] || []).concat(v);
                (function()
                {
                        for (var i = 0; i < named_keys.length; i++) {
                                if ( k == named_keys[i] ) {
                                        return;
                                }
                        }
                        named_keys.push(k);
                })();
        }

        var HTA = {
                arguments: {
                        named: {
                                exists: function(key)
                                {
                                        named.hasOwnProperty(key);
                                }, 
                                item: function(key)
                                {
                                        return named[key];
                                }, 
                                keys: function()
                                {
                                        return [].concat(named_keys);
                                }, 
                                length: function()
                                {
                                        return named_length;
                                }
                        }, 
                        unnamed: {
                                item: function(index)
                                {
                                        return unnamed[index];
                                }, 
                                length: function()
                                {
                                        return unnamed.length;
                                }
                        }, 
                        item: function(index)
                        {
                                return args[index];
                        }, 
                        length: function()
                        {
                                return args.length;
                        }
                }, 
                appFullName: fullname, 
                appPath: pathname, 
                appName: filename, 
                cmdLine: cmdLine
        };

        this.HTA = HTA;
})();
