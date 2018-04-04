let mongoose = require('../db');


let userInfoSchema = new mongoose.Schema({
  "user_id": {type: Number},
  "resume": {type: String, default: ''},
  "collect_job":[
    {
      "job_id":String,
      "job_name":String,
      "job_salary":String,
      "comp_name":String,
      "comp_city":String,
      "job_welfare":String
    }
  ],
  // "collect_job": {type: Array}
  "send_job":[
    {
        "job_id":String,
        "job_name":String,
        "job_salary":String,
        "comp_name":String,
        "comp_city":String,
        "news": [
          {
            "job_id": String,
            "job_name": String,
            "news_id": String,
            "news_cont": String,
            "read_state": Boolean
          }
        ]
    }
  ]
}, { collection: "user_info" });

module.exports = mongoose.model("UserInfo", userInfoSchema);
