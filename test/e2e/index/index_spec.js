describe("Pages",function(){

  describe("Index page",function(){

    it("has correct title", function(){
      browser.get('/');
      expect(browser.getTitle()).toBe('teamcity-demo-project');
    });

    it("has correct jumbotron message", function(){
      var message = element(by.css('.jumbotron h1'));
      expect(message.getText()).toBe('TeamCity test project!');
    });

    //it("has correct Sign In button text", function(){
    //  var btn = element(by.className('btn-info'));
    //  expect(btn.getText()).toBe('Sign In');
    //});

  });


});