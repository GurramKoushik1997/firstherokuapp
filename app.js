/* var http = require('http');

http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/html'});
res.end('Hello World!111');
}).listen(8080); */
/* var http = require('http');
var dt = require('./myfirstmodule');

http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/html'});
res.write("The date and time are currently: " + dt.myDateTime());
res.end();
}).listen(8080); */
/* var http = require('http');
http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/html'});
res.write('Hello World!');
res.end();
}).listen(8080); */
/* var http = require('http');
http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/html'});
res.write(req.url);
res.end();
}).listen(8080); */
/* var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/html'});
var q = url.parse(req.url, true).query;
var txt = q.year + " " + q.month;
res.end(txt);
}).listen(8080); */

//use -> npm 'install jsforce', to install jsforce
const jsforce = require("jsforce");
const conn = new jsforce.Connection({
  // you can change loginUrl to connect to sandbox or prerelease env.
  loginUrl: "https://login.salesforce.com",
});
// Log in with basic SOAP login (see documentation for other auth options)
conn.login("koushik@devcompany.com","Gurram@31j" + "L9gSba8MnolYv3aEwznCD0RV",(err, res) => {
    if (res) {
      console.log("res->", res);
      console.log("Successfully logged in!");
    } else if (err) {
      return console.error("Failed to log in to Salesforce: ", err);
    }

    // Run a SOQL query
    conn.query("SELECT Id, Name FROM Account LIMIT 5", (err, result) => {
      if (err) {
        return console.error("Failed to run SOQL query: ", err);
      }
      // Display query results
      const { records } = result;
      console.log(`Fetched ${records.length} records:`);
      records.forEach((record) => {
        console.log(`- ${record.Name} (${record.Id})`);
      });
    });
    //Create an apex class
    const apexBody = [
      "public class nodeJS {",
      "  public string sayHello() {",
      "System.debug('class: nodeJS');",
      "System.debug('method: sayHello');",
      "    return 'Hello';",
      "  }",
      "}",
    ].join("\n");
    //createApexclass(apexBody);
    //getRecord("Account", "0012x0000061TYOAA2");
    //getRecord("Account", ["0012x0000061TYOAA2","0012x0000061TYRAA2"]);
    const anonymousApexBody =
      "System.debug('Hello, World');nodeJS njs = new nodeJS();System.debug('->'+njs.sayHello());";
    anonymousApexCode(anonymousApexBody);
  }
);
const getRecord = async (objectName, recordIdORArray) => {
  try {
    console.log("from: getRecord");
    console.log("objectName->", objectName);
    console.log("recordIdArray->", recordIdArray);
    const response = await conn.sobject(objectName).retrieve(recordIdORArray);
    console.log("->", response);
  } catch (err) {
    console.error("->", err);
  }
};
function createApexclass(apexArray) {
  console.log("from: createApexclass");
  const response = conn.tooling.sobject("ApexClass").create({
    body: apexArray,
  });
  console.log("->", response);
}

async function anonymousApexCode(anonymousApexBody) {
  console.log("from: updateApexclass");
  const res = await conn.tooling.executeAnonymous(anonymousApexBody);
  console.log(`compiled?: ${res.compiled}`); // compiled successfully
  console.log(`executed?: ${res.success}`); // executed successfully
}
