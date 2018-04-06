let express = require('express');
let router = express.Router();
let User = require('./../models/user');
let UserInfo = require('./../models/userinfo');

router.post('/updateCollect', (req, res) => {
	// let jobId       = parseInt(req.param("jobId"));
	let collectJob  = req.param("collectJob")
	let userId      = parseInt(req.param("userId"));
	let params = {
		user_id: userId,
		collect_job: [],
		send_job: []
	}
	UserInfo.findOne({user_id: userId}, (err, userInfoDoc) => {
		if (err) {
      return res.json({
        state: '00001',
        message: err.message
      })
    }
		if (!userInfoDoc) {

			// 没有用户，先新增用户的信息表

			return UserInfo.create(params, (error, createDoc) => {
				console.log('test')
        if (error) {
          return res.json({
            state: '00011',
            message: error.message
          })
        }
				if (!createDoc) return

				createDoc.collect_job.push(collectJob)
				createDoc.save((saveCreateErr, saveCreateDoc) => {
					if (saveCreateErr) {
						return res.json({
							state: '00001',
							message: saveCreateErr.message
						})
					}
					return res.json({
						state: '00000',
						message: '收藏成功',
						data: saveCreateDoc
					})
				})
			})

		}
		// 判断一下数组里面有没有当前要添加的job_id
		let lock = false
		userInfoDoc.collect_job.forEach(item => {
			let jobId = collectJob.job_id
			if (item.job_id == jobId) {
				lock = true
				for(var key in collectJob) {
					item[key] = collectJob[key]
				}
			}
		})
		if (!lock) {
			userInfoDoc.collect_job.push(collectJob)
		}
		userInfoDoc.save((saveErr, saveDoc) => {
			// console.log('3333333')
			if (saveErr) {
				return res.json({
					state: '00111',
					message: saveErr.message
				})
			}
			console.log('push')
			return res.json({
				state: '00000',
				message: '收藏成功',
				data: saveDoc
			})
		})
	})
})


router.post('/updateUnCollect', (req, res) => {
	// let jobId       = parseInt(req.param("jobId"));
	let jobId  = req.param("jobId");
	let userId      = parseInt(req.param("userId"));
	UserInfo.findOne({user_id: userId}, (err, userInfoDoc) => {
		if (err) {
      return res.json({
        state: '00001',
        message: err.message
      })
    }
		// 判断一下数组里面有没有job_id
		let lock = false
		userInfoDoc.collect_job.forEach((item, index) => {
			if (item.job_id == jobId) {
				lock = true
				userInfoDoc.collect_job.splice(index, 1)
			}
		})
		if (!lock) {
			return res.json({
				state: '00000',
				message: '未收藏该工作'
			})
		}
		userInfoDoc.save((saveErr, saveDoc) => {
			// console.log('3333333')
			if (saveErr) {
				return res.json({
					state: '00001',
					message: saveErr.message
				})
			}
			console.log('push')
			return res.json({
				state: '00000',
				message: '取消收藏成功',
				data: saveDoc
			})
		})
	})
})

module.exports = router;
