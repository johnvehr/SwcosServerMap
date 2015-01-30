# SwcosServerMap
Server side upload engine for SWCOS via Express/Node/Angular.

**Setup**
  * `npm install`
  * `grunt serve`

**Additional node modules**
  * `npm install excel`
  * `npm install multer`

**Additional bower components on top of default**
  * `bower install angular-google-maps --save`
  * `bower install angular-local-storage --save`

**Port**
  * `localhost:9000`

**Endpoints**
  * post "/api/uploads"
  * post "/api/uploads/write"
  * get  "/api/uploads"
  * get  "/api/uploads/read" (under construc.)
