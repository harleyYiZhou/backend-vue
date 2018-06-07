	const forms = {
	    ChinaIndividual: {
	        // for chinaId
	        individualChinaId: { idType: 'ChinaId', label: '身份证号', tips: '提示信息', value: '', type: 'string' },
	        individualChinaIdPhotoBack: { idType: 'ChinaId', label: '身份证正面', tips: '身份证提示信息', src: '', type: 'image', value: '' },
	        individualChinaIdPhotoFront: { idType: 'ChinaId', label: '身份证背面', tips: '身份证提示信息', src: '', type: 'image', value: '' },
	        individualChinaIdPhotoHolding: { idType: 'ChinaId', label: '手持身份证', tips: '身份证提示信息', src: '', type: 'image', value: '' },
	        // for passport
	        individualPassportId: { idType: 'Passport', label: '护照', tips: '提示信息', value: '', type: 'string' },
	        individualPassportPhotoFront: { idType: 'Passport', label: '护照正面', tips: '身份证提示信息', src: '', type: 'image', value: '' },
	        individualPassportPhotoBack: { idType: 'Passport', label: '护照背面', tips: '身份证提示信息', src: '', type: 'image', value: '' },

	        // for hk mc permitid
	        individualPermitId: { idType: 'HongKongMacauPermit', label: '港澳通行证', tips: '提示信息', value: '', type: 'string' },
	        individualPermitPhotoFront: { idType: 'HongKongMacauPermit', label: '通行证正面', tips: '身份证提示信息', src: '', type: 'image', value: '' },
	        individualPermitPhotoBack: { idType: 'HongKongMacauPermit', label: '通行证背面', tips: '身份证提示信息', src: '', type: 'image', value: '' },

	        // for tw permit
	        TWindividualPermitId: { idType: 'TaiwanPermit', label: '台湾通行证', tips: '提示信息', value: '', type: 'string' },
	        TWindividualPermitPhotoFront: { idType: 'TaiwanPermit', label: '通行证正面', tips: '身份证提示信息', src: '', type: 'image', value: '' },
	        TWindividualPermitPhotoBack: { idType: 'TaiwanPermit', label: '通行证背面', tips: '身份证提示信息', src: '', type: 'image', value: '' },

	        //for orderid
	        individualOtherId: { idType: 'Other', label: '其他证件', tips: '提示信息', value: '', type: 'string' },
	        individualOtherIdPhotoFront: { idType: 'Other', label: '其他证件正面', tips: '身份证提示信息', src: '', type: 'image', value: '' },
	        individualOtherIdPhotoBack: { idType: 'Other', label: '其他证件背面', tips: '身份证提示信息', src: '', type: 'image', value: '' },


	        individualFullName: { label: '个人全名', tips: '提示信息', value: '', type: 'string' },
	        individualAddress: { label: '个人地址', tips: '提示信息', value: '', type: 'string' },
	        individualEmail: { label: '电子邮件', tips: '很长很长的提示信息拉萨大家发来大家奥利弗激励大家发了多少上的家乐福了撒旦解放了大数据量加拉附近登陆很长很长的提示信息拉萨大家发来大家奥利弗激励大家发了多少上的家乐福了撒旦解放了大数据量加拉附近登陆很长很长的提示信息拉萨大家发来大家奥利弗激励大家发了多少上的家乐福了撒旦解放了大数据量加拉附近登陆很长很长的提示信息拉萨大家发来大家奥利弗激励大家发了多少上的家乐福了撒旦解放了大数据量加拉附近登陆很长很长的提示信息拉萨大家发来大家奥利弗激励大家发了多少上的家乐福了撒旦解放了大数据量加拉附近登陆很长很长的提示信息拉萨大家发来大家奥利弗激励大家发了多少上的家乐福了撒旦解放了大数据量加拉附近登陆很长很长的提示信息拉萨大家发来大家奥利弗激励大家发了多少上的家乐福了撒旦解放了大数据量加拉附近登陆很长很长的提示信息拉萨大家发来大家奥利弗激励大家发了多少上的家乐福了撒旦解放了大数据量加拉附近登陆', value: '', type: 'string' },
	        individualPhone: { label: '电话', tips: '提示信息', value: '', type: 'string' },
	    },
	    ChinaBusiness: {
	        businessFullName: { label: '公司全名', tips: '提示信息', value: '', type: 'string' },
	        businessRegistrationId: { label: '注册编号', tips: '提示信息', value: '', type: 'string' },
	        businessAddress: { label: '公司地址', tips: '提示信息', value: '', type: 'string' },
	        businessRegistrationPhoto: { label: '注册图片', tips: '图片信息', src: '', type: 'image', value: '' },
	        businessSupportingPhoto: { label: '支持图片', tips: '支持图片信息', src: '', type: 'image', value: '' },

	        legalPersonChinaId: { label: '法人身份证', tips: '提示信息', value: '', type: 'string' },
	        legalPersonFullName: { label: '法人全名', tips: '提示信息', value: '', type: 'string' },
	        legalPersonChinaIdPhotoFront: { label: '身份证正面', tips: '身份证提示信息', src: '', type: 'image', value: '' },
	        legalPersonChinaIdPhotoBack: { label: '身份证背面', tips: '身份证提示信息', src: '', type: 'image', value: '' },
	        legalPersonChinaIdPhotoHolding: { label: '手持身份证', tips: '身份证提示信息', src: '', type: 'image', value: '' },

	    }
	}

	// function validateEmail(str) {
	//     let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
	//     return reg.test(str.value)
	// }
	import { validateEmail, validatePhone, validateChinaId, validatePassport, validateTaiwanPermit, validateHongKongPermit } from '@/utils/validate'

	var _validateEmail = (rule, obj, callback) => {
	    if (obj.value === '') {
	        callback(new Error('请输入邮箱'));
	    } else {
	        if (!validateEmail(obj.value)) {
	            callback(new Error('请输入正确邮箱'));
	        }
	        callback();
	    }
	};
	var _validatePhone = (rule, obj, callback) => {
	    if (obj.value === '') {
	        obj.tips = 'hahah';
	        callback(new Error('请输入手机'));
	    } else {
	        if (!validatePhone(obj.value)) {
	            callback(new Error('请输入正确手机'));
	        }
	        callback();
	    }
	};
	var _validateChinaId = (rule, obj, callback) => {
	    if (obj.value === '') {
	        callback(new Error('请输入身份证号'));
	    } else {
	        if (!validateChinaId(obj.value)) {
	            callback(new Error('请输入正确身份证号'));
	        }
	        callback();
	    }
	};
	var _validatePassportId = (rule, obj, callback) => {
	    if (obj.value === '') {
	        callback(new Error('请输入护照'));
	    } else {
	        if (!validatePassport(obj.value)) {
	            callback(new Error('请输入正确护照号码'));
	        }
	        callback();
	    }
	};
	var _validatePermitId = (rule, obj, callback) => {
	    let message = '请输入通行证号码';
	    if (obj.value === '') {
	        callback(new Error(message));
	    } else {
	        if (obj.idType === 'HongKongPermit') {
	            if (!validateHongKongPermit(obj.value)) {

	                callback(new Error('请输入正确港澳通行证号码'));
	            }
	            callback();
	        } else {
	            if (!validateTaiwanPermit(obj.value)) {

	                callback(new Error('请输入正确台湾通行证号码'));
	            }
	            callback();
	        }

	    }
	};

	var _validateFullName = (rule, obj, callback) => {
	    if (obj.value === '') {
	        callback(new Error('请输入姓名'));
	    } else {
	        callback();
	    }
	};
	const rules = {
	    individualFullName: [{ required: true, validator: _validateFullName, trigger: 'blur' }],
	    individualEmail: [{ required: true, validator: _validateEmail, trigger: 'blur' }],
	    individualPhone: [{ required: true, validator: _validatePhone, trigger: 'blur' }],
	    individualChinaId: [{ required: true, validator: _validateChinaId, trigger: 'blur' }],
	    individualPassportId: [{ required: true, validator: _validatePassportId, trigger: 'blur' }],
	    individualPermitId: [{ required: true, validator: _validatePermitId, trigger: 'blur' }],
	    legalPersonChinaId: [{ required: true, validator: _validateChinaId, trigger: 'blur' }],
	}

















	export {
	    forms,
	    rules
	};