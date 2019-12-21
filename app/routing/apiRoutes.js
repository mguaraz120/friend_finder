const userData = require("../data/friends");


module.exports = function(app) 
{


  app.get("/api/friends", function(req, res) 
  {
    res.json(userData);
  });

  let comparisonUserTotalScore = 0;

  let friendScores = [];


  app.post("/api/friends", function(req, res) 
  {

    let currentUserScores = req.body.scores;

    console.log("Current user scores: " + currentUserScores);

    for (let i = 0; i < userData.length; i++) 
    {

      let comparisonUserScores = userData[i].scores;

      comparisonUserTotalScore = calculateUserCompatibilityScore(currentUserScores, comparisonUserScores);

      friendScores.push(comparisonUserTotalScore);

    }

    console.log("Array of friend scores: " + friendScores);

    let index = 0;
    let value = friendScores[0];

    for (let i = 0; i < friendScores.length; i++) 
    {
      console.log("Value of item in array: " + friendScores[i]);
      if (friendScores[i] < value)
      {
        value = friendScores[i];
        index = i;
      }
    }

    console.log("Best friend name: " + userData[index].name);

    res.send(userData[index]);

    userData.push(req.body);

  });
};

let totalDifference = 0;

function calculateUserCompatibilityScore(currentUserScores, comparisonUserScores) 
{

  totalDifference = 0;

  for (let i = 0; i < currentUserScores.length; i++) 
  {
    totalDifference+=Math.abs(currentUserScores[i] - comparisonUserScores[i]);
  }

  console.log("Final total difference for friend: " + totalDifference);
  return totalDifference;
};