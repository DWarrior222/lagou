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
            state: '00001',
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
					state: '00001',
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

router.post('/checkCollect', (req, res) => {
	let jobId       = parseInt(req.param("jobId"));
	let userId      = parseInt(req.param("userId"));
	console.log(jobId, req.param("userId"), 88)
	UserInfo.findOne({user_id: userId}, (err, userInfoDoc) => {
		if (err) {
      return res.json({
        state: '00001',
        message: err.message
      })
    }
		if (!userInfoDoc) {

			// 没有用户，先新增用户的信息表
			return res.json({
				state: '00002',
				message: '该工作未收藏'
			})
		}
		// 判断一下数组里面有没有当前要添加的job_id
		let lock = false
		userInfoDoc.collect_job.forEach(item => {
			if (item.job_id == jobId) {
				lock = true
			}
		})
		if (!lock) {
			return res.json({
				state: '00002',
				message: '该工作未收藏'
			})
		}
		return res.json({
			state: '00000',
			message: '该工作已收藏'
		})
	})
})

router.post('/getUserInfo', (req, res) => {
	let userId      = parseInt(req.param("userId"));
	UserInfo.findOne({user_id: userId}, (err, userInfoDoc) => {
		if (err) {
      return res.json({
        state: '00001',
        message: err.message
      })
    }
		if (!userInfoDoc) {

			// 没有用户，先新增用户的信息表
			return res.json({
				state: '00002',
				message: '该用户没有用户信息'
			})
		}
		return res.json({
			state: '00000',
			message: '成功获取用户信息',
			data: userInfoDoc
		})
	})
})

router.post('/updateResume', (req, res) => {
	let userId      = parseInt(req.param("userId"));
	UserInfo.findOne({user_id: userId}, (err, userInfoDoc) => {
		if (err) {
      return res.json({
        state: '00001',
        message: err.message
      })
    }
		if (!userInfoDoc) {

			// 没有用户，先新增用户的信息表
			return res.json({
				state: '00002',
				message: '该用户没有用户信息'
			})
		}
		userInfoDoc.resume = ''
		userInfoDoc.save((saveErr, saveDoc) => {
			return res.json({
				state: '00000',
				message: '成功更新简历信息',
				data: saveDoc
			})
		})
	})
})

router.post('/checkSend', (req, res) => {
	let jobId       = parseInt(req.param("jobId"));
	let userId      = parseInt(req.param("userId"));
	UserInfo.findOne({user_id: userId}, (err, userInfoDoc) => {
		if (err) {
      return res.json({
        state: '00001',
        message: err.message
      })
    }
		if (!userInfoDoc) {

			// 没有用户，先新增用户的信息表
			return res.json({
				state: '00002',
				message: '该工作未发送简历'
			})
		}
		// 判断一下数组里面有没有当前要添加的job_id
		let lock = false
		userInfoDoc.send_job.forEach(item => {
			if (item.job_id == jobId) {
				lock = true
			}
		})
		if (!lock) {
			return res.json({
				state: '00002',
				message: '该工作未发送简历'
			})
		}
		return res.json({
			state: '00000',
			message: '该工作已发送简历'
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

router.post('/updateSend', (req, res) => {
	// let jobId       = parseInt(req.param("jobId"));
	let sendJob  = req.param("sendJob")
	// job_id
	// job_name
	// job_salary
	// comp_name
	// comp_city
	// resume_status
	let userId      = parseInt(req.param("userId"));
	console.log(userId)
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
            state: '00001',
            message: error.message
          })
        }
				if (!createDoc) return

				createDoc.send_job.push(sendJob)
				createDoc.save((saveCreateErr, saveCreateDoc) => {
					if (saveCreateErr) {
						return res.json({
							state: '00001',
							message: saveCreateErr.message
						})
					}
					return res.json({
						state: '00000',
						message: '简历发送成功',
						data: saveCreateDoc
					})
				})
			})

		}
		// 判断一下数组里面有没有当前要添加的job_id
		let lock = false
		userInfoDoc.send_job.forEach(item => {
			let jobId = sendJob.job_id
			if (item.job_id == jobId) {
				lock = true
				for(var key in sendJob) {
					item[key] = sendJob[key]
				}
			}
		})
		if (!lock) {
			userInfoDoc.send_job.push(sendJob)
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
				message: '简历发送成功',
				data: saveDoc
			})
		})
	})
})

module.exports = router;
