var Challenge = require('../lib/db/Challenge')
  , User = require('./db.User')
  , should = require('should')
  , assert = require('assert');

module.exports = function() {
  describe('Challenge', function() {
    it('should sort start and end lists when saving', function(done) {
      var startFiles = [{ name: 'katie', contents: '' }
                      ,{ name: 'josh', contents: '' }];

      var endFiles = [{ name: 'devon', contents: '' }
                    ,{ name: 'billy', contents: '' }];

      var sortFiles = function(a, b) {
        return a.name < b.name ? -1 : 1;
      };

      var compareArrs = function(a, b) {
        if (a.length !== b.length) return false;
        for (var i = 0; i < a.length; i++) {
          if (a[i].name !== b[i].name) {
            return false;
          }
        }
        return true;
      };

      var testChallenge = new Challenge();
      testChallenge.name = 'Test challenge';
      testChallenge.description = 'Created while running mocha tests.';
      testChallenge.instructions = 'words';
      testChallenge.start = startFiles;
      testChallenge.end = endFiles;
      testChallenge.save(function(err, challenge) {
        should.not.exist(err);
        challenge.should.have.property('start');
        assert(compareArrs(challenge.start, startFiles.sort(sortFiles)));
        assert(compareArrs(challenge.end, endFiles.sort(sortFiles)));
        done();
      });
    });

    // Remove our test data after we're done
    afterEach(function(done) {
      Challenge.remove({}, function() {
        done();
      });
    });
  });
};
